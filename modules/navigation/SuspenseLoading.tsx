import React, { Suspense } from 'react';
import LoadingScreen from '../accounts/LoadingScreen';

export const SuspenseLoading = (props) => (
  <Suspense fallback={<LoadingScreen />}>{props.children}</Suspense>
);
