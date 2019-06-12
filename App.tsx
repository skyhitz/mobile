import React from 'react';
import RootNavigation from './modules/navigation/RootNavigation';
import Providers from './modules/providers/Providers';

const App = () => (
  <Providers>
    <RootNavigation />
  </Providers>
);

export default App;

// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
