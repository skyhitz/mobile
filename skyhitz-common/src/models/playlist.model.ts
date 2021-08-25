import { Payload } from './payload.model';
import { EntryPayload, Entry } from './entry.model';
import * as L from 'list';

export class PlaylistPayload extends Payload {
  photoUrl?: string;
  title?: string;
  description?: string;
  id?: string;
  PlaylistEntries?: EntryPayload[];
  entries?: L.List<Entry>;
}

export class Playlist extends PlaylistPayload {
  constructor(payload: PlaylistPayload) {
    super(payload);
    this.photoUrl = payload.photoUrl;
    this.title = payload.title;
    this.description = payload.description;
    this.id = payload.id;
    this.PlaylistEntries = payload.PlaylistEntries;
    this.entries = L.from(
      this.PlaylistEntries
        ? this.PlaylistEntries.map((entryPayload) => new Entry(entryPayload))
        : []
    );
  }

  get entriesCount() {
    return this.entries ? this.entries.length : 0;
  }
}
