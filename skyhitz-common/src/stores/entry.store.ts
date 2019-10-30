import { observable, action, computed } from 'mobx';
import {
  cloudinaryApiVideoPath,
  preBase64String,
  cloudinaryApiPath,
} from '../constants/constants';
import { SessionStore } from './session.store';
import { entriesBackend } from '../backends/entries.backend';
import UniqueIdGenerator from '../utils/unique-id-generator';

export class EntryStore {
  @observable uploadingVideo: boolean = false;
  @observable loadingVideo: boolean = false;
  @observable
  artworkUrl!: string;
  @observable
  videoUrl!: string;
  @observable
  eTag!: string;
  @observable
  loadingArtwork!: boolean;
  @observable
  description!: string;
  @observable
  title!: string;
  @observable
  artist!: string;
  @observable
  id!: string;
  @observable
  availableForSale!: boolean;
  @observable
  price!: number;

  constructor(private sessionStore: SessionStore) {}

  @computed
  get currentView() {
    if (this.videoUrl && this.eTag) {
      return 'info';
    }
    return 'upload';
  }

  async uploadVideo(video: any) {
    this.updateUploadingVideo(true);
    let id = UniqueIdGenerator.generate();
    let data: any = new FormData();
    data.append('file', {
      uri: video.uri,
      name: video.uri.split('/').pop(),
      type: 'video/mp4',
    });
    data.append('folder', `/app/${this.sessionStore.user.id}/videos`);
    data.append('public_id', id);
    let res;
    try {
      res = await fetch(cloudinaryApiVideoPath, { method: 'POST', body: data });
      let { secure_url, etag } = await res.json();
      this.updateUploadingVideo(false);
      this.updateId(id);
      this.updateEtag(etag);
      this.updateVideoUrl(secure_url);
    } catch (e) {
      console.log('error uploading video', e);
    }
  }

  async uploadArtwork(image: any) {
    this.updateLoadingArtwork(true);
    let data = new FormData();
    data.append('file', `${preBase64String}${image.base64}`);
    data.append('folder', `/app/${this.sessionStore.user.id}/images`);
    let res = await fetch(cloudinaryApiPath, { method: 'POST', body: data });
    let { secure_url } = await res.json();
    this.updateArtworkUrl(secure_url);
    this.updateLoadingArtwork(false);
  }

  @action
  updateLoadingArtwork = (state: boolean) => {
    this.loadingArtwork = state;
  };

  @action
  updateLoadingVideo = (state: boolean) => {
    this.loadingVideo = state;
  };

  @action
  updateUploadingVideo = (state: boolean) => {
    this.uploadingVideo = state;
  };

  @action
  updateArtworkUrl = (text: string) => {
    this.artworkUrl = text;
  };

  @action
  updateVideoUrl = (text: string) => {
    this.videoUrl = text;
  };

  @action
  updateEtag = (text: string) => {
    this.eTag = text;
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
  updateId = (text: string) => {
    this.id = text;
  };

  @action
  updateAvailableForSale = (state: boolean) => {
    this.availableForSale = state;
  };

  @action
  updatePrice = (price: number) => {
    this.price = price;
  };

  clearStore() {
    this.updateLoadingVideo(false);
    this.updateUploadingVideo(false);
    this.updateLoadingArtwork(false);
    this.updateArtworkUrl('');
    this.updateVideoUrl('');
    this.updateEtag('');
    this.updateDescription('');
    this.updateTitle('');
    this.updateArtist('');
    this.updateId('');
    this.updateAvailableForSale(false);
    this.updatePrice(0);
  }

  @computed
  get canCreate() {
    return (
      this.eTag &&
      this.artworkUrl &&
      this.videoUrl &&
      this.description &&
      this.title &&
      this.id &&
      this.artist
    );
  }

  async create() {
    await entriesBackend.createFromUpload(
      this.eTag,
      this.artworkUrl,
      this.videoUrl,
      this.description,
      this.title,
      this.artist,
      this.id,
      this.availableForSale,
      this.price
    );
    // entriesBackend.youtubeUpload(
    //   this.videoUrl,
    //   this.description,
    //   this.title,
    //   this.id
    // );
  }

  async updatePricing(entry: any) {
    if (!this.availableForSale) {
      return;
    }
    if (!this.price) {
      return;
    }
    await entriesBackend.updatePricing(
      entry.id,
      this.price,
      this.availableForSale
    );
    this.clearStore();
  }

  async remove(entryId: string, cloudinaryPublicId: string) {
    await entriesBackend.remove(entryId, cloudinaryPublicId);
  }
}
