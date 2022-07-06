import { useEffect, useState } from 'react';
import { Config } from 'app/src/config';
import { userAtom } from '../atoms/atoms';
import { useRecoilValue } from 'recoil';
import { EntryStore } from '../stores/entry.store';
const EventSource = require('eventsource');

const nftListener = (open) => {
  const { indexEntry, issuer } = EntryStore();
  const user = useRecoilValue(userAtom);

  const [indexed, setIndexed] = useState(false);

  useEffect(() => {
    if (!open) return;
    const es = new EventSource(
      open
        ? `${Config.HORIZON_URL}/accounts/${user?.publicKey}/payments?cursor=now&include_failed=false`
        : ''
    );
    es.onmessage = async function (message) {
      const data = message.data ? JSON.parse(message.data) : message;

      if ((data.type = 'payment' && issuer === data.asset_issuer)) {
        const res = await indexEntry(data.asset_issuer);
        if (res) {
          setIndexed(true);
        }
      }
    };
    es.onerror = function (error) {
      console.log('An error occurred!', error);
    };

    return () => {
      es.close();
    };
  }, [user?.publicKey, open]);

  return { publicKey: user?.publicKey, indexed };
};

export default nftListener;
