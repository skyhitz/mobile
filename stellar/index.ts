import { Config } from 'app/skyhitz-common/src/config';
import {
  TransactionBuilder,
  Account,
  Networks,
  BASE_FEE,
  Operation,
} from 'stellar-base';

export function getHorizonConfig() {
  switch (Config.HORIZON_URL) {
    case 'https://horizon-testnet.stellar.org':
      return {
        network: 'testnet',
        networkPassphrase: Networks['TESTNET'],
        horizonUrl: 'https://horizon-testnet.stellar.org',
        ipfsUrl: (cid) => `https://ipfs.io/ipfs/${cid}`,
        explorerAssetUrl: (code, issuer) =>
          `https://stellar.expert/explorer/testnet/asset/${code}-${issuer}`,
        explorerAssetHoldersUrl: (code, issuer) =>
          `https://stellar.expert/explorer/testnet/asset/${code}-${issuer}?filter=asset-holders`,
        dexAssetUrl: (code, issuer) =>
          `https://stellarterm.com/exchange/${code}-${issuer}/XLM-native/testnet`,
      };
    default:
      return {
        network: 'pubnet',
        networkPassphrase: Networks['PUBLIC'],
        horizonUrl: 'https://horizon.stellar.org',
        ipfsUrl: (cid) => `https://ipfs.io/ipfs/${cid}`,
        explorerAssetUrl: (code, issuer) =>
          `https://stellar.expert/explorer/public/asset/${code}-${issuer}`,
        explorerAssetHoldersUrl: (code, issuer) =>
          `https://stellar.expert/explorer/public/asset/${code}-${issuer}?filter=asset-holders`,
        dexAssetUrl: (code, issuer) =>
          `https://stellarterm.com/exchange/${code}-${issuer}/XLM-native`,
      };
  }
}

const getAccountData = async (address: string) => {
  const res = await fetch(`${Config.HORIZON_URL}/accounts/${address}`);
  const json = await res.json();
  return json;
};

export const getFee = async (
  horizonUrl: string = Config.HORIZON_URL
): Promise<string> => {
  try {
    const res = await fetch(horizonUrl + `/fee_stats`);
    const { feeStats } = await res.json();
    return feeStats.max_fee.mode;
  } catch (e) {
    return BASE_FEE;
  }
};

export async function getAccount(publicKey) {
  const { id, sequence } = await getAccountData(publicKey);
  return new Account(id, sequence);
}

async function buildTransactionWithFee(accountPublicKey) {
  const [account, fee] = await Promise.all([
    await getAccount(accountPublicKey),
    await getFee(),
  ]);
  return new TransactionBuilder(account, {
    fee: fee,
    networkPassphrase: getHorizonConfig().networkPassphrase,
  });
}

export const signManageDataOp = async (publicKey: string) => {
  const transaction = await buildTransactionWithFee(publicKey);
  return transaction
    .addOperation(
      Operation.manageData({
        source: publicKey,
        name: 'skyhitz',
        value: 'The owner of this account is a Skyhitz user.',
      })
    )
    .setTimeout(0)
    .build()
    .toEnvelope()
    .toXDR('base64');
};
