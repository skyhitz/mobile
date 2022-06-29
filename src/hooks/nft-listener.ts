import { useEffect, useState } from 'react';
import { Stores } from 'app/src/functions/Stores';
import { Config } from 'app/src/config';
import { userAtom } from '../atoms/atoms';
import { useRecoilValue } from 'recoil';
const EventSource = require('eventsource');

const nftListener = (open) => {
  const { entryStore } = Stores();
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

      if ((data.type = 'payment' && entryStore.issuer === data.asset_issuer)) {
        const indexEntry = await entryStore.indexEntry(data.asset_issuer);
        if (indexEntry) {
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
