import { observable, action, computed } from 'mobx';
import { nftStorageApi } from '../constants/constants';
import { entriesBackend } from '../backends/entries.backend';

export class EntryStore {
  @observable uploadingVideo: boolean = false;
  @observable
  uploadingError!: string;
  @observable loadingVideo: boolean = false;
  @observable
  loadingImage!: boolean;
  @observable
  description!: string;
  @observable
  issuer = '';
  @observable
  title!: string;
  @observable
  artist!: string;
  @observable
  availableForSale!: boolean;
  @observable
  price: number | undefined;
  @observable
  equityForSale: number = 1;
  @observable
  equityForSalePercentage: string = '1 %';
  @observable
  filesProgress: { [key: string]: number } = {};

  @observable
  creating: boolean = false;

  @observable
  imageBlob: Blob | undefined;

  @observable
  videoBlob: Blob | undefined;

  @action
  clearUploadingError() {
    this.uploadingError = '';
  }

  @action
  setIssuer(issuer) {
    this.issuer = issuer;
  }

  @action
  setUploadingError(error) {
    this.uploadingError = error;
  }

  @action
  setLoadingVideo(loading: boolean) {
    this.loadingVideo = loading;
  }

  @action
  updateLoadingImage = (state: boolean) => {
    this.loadingImage = state;
  };

  @action
  updateUploadingVideo = (state: boolean) => {
    this.uploadingVideo = state;
  };

  @action
  updateDescription = (text: string) => {
    this.description = text;
  };

  @action
  updateTitle = (text: string) => {
    this.title = text;
  };

  @action
  updateArtist = (text: string) => {
    this.artist = text;
  };

  @action
  updateAvailableForSale = (state: boolean) => {
    this.availableForSale = state;
  };

  @action
  updatePrice = (price: number) => {
    this.price = price;
  };

  @action
  updateEquityForSalePercentage = (value: number) => {
    this.equityForSale = value;
    this.equityForSalePercentage = `${value ? value : 0} %`;
  };

  constructor() {}

  setImageBlob(imageBlob) {
    this.imageBlob = imageBlob;
  }

  setVideoBlob(videoBlob) {
    this.videoBlob = videoBlob;
  }

  async uploadFile(file: any, id: string) {
    return new Promise((resolve: (value: string) => void, reject) => {
      this.filesProgress[id] = 0;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', `${nftStorageApi}/upload`, true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader(
        'Authorization',
        `Bearer ${process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY}`
      );

      xhr.upload.addEventListener('progress', (e) => {
        const progress = Math.round((e.loaded * 100.0) / e.total);

        this.filesProgress[id] = progress;
        if (progress === 100) {
          delete this.filesProgress[id];
        }
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let { value, ok } = JSON.parse(xhr.responseText);
          if (!ok) {
            this.uploadingError = 'Something went wrong!';
            reject();
            return;
          }
          resolve(value.cid);
        }
      };

      xhr.send(file);
    });
  }

  async storeNFT() {
    const name = `${this.artist} - ${this.title}`;
    const ipfsProtocol = 'ipfs://';

    const code = `${this.title}${this.artist}`
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/ /g, '')
      .replace(/-/g, '')
      .replace(/[^0-9a-z]/gi, '')
      .substr(0, 12)
      .toUpperCase();

    const [imageCid, videoCid] = [
      await this.uploadFile(this.imageBlob, 'image'),
      await this.uploadFile(this.videoBlob, 'video'),
    ];

    const imageUrl = `${ipfsProtocol}${imageCid}`;
    const videoUrl = `${ipfsProtocol}${videoCid}`;

    const issuer = await entriesBackend.getIssuer(videoCid);
    this.setIssuer(issuer);
    if (!issuer) throw 'could not generate issuer';

    const json = {
      name: name,
      description: this.description,
      code: code,
      issuer: issuer,
      domain: 'skyhitz.io',
      supply: 1,
      image: imageUrl,
      animation_url: videoUrl,
      video: videoUrl,
    };

    const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });

    const nftCid = await this.uploadFile(blob, 'meta');
    return { videoCid, nftCid, imageUrl, videoUrl, code };
  }

  clearStore() {
    this.updateUploadingVideo(false);
    this.updateLoadingImage(false);
    this.updateDescription('');
    this.updateTitle('');
    this.updateArtist('');
    this.updateAvailableForSale(false);
    this.updatePrice(0);
    this.updateEquityForSalePercentage(1);
    this.creating = false;
  }

  get currentUpload() {
    return Object.keys(this.filesProgress).includes('video')
      ? 'video'
      : Object.keys(this.filesProgress).includes('meta')
      ? 'meta'
      : 'none';
  }

  get progress() {
    return Math.min(...Object.values(this.filesProgress));
  }

  @computed
  get canCreate() {
    return (
      this.imageBlob &&
      this.videoBlob &&
      this.description &&
      this.title &&
      this.artist
    );
  }

  async indexEntry() {
    if (!this.issuer) return false;
    return await entriesBackend.indexEntry(this.issuer);
  }

  async create() {
    this.creating = true;
    const {
      videoCid,
      nftCid,
      imageUrl,
      videoUrl,
      code,
    } = await this.storeNFT();
    if (!nftCid || !imageUrl || !videoUrl) {
      this.setUploadingError('Could not store NFT');
      return;
    }
    return await entriesBackend.createFromUpload(
      videoCid,
      nftCid,
      code,
      this.availableForSale,
      this.price,
      this.availableForSale ? this.equityForSale : 0
    );
  }

  async updatePricing(entry: any) {
    if (!this.availableForSale) {
      return;
    }
    if (!this.price) {
      return;
    }
    if (!this.equityForSale) {
      return;
    }
    await entriesBackend.updatePricing(
      entry.id,
      this.price,
      this.availableForSale,
      this.equityForSale
    );
    this.clearStore();
  }

  async remove(entryId: string) {
    await entriesBackend.remove(entryId);
  }
}
