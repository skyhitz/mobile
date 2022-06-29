import * as L from 'list';
import { entriesBackend } from '../api/entries';
import { Entry } from '../models';
import { userAtom } from '../atoms/atoms';
import { useRecoilValue } from 'recoil';

export const UserEntriesStore = () => {
  const user = useRecoilValue(userAtom);

  let entries: L.List<Entry> = L.from([]);
  let loading: boolean = false;

  const refreshEntries = async () => {
    if (!user) {
      return;
    }
    if (!user.id) {
      return;
    }
    loading = true;

    const res = await entriesBackend.getByUserId(user.id);
    loading = false;
    entries = L.from(res ? res : []);
  };
  return { entries, loading, refreshEntries };
};
