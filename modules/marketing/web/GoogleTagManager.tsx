/// <reference path="./GoogleTagManager.d.ts" />

import TagManager from 'react-gtm-module';

const tagManagerArgs = {
  gtmId: 'GTM-5HR7H3L',
};

export function initializeGoogleTagManager() {
  TagManager.initialize(tagManagerArgs);
}
