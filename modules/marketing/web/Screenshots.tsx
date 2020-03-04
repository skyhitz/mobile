import { Dimensions, View, Image } from 'react-native';
import SideSwipe from './Carousel';
import React from 'react';

let data = [
  {
    src:
      'https://res.cloudinary.com/skyhitz/image/upload/v1583267403/web/screen-1.png',
  },
  {
    src:
      'https://res.cloudinary.com/skyhitz/image/upload/v1583267403/web/screen-2.png',
  },
  {
    src:
      'https://res.cloudinary.com/skyhitz/image/upload/v1583267403/web/screen-3.png',
  },
  {
    src:
      'https://res.cloudinary.com/skyhitz/image/upload/v1583267403/web/screen-4.png',
  },
  {
    src:
      'https://res.cloudinary.com/skyhitz/image/upload/v1583267403/web/screen-5.png',
  },
  {
    src:
      'https://res.cloudinary.com/skyhitz/image/upload/v1583267403/web/screen-6.png',
  },
  {
    src:
      'https://res.cloudinary.com/skyhitz/image/upload/v1583267403/web/screen-7.png',
  },
  {
    src:
      'https://res.cloudinary.com/skyhitz/image/upload/v1583267403/web/screen-8.png',
  },
];

export default class ScreenShots extends React.Component {
  state = {
    currentIndex: 0,
  };

  render = () => {
    // center items on screen
    // const { width } = Dimensions.get('window');
    const width = 320;

    return (
      <SideSwipe
        index={this.state.currentIndex}
        itemWidth={width}
        style={{ width }}
        data={data}
        threshold={150}
        contentOffset={0}
        onIndexChange={(index: any) =>
          this.setState(() => ({ currentIndex: index }))
        }
        useNativeDriver={false}
        renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
          <View style={{ paddingHorizontal: 16.5 }}>
            <Image
              source={{
                uri: item.src,
              }}
              style={{ width: 287, height: 582.5 }}
            />
          </View>
        )}
      />
    );
  };
}
