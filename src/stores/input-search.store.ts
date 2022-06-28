import { observable } from 'mobx';

export class InputSearchStore {
  public query = observable({
    type: 'entries',
    q: '',
  });

  constructor() {}

  public search(query: string) {
    this.query.q = query;
  }

  public updateSearchType(type: 'entries' | 'users') {
    this.query.type = type;
  }
}
