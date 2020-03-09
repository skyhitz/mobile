import React from 'react';
import { Footer, A } from '@expo/html-elements';
import SocialLinks from './SocialLinks';
import Colors from 'app/constants/Colors';
let Anchor: React.ComponentType<any> = A;

const LandingFooter = () => {
  return (
    <Footer
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 60,
        marginBottom: 20,
        marginTop: 20,
        alignItems: 'center',
        width: '94%',
        alignSelf: 'center',
      }}
    >
      <Anchor
        href="/terms"
        target="_self"
        style={{
          color: Colors.white,
        }}
      >
        Terms of Use
      </Anchor>
      <Anchor
        href="/privacy"
        target="_self"
        style={{
          color: Colors.white,
          paddingHorizontal: 20,
        }}
      >
        Privacy Policy
      </Anchor>
      <SocialLinks />
    </Footer>
  );
};

export default LandingFooter;
