import React, { Component, ReactNode } from 'react';
import {
  View,
  Animated,
  Dimensions,
  FlatList,
  PanResponder,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

export type GestureEvent = {
  nativeEvent: {
    changedTouches: Array<any>;
    identifier: number;
    locationX: number;
    locationY: number;
    pageX: number;
    pageY: number;
    target: number;
    timestamp: number;
    touches: Array<any>;
  };
};

export type GestureState = {
  stateID: number;
  moveX: number;
  moveY: number;
  x0: number;
  y0: number;
  dx: number;
  dy: number;
  vx: number;
  vy: number;
  numberActiveTouches: number;
};

export type ScrollEvent = {
  nativeEvent: {
    contentOffset: {
      x: number;
    };
  };
};

// export type CarouselRenderProps = {
//   itemIndex: number;
//   currentIndex: number;
//   itemCount: number;
//   item: any;
//   animatedValue: Animated.Value;
// };

type CarouselDefaultProps = {
  contentOffset: number;
  data: Array<any>;
  extractKey: (item: any, index: number) => string;
  itemWidth: number;
  onEndReached: () => void;
  onEndReachedThreshold: number;
  onIndexChange: (a: number) => any;
  renderItem: (props: CarouselRenderProps<any>) => any;
  shouldCapture: (e: GestureState) => boolean;
  shouldRelease: (e: GestureState) => boolean;
  threshold: number;
  useNativeDriver: boolean;
  onGestureRelease: () => any;
  onGestureStart: (e: any) => any;
};

// export type CarouselProps = CarouselDefaultProps & {
//   index?: number;
//   style?: any;
//   flatListStyle?: any;
//   useVelocityForIndex?: boolean;
//   contentContainerStyle?: any;
// };

declare type CarouselGestureState = {
  stateID: number;
  moveX: number;
  moveY: number;
  x0: number;
  y0: number;
  dx: number;
  dy: number;
  vx: number;
  vy: number;
  numberActiveTouches: number;
};

declare type CarouselRenderProps<T> = {
  /**
   * index of item in data collection.
   */
  itemIndex: number;

  /**
   * active index of the carousel.
   */
  currentIndex: number;

  /**
   * total count of items in data collection.
   */
  itemCount: number;

  /**
   * item passed from FlatList.
   */
  item: T;

  /**
   * animated value tracking current index.
   */
  animatedValue: Animated.Value;
};

declare type CarouselProps<T> = {
  /**
   * applied to the content container within FlatList.
   * ```
   * |------------ [ style ]--------------------------|
   * | |---------- [ flatListStyle ] ---------------| |
   * | | |-------- [ contentContainerStyle ] -----| | |
   * ```
   */
  contentContainerStyle?: StyleProp<ViewStyle>;

  /**
   * This will equal the padding added to both left and right of itemWidth.
   * ```js
   * const contentOffset = (viewport.width - itemWidth) / 2
   * ```
   */
  contentOffset?: number;

  /**
   * data for FlatList
   */
  data: Array<T>;

  /**
   * used to set the unique key of each item in the carousel.
   */
  extractKey?: (item: T, index: number) => string;

  /**
   * applied to the content container within the content container.
   * ```
   * |------------ [ style ]--------------------------|
   * | |---------- [ flatListStyle ] ---------------| |
   * | | |-------- [ contentContainerStyle ] -----| | |
   * ```
   */
  flatListStyle?: StyleProp<ViewStyle>;

  /**
   * active index of the carousel.
   */
  index?: number;

  /**
   * This is the total width of everything that should be centered when in view.
   * tip: be sure to include any margin added to the left and right of the item.
   */
  itemWidth?: number;

  /**
   * function called when the end of the carousel is reached.
   */
  onEndReached?: () => void;

  /**
   * number between 0 - 1 used to determine when to call onEndReached.
   */
  onEndReachedThreshold?: number;

  /**
   * fired when the active index for the carousel changes.
   */
  onIndexChange?: (index: number) => void;

  /**
   * offset from center of carousel item used for determining index.
   * drag distance examples with different thresholds
   * ```
   * with item width of 200 and no threshold
   * ---------------> <-----------------
   * 0 ------- -index/+index ------- 200
   *
   * with item width of 200 and 50 threshold
   * ---------->           <------------
   * 0 -- -index -- 100 -- +index -- 200
   *
   * with item width of 200 and 75 threshold
   * -------->               <----------
   * 0 - -index --- 100 --- +index - 200
   *
   * with item width of 200 and 90 threshold
   * ----->                      <------
   * 0 -index ----- 100 ----- +index 200
   * ```
   */
  threshold?: number;

  /**
   * to determine the index use the velocity of the gesture.
   */
  useVelocityForIndex?: boolean;

  /**
   * render item method, similar to FlatList with some enhancements.
   */
  renderItem: (props: CarouselRenderProps<T>) => ReactNode;

  /**
   * should we capture touch event.
   */
  shouldCapture?: (state: CarouselGestureState) => boolean;

  /**
   * should we release touch event to another view.
   */
  shouldRelease?: (state: CarouselGestureState) => boolean;

  /**
   * style for the FlatList wrapper View
   * ```
   * |------------ [ style ]--------------------------|
   * | |---------- [ flatListStyle ] ---------------| |
   * | | |-------- [ contentContainerStyle ] -----| | |
   * ```
   */
  style?: StyleProp<ViewStyle>;

  /**
   * should we use native driver for animation.
   */
  useNativeDriver?: boolean;
};

declare class Carousel<T> extends Component<CarouselProps<T>> {}

const { width: screenWidth } = Dimensions.get('window');
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

type State = {
  animatedValue: Animated.Value;
  currentIndex: number;
  itemWidthAnim: Animated.Value;
  scrollPosAnim: Animated.Value;
};

export default class SideSwipe extends Component<any, State> {
  panResponder: any;
  list: any;

  static defaultProps = {
    contentOffset: 0,
    data: [],
    extractKey: (item: any, index: number) =>
      `sideswipe-carousel-item-${index}`,
    itemWidth: screenWidth,
    onEndReached: () => {},
    onEndReachedThreshold: 0.9,
    onGestureStart: () => {},
    onGestureRelease: () => {},
    onIndexChange: () => {},
    renderItem: () => null,
    shouldCapture: ({ dx }: GestureState) => dx * dx > 1,
    shouldRelease: () => false,
    threshold: 0,
    useVelocityForIndex: true,
    useNativeDriver: true,
  };

  constructor(props: any) {
    super(props);

    const currentIndex: number = props.index || 0;
    const initialOffset: number = currentIndex * props.itemWidth;
    const scrollPosAnim: Animated.Value = new Animated.Value(initialOffset);
    const itemWidthAnim: Animated.Value = new Animated.Value(props.itemWidth);
    const animatedValue: any = Animated.divide(scrollPosAnim, itemWidthAnim);

    this.state = {
      animatedValue,
      currentIndex,
      itemWidthAnim,
      scrollPosAnim,
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: this.handleGestureCapture,
      onPanResponderGrant: this.handleGestureStart,
      onPanResponderMove: this.handleGestureMove,
      onPanResponderRelease: this.handleGestureRelease,
      onPanResponderTerminationRequest: this.handleGestureTerminationRequest,
    });
  }

  componentDidUpdate = (prevProps: CarouselProps<any>) => {
    const { contentOffset, index, itemWidth }: any = this.props;

    if (prevProps.itemWidth !== itemWidth) {
      this.state.itemWidthAnim.setValue(itemWidth);
    }

    if (Number.isInteger(index) && index !== prevProps.index) {
      this.setState(
        () => ({ currentIndex: index }),
        () => {
          setTimeout(() =>
            this.list.scrollToIndex({
              animated: true,
              index: this.state.currentIndex,
              viewOffset: contentOffset,
            })
          );
        }
      );
    }
  };

  render = () => {
    const {
      contentContainerStyle,
      contentOffset,
      data,
      extractKey,
      flatListStyle,
      renderItem,
      style,
    } = this.props;
    const { animatedValue, currentIndex, scrollPosAnim } = this.state;
    const dataLength = data.length;

    return (
      <View
        style={[{ width: screenWidth }, style]}
        {...this.panResponder.panHandlers}
      >
        <AnimatedFlatList
          horizontal
          contentContainerStyle={[
            { paddingHorizontal: contentOffset },
            contentContainerStyle,
          ]}
          data={data}
          getItemLayout={this.getItemLayout}
          keyExtractor={extractKey}
          initialScrollIndex={currentIndex}
          ref={this.getRef}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          style={[styles.flatList, flatListStyle]}
          onEndReached={this.props.onEndReached}
          onEndReachedThreshold={this.props.onEndReachedThreshold}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollPosAnim } } }],
            { useNativeDriver: this.props.useNativeDriver }
          )}
          renderItem={({ item, index }: any) =>
            renderItem({
              item,
              currentIndex,
              itemIndex: index,
              itemCount: dataLength,
              animatedValue: animatedValue,
            })
          }
        />
      </View>
    );
  };

  getRef = (ref: any) => {
    if (ref) {
      this.list = ref._component ? ref._component : ref;
    }
  };

  getItemLayout = (data: any, index: number) => ({
    offset: this.props.itemWidth * index + this.props.contentOffset,
    length: this.props.itemWidth,
    index,
  });

  handleGestureTerminationRequest = (e: any, s: any) =>
    this.props.shouldRelease(s);

  handleGestureCapture = (e: any, s: any) => this.props.shouldCapture(s);

  handleGestureStart = (e: any, s: any) => this.props.onGestureStart(s);

  handleGestureMove = (e: any, { dx }: any) => {
    const currentOffset: number =
      this.state.currentIndex * this.props.itemWidth;
    const resolvedOffset: number = currentOffset - dx;

    this.list.scrollToOffset({
      offset: resolvedOffset,
      animated: false,
    });
  };

  handleGestureRelease = (e: any, { dx, vx }: any) => {
    const currentOffset: number =
      this.state.currentIndex * this.props.itemWidth;
    const resolvedOffset: number = currentOffset - dx;
    const resolvedIndex: number = Math.round(
      (resolvedOffset +
        (dx > 0 ? -this.props.threshold : this.props.threshold)) /
        this.props.itemWidth
    );

    let newIndex: number;
    if (this.props.useVelocityForIndex) {
      const absoluteVelocity: number = Math.round(Math.abs(vx));
      const velocityDifference: number =
        absoluteVelocity < 1 ? 0 : absoluteVelocity - 1;

      newIndex =
        dx > 0
          ? Math.max(resolvedIndex - velocityDifference, 0)
          : Math.min(
              resolvedIndex + velocityDifference,
              this.props.data.length - 1
            );
    } else {
      newIndex =
        dx > 0
          ? Math.max(resolvedIndex, 0)
          : Math.min(resolvedIndex, this.props.data.length - 1);
    }

    this.list.scrollToIndex({
      index: newIndex,
      animated: true,
      viewOffset: this.props.contentOffset,
    });

    this.setState(
      () => ({ currentIndex: newIndex }),
      () => {
        this.props.onIndexChange(newIndex);
        this.props.onGestureRelease();
      }
    );
  };
}

const styles = StyleSheet.create({
  flatList: {
    flexGrow: 1,
  },
});
