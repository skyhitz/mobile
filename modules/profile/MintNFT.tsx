import React from 'react';
import { ScrollView } from 'react-native';
import ResponsiveLayout from '../ui/ResponsiveLayout';
import MediaUpload from './MediaUpload';

const NewNFT = () => {
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <ResponsiveLayout>
        <MediaUpload />
      </ResponsiveLayout>
    </ScrollView>
  );
};

export default NewNFT;
