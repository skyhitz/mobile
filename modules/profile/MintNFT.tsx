import React from 'react';
import { ScrollView } from 'react-native';
import ResponsiveLayout from '../ui/ResponsiveLayout';
import SelectMediaFile from './SelectMediaFile';

const NewNFT = () => {
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <ResponsiveLayout>
        <SelectMediaFile />
      </ResponsiveLayout>
    </ScrollView>
  );
};

export default NewNFT;
