import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Animated,
} from 'react-native';
import Colors from 'app/constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Input extends Component<any, any> {
  shakeAnimationValue: any;
  input: any;
  UNSAFE_componentWillMount() {
    this.shake = this.shake.bind(this);
    this.shakeAnimationValue = new Animated.Value(0);
    this.props.shake && this.shake();
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  clear() {
    this.input.clear();
  }

  shake() {
    const { shakeAnimationValue } = this;

    shakeAnimationValue.setValue(0);
    // Animation duration based on Material Design
    // https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
    Animated.timing(shakeAnimationValue, {
      duration: 375,
      toValue: 3,
    }).start();
  }

  render() {
    const {
      containerStyle,
      leftIcon,
      leftIconContainerStyle,
      rightIcon,
      rightIconContainerStyle,
      inputStyle,
      displayError,
      errorStyle,
      errorMessage,
      ...attributes
    } = this.props;
    const translateX = this.shakeAnimationValue.interpolate({
      inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
      outputRange: [0, -15, 0, 15, 0, -15, 0],
    });

    return (
      <View>
        <Animated.View
          style={[
            styles.container,
            { width: SCREEN_WIDTH - 75, height: 40 },
            containerStyle,
            { transform: [{ translateX }] },
          ]}
        >
          {leftIcon && (
            <View
              style={[
                styles.iconContainer,
                { marginLeft: 15 },
                leftIconContainerStyle,
              ]}
            >
              {leftIcon}
            </View>
          )}
          <TextInput
            autoCorrect={false}
            placeholderTextColor="#ffff"
            ref={input => (this.input = input)}
            underlineColorAndroid={Colors.transparent}
            style={[
              styles.input,
              { width: SCREEN_WIDTH - 100, height: 40 },
              inputStyle,
            ]}
            {...attributes}
          />
          {rightIcon && (
            <View style={[styles.iconContainer, rightIconContainerStyle]}>
              {rightIcon}
            </View>
          )}
        </Animated.View>
        {displayError && (
          <Text style={[styles.error, errorStyle && errorStyle]}>
            {errorMessage || 'Error!'}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(171, 189, 219, 1)',
    alignItems: 'center',
  },
  iconContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    alignSelf: 'center',
    fontSize: 18,
    marginLeft: 5,
    color: 'white',
  },
  error: {
    color: '#FF2D00',
    margin: 5,
    fontSize: 12,
  },
});

export default Input;
