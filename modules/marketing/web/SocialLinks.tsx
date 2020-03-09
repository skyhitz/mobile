import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import Colors from 'app/constants/Colors';
import { A } from '@expo/html-elements';
import { View } from 'react-native';
let Anchor: React.ComponentType<any> = A;

export default () => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row' }}>
      <View
        style={{
          marginRight: 10,
        }}
      >
        <Anchor
          target="_blank"
          href="https://twitter.com/skyhitzio"
          aria-label="Read more about Skyhitz on twitter"
          style={[{ fontSize: 16 }]}
        >
          <FontAwesome name="twitter" size={16} color={Colors.white} />
        </Anchor>
      </View>
      <View style={{ marginRight: 10 }}>
        <Anchor
          target="_blank"
          href="https://medium.com/skyhitz"
          aria-label="Read more about Skyhitz on medium"
          style={[{ fontSize: 16, color: Colors.white }]}
        >
          <FontAwesome name="medium" size={16} color={Colors.white} />
        </Anchor>
      </View>
      <View style={{ marginRight: 10 }}>
        <Anchor
          target="_blank"
          href="https://www.facebook.com/skyhitzio"
          aria-label="Read more about Skyhitz on facebook"
          style={[{ fontSize: 16, color: Colors.white }]}
        >
          <FontAwesome name="facebook" size={16} color={Colors.white} />
        </Anchor>
      </View>
      <View style={{ marginRight: 10 }}>
        <Anchor
          target="_blank"
          href="https://instagram.com/skyhitz"
          aria-label="Read more about Skyhitz on instagram"
          style={[{ fontSize: 16, color: Colors.white }]}
        >
          <FontAwesome name="instagram" size={16} color={Colors.white} />
        </Anchor>
      </View>
      <View style={{ marginRight: 10 }}>
        <Anchor
          target="_blank"
          href="https://angel.co/skyhitz"
          aria-label="Read more about Skyhitz on angellist"
          style={[{ fontSize: 16, color: Colors.white }]}
        >
          <FontAwesome name="angellist" size={16} color={Colors.white} />
        </Anchor>
      </View>
    </View>
  );
};
