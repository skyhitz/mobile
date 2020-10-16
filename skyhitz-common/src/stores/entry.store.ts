import { observable, action, computed } from 'mobx';
import {
  preBase64String,
  cloudinaryApiPath,
  cloudinaryPreset,
} from '../constants/constants';
import { SessionStore } from './session.store';
import { entriesBackend } from '../backends/entries.backend';
import UniqueIdGenerator from '../utils/unique-id-generator';
import { Platform } from 'react-native';

export class EntryStore {
  @observable uploadingVideo: boolean = false;
  @observable
  uploadingError!: string;
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
  price: number | undefined;

  @observable
  progress: number = 0;

  constructor(private sessionStore: SessionStore) {}

  @computed
  get currentView() {
    if (this.videoUrl && this.eTag) {
      return 'info';
    }
    return 'upload';
  }

  async webVideoUpload(video: any) {
    if (!this.sessionStore.user) return;

    let id = UniqueIdGenerator.generate();
    let xhr = new XMLHttpRequest();
    let data = new FormData();
    xhr.open('POST', cloudinaryApiPath, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    this.updateUploadingVideo(true);
    xhr.upload.addEventListener('progress', (e) => {
      this.progress = Math.round((e.loaded * 100.0) / e.total);
    });

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let { secure_url, etag } = JSON.parse(xhr.responseText);
        this.updateUploadingVideo(false);
        this.updateId(id);
        this.updateEtag(etag);
        this.updateVideoUrl(secure_url);
      }
    };
    data.append('folder', `/app/${this.sessionStore.user.id}/videos`);
    data.append('public_id', id);
    data.append('upload_preset', cloudinaryPreset);
    data.append('file', video.uri);
    xhr.send(data);
  }

  async mobileVideoUpload(video: any) {
    if (!this.sessionStore.user) return;

    this.updateUploadingVideo(true);
    let id = UniqueIdGenerator.generate();
    let data: any = new FormData();
    data.append('upload_preset', cloudinaryPreset);
    data.append('file', video.uri);
    data.append('folder', `/app/${this.sessionStore.user.id}/videos`);
    data.append('public_id', id);
    let res;
    try {
      res = await fetch(cloudinaryApiPath, {
        method: 'POST',
        body: data,
      });
      let { secure_url, etag } = await res.json();
      this.updateUploadingVideo(false);
      this.updateId(id);
      this.updateEtag(etag);
      this.updateVideoUrl(secure_url);
    } catch (e) {
      this.uploadingError = 'Error uploading video, please try again!';
    }
  }

  async uploadVideo(video: any) {
    return this.webVideoUpload(video);
  }

  @action
  clearUploadingError() {
    this.uploadingError = '';
  }

  async uploadArtwork(image: any) {
    if (!this.sessionStore.user) return;

    this.updateLoadingArtwork(true);
    let data = new FormData();
    data.append('file', image.uri);
    data.append('folder', `/app/${this.sessionStore.user.id}/images`);
    data.append('upload_preset', cloudinaryPreset);
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
    entriesBackend.youtubeUpload(
      this.videoUrl,
      this.description,
      this.title,
      this.id
    );
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
