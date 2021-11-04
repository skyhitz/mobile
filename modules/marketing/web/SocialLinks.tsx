import React from 'react';
import Colors from 'app/constants/Colors';
import { A } from '@expo/html-elements';
import { View } from 'react-native';
let Anchor: React.ComponentType<any> = A;
import Github from 'app/modules/ui/icons/github';
import Insta from 'app/modules/ui/icons/instagram';
import Discord from 'app/modules/ui/icons/discord';
import Twitter from 'app/modules/ui/icons/twitter';

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
          href="https://twitter.com/skyhitz"
          aria-label="Read more about Skyhitz on twitter"
          style={[{ fontSize: 16, color: Colors.white }]}
        >
          <Twitter />
        </Anchor>
      </View>

      <View style={{ marginRight: 10 }}>
        <Anchor
          target="_blank"
          href="https://discord.gg/A7kxDyC5"
          aria-label="Join our server on Discord"
          style={[{ fontSize: 16, color: Colors.white }]}
        >
          <Discord />
        </Anchor>
      </View>
      <View style={{ marginRight: 10 }}>
        <Anchor
          target="_blank"
          href="https://instagram.com/skyhitz"
          aria-label="Read more about Skyhitz on instagram"
          style={[{ fontSize: 16, color: Colors.white }]}
        >
          <Insta />
        </Anchor>
      </View>
      <View style={{ marginRight: 10 }}>
        <Anchor
          target="_blank"
          href="https://github.com/skyhitz"
          aria-label="Audit the code of Skyhitz on github"
          style={[{ fontSize: 16, color: Colors.white }]}
        >
          <Github />
        </Anchor>
      </View>
    </View>
  );
};
