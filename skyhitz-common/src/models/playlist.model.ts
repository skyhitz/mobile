import { Payload } from './payload.model';
import { EntryPayload, Entry } from './entry.model';
import { List } from 'immutable';

export class PlaylistPayload extends Payload {
  photoUrl?: string;
  title?: string;
  description?: string;
  id?: string;
  PlaylistEntries?: EntryPayload[];
  entries?: List<Entry>;
}

export class Playlist extends PlaylistPayload {
  constructor(payload: PlaylistPayload) {
    super(payload);
    this.photoUrl = payload.photoUrl;
    this.title = payload.title;
    this.description = payload.description;
    this.id = payload.id;
    this.PlaylistEntries = payload.PlaylistEntries;
    this.entries = List(
      this.PlaylistEntries
        ? this.PlaylistEntries.map(entryPayload => new Entry(entryPayload))
        : []
    );
  }

  get entriesCount() {
    return this.entries ? this.entries.size : 0;
  }
}
