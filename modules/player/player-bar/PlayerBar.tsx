import React from 'react';
import { inject } from 'mobx-react';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { EvilIcons } from '@expo/vector-icons';
import PlayBtnSmall from 'app/modules/player/player-bar/play-btn-small/PlayBtnSmall';
import PlayerScreen from 'app/modules/player/player-screen/PlayerScreen';
import Colors from 'app/constants/Colors';
import Layout from 'app/constants/Layout';
import {
  StatusBar,
  StyleSheet,
  Animated,
  PanResponder,
  Text,
  View,
  Dimensions,
  PanResponderInstance,
} from 'react-native';
import * as stores from 'app/skyhitz-common';
import { TouchableOpacity } from 'react-native-gesture-handler';
type Stores = typeof stores;

const animationSpeed = 350;

let tabBarHeight = 50;
let tabNavBottom = 89;

if (isIphoneX()) {
  tabBarHeight = 83;
  tabNavBottom = 123;
}

@inject((stores: Stores) => ({
  show: stores.playerStore.show,
  showPlayer: stores.playerStore.showPlayer.bind(stores.playerStore),
  hidePlayer: stores.playerStore.hidePlayer.bind(stores.playerStore),
  hideTabPlayer: stores.playerStore.hideTabPlayer,
  updateTabBarBottomPosition: stores.playerStore.updateTabBarBottomPosition.bind(
    stores.playerStore
  ),
  entry: stores.playerStore.entry,
}))
export default class PlayerBar extends React.Component<any, any> {
  _animatedValueX!: number;
  _animatedValueY!: number;
  _panResponder!: PanResponderInstance;
  state = {
    pan: new Animated.ValueXY(),
  };

  getTabBarStyles() {
    return [styles.container];
  }
  getOverlayStyle() {
    return [
      styles.modalPlayer,
      {
        transform: [
          { translateX: this.state.pan.x },
          { translateY: this.state.pan.y },
        ],
      },
    ];
  }
  getPlayerModalStyle() {
    return [
      styles.modalPlayerIn,
      {
        opacity: this.state.pan.y.interpolate({
          inputRange: [-(Dimensions.get('window').height - tabBarHeight), 0],
          outputRange: [1, 0],
        }),
      },
    ];
  }
  getTabPlayerOpacity() {
    if (this.props.hideTabPlayer) {
      return 1;
    }
    return this.state.pan.y.interpolate({
      inputRange: [-Dimensions.get('window').height, 0],
      outputRange: [0, 1],
    });
  }
  getTabPlayerStyle() {
    return [
      styles.tabPlayer,
      {
        opacity: this.getTabPlayerOpacity(),
      },
    ];
  }
  showModalPlayer() {
    StatusBar.setHidden(true, 'slide');
    Animated.timing(this.state.pan.y, {
      duration: animationSpeed,
      toValue: -Dimensions.get('window').height + tabBarHeight,
    }).start();
  }
  hideModalPlayer(fast?: boolean) {
    StatusBar.setHidden(false, 'slide');
    Animated.timing(this.state.pan.y, {
      duration: fast ? 150 : animationSpeed,
      toValue: 0,
    }).start();
  }
  UNSAFE_componentWillMount() {
    this._animatedValueX = 0;
    this._animatedValueY = 0;
    this.state.pan.x.addListener(value => (this._animatedValueX = value.value));
    this.state.pan.y.addListener(value => {
      if (value.value > 0) {
        return;
      }
      this._animatedValueY = value.value;
      this.props.updateTabBarBottomPosition(this._animatedValueY);
    });
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
      onPanResponderGrant: () => {
        this.state.pan.setOffset({
          x: this._animatedValueX,
          y: this._animatedValueY,
        });
        this.state.pan.setValue({ x: 0, y: 0 }); //Initial value
      },
      onPanResponderMove: (e, gestureState) => {
        let gestureEvent: any = {
          dy: this.state.pan.y,
        };
        // sets limit to block dragging the player bar down
        if (gestureState.dy > 0) {
          gestureEvent = null;
        }
        Animated.event([null, gestureEvent])(e, gestureState);
      },
      onPanResponderRelease: (e, gestureState) => {
        this.state.pan.flattenOffset();
        if (gestureState.dy < -10) {
          return this.props.showPlayer();
        }
        this.props.hidePlayer();
      },
    });
    if (this.props.hideTabPlayer) {
      this.state.pan.setValue({ x: 0, y: 40 });
    }
  }
  componentDidUpdate() {
    this.toggleModalPlayer(this.props.show);
  }
  toggleModalPlayer(show: any) {
    if (show) {
      return this.showModalPlayer();
    }
    return this.hideModalPlayer();
  }
  handleOnTabBarPress() {
    this.props.showPlayer();
  }
  renderTabBar() {
    return (
      <Animated.View style={this.getTabPlayerStyle()}>
        <View style={styles.bg}>
          <TouchableOpacity
            onPress={() => this.handleOnTabBarPress()}
            onLongPress={() => this.handleOnTabBarPress()}
            style={styles.tabPlayerLeftSection}
          >
            <View style={styles.tabPlayerLeftSection}>
              <EvilIcons
                name={'chevron-up'}
                size={36}
                color={Colors.white}
                style={styles.arrowUp}
              />
              <Text
                style={styles.entryTitle}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {this.props.entry
                  ? this.props.entry.title + '  -  ' + this.props.entry.artist
                  : ''}
              </Text>
            </View>
          </TouchableOpacity>
          <PlayBtnSmall />
        </View>
      </Animated.View>
    );
  }
  render() {
    return (
      <View style={styles.tabNav}>
        <Animated.View style={this.getOverlayStyle()}>
          {this.renderTabBar()}
          <Animated.View style={this.getPlayerModalStyle()}>
            <PlayerScreen />
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: tabBarHeight,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
  },
  bg: {
    width: Dimensions.get('window').width,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalPlayer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + 40,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
  },
  tabPlayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(41, 43, 51, 0.9)',
  },
  tabPlayerLeftSection: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: Layout.window.width - 70,
    height: 40,
    zIndex: 11,
  },
  entryTitle: {
    fontSize: 12,
    color: 'white',
    paddingLeft: 4,
  },
  modalPlayerIn: {
    flex: 1,
  },
  tabNav: {
    position: 'absolute',
    bottom: tabNavBottom,
  },
  arrowUp: {
    alignSelf: 'center',
  },
});
