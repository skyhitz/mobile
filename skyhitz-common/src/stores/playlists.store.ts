import { observable, observe, IObservableObject, computed, action } from 'mobx';
import { Query } from '../types/index';
import { List } from 'immutable';
import { playlistsBackend } from '../backends/playlists.backend';
import { Entry, User, Playlist } from '../models';
import { preBase64String, cloudinaryApiPath } from '../constants/constants';
import { SessionStore } from './session.store';

export class PlaylistsStore {
  @observable playlists: List<Playlist> = List([]);
  @observable loading: boolean = false;
  @observable editMode: boolean = false;
  @observable playlistIndex: number = 0;
  @observable removePlaylistIndex: number = 0;
  @observable loadingImage: boolean = false;
  @observable modalPlaylistPhotoUrl: string = '';
  @observable modalPlaylistName: string = '';
  @observable modalPlaylistDescription: string = '';
  @observable showPlaylistsModal: boolean = false;
  @observable entryToBeAdded: Entry;

  constructor(private sessionStore: SessionStore) {}

  public clearPlaylists() {
    this.playlists = List([]);
  }

  public setPlaylistIndex(index: number) {
    this.playlistIndex = index;
  }

  public setRemovePlaylistIndex(index: number) {
    this.removePlaylistIndex = index;
  }

  public async refreshPlaylists() {
    this.loading = true;
    const userPlaylists = await playlistsBackend.userPlaylists();
    const playlists = userPlaylists.map(playlist => new Playlist(playlist));
    this.loading = false;
    this.playlists = List(playlists);
  }

  get playlistsCount() {
    return this.playlists.size;
  }

  @computed
  get playlistToBeRemoved() {
    return this.playlists.get(this.removePlaylistIndex);
  }

  @computed
  get playlist() {
    return this.playlists.get(this.playlistIndex);
  }

  @computed
  get entries() {
    return this.playlist.entries;
  }

  @computed
  get canCreate() {
    return !!(
      this.modalPlaylistPhotoUrl &&
      this.modalPlaylistName &&
      this.modalPlaylistDescription
    );
  }

  edit() {
    this.editMode = true;
  }

  done() {
    this.editMode = false;
  }

  async create() {
    if (!this.canCreate) {
      return;
    }
    await playlistsBackend.createPlaylist(
      this.modalPlaylistPhotoUrl,
      this.modalPlaylistName,
      this.modalPlaylistDescription
    );
    await this.refreshPlaylists();
    this.clearPlaylistFields();
  }

  updateModalPlaylistName(name: string) {
    this.modalPlaylistName = name;
  }

  updateModalPlaylistDescription(description: string) {
    this.modalPlaylistDescription = description;
  }

  clearPlaylistFields() {
    this.updateModalPlaylistName('');
    this.updateModalPlaylistDescription('');
    this.modalPlaylistPhotoUrl = '';
  }

  async uploadImage(image: any) {
    this.loadingImage = true;
    let data = new FormData();
    data.append('file', `${preBase64String}${image.base64}`);
    data.append('folder', `/app/${this.sessionStore.user.username}/images`);
    let res = await fetch(cloudinaryApiPath, { method: 'POST', body: data });
    let { secure_url } = await res.json();
    this.updateModalPlaylistPhotoUrl(secure_url);
    this.loadingImage = false;
  }

  @action
  updateModalPlaylistPhotoUrl = (imageUrl: string) => {
    this.modalPlaylistPhotoUrl = imageUrl;
  }

  async remove() {
    await playlistsBackend.removePlaylist(this.playlistToBeRemoved.id);
    await this.refreshPlaylists();
  }

  selectEntryToBeAdded(entry: Entry) {
    this.entryToBeAdded = entry;
  }

  diselectEntryToBeAdded() {
    this.entryToBeAdded = null;
  }

  async addToPlaylist(playlistId: string) {
    await playlistsBackend.addEntryToPlaylist(
      playlistId,
      this.entryToBeAdded.id
    );
    await this.refreshPlaylists();
    this.diselectEntryToBeAdded();
  }

  async removeEntryFromPlaylist(playlistId: string, entryId: string) {
    await playlistsBackend.removeEntryFromPlaylist(playlistId, entryId);
    await this.refreshPlaylists();
    this.diselectEntryToBeAdded();
  }
}
