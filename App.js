import React from 'react';
import RootNavigation from 'app/modules/navigation/RootNavigation';
import Providers from 'app/modules/providers/Providers';

const App = () => (
  <Providers>
    <RootNavigation />
  </Providers>
);

export default App;
