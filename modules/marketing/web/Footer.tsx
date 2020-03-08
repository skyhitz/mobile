import React, { useRef } from 'react';
import { Footer } from '@expo/html-elements';
import SocialLinks from './SocialLinks';

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
      <SocialLinks />
    </Footer>
  );
};

export default LandingFooter;
