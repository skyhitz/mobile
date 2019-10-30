import { observable } from 'mobx';
import { Query } from '../types/index';

export class InputSearchStore {
  public query = observable({
    type: 'entries',
    q: ''
  });

  constructor (
  ) {
  }

  public search(query: string) {
    this.query.q = query;
  }

  public updateSearchType(type: 'entries' | 'users') {
    this.query.type = type;
  }
}



