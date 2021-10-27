import React, { Component } from 'react';
import {
  Button,
  Dimensions,
  LayoutAnimation,
  UIManager,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Platform,
  Pressable,
} from 'react-native';
import Colors from 'app/constants/Colors';
import CloseIcon from 'app/modules/ui/icons/x';
import SearchIcon from 'app/modules/ui/icons/search';

import Input from 'app/modules/ui/Input';

const SCREEN_WIDTH = Dimensions.get('window').width;
const IOS_GRAY = Colors.searchTextColor;

class SearchBar extends Component {
  focus = () => {
    this.input.focus();
  };

  blur = () => {
    this.input.blur();
  };

  clear = () => {
    this.input.clear();
    this.onChangeText('');
  };

  cancel = () => {
    this.blur();
    this.props.onCancel && this.props.onCancel();
  };

  onFocus = () => {
    this.props.onFocus && this.props.onFocus();
    UIManager.configureNextLayoutAnimation && LayoutAnimation.easeInEaseOut();
    this.setState({ hasFocus: true });
  };

  onBlur = () => {
    this.props.onBlur && this.props.onBlur();
    UIManager.configureNextLayoutAnimation && LayoutAnimation.easeInEaseOut();
    this.setState({ hasFocus: false });
  };

  onChangeText = (text) => {
    this.props.onChangeText && this.props.onChangeText(text);
    this.setState({ isEmpty: text === '' });
  };

  constructor(props) {
    super(props);
    this.state = {
      hasFocus: false,
      isEmpty: true,
    };
  }

  render() {
    const {
      clearIcon,
      containerStyle,
      leftIcon,
      leftIconContainerStyle,
      rightIconContainerStyle,
      inputStyle,
      noIcon,
      placeholderTextColor,
      showLoading,
      loadingProps,
      ...attributes
    } = this.props;
    const { hasFocus, isEmpty } = this.state;
    const { style: loadingStyle, ...otherLoadingProps } = loadingProps;
    const searchIcon = <SearchIcon size={20} color={IOS_GRAY} />;
    return (
      <View style={styles.container}>
        <Input
          {...attributes}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          ref={(input) => (this.input = input)}
          inputStyle={[
            styles.input,
            inputStyle,
            Platform.OS === 'web' ? { outlineWidth: 0 } : {},
          ]}
          containerStyle={[
            styles.inputContainer,
            !hasFocus && { width: SCREEN_WIDTH - 22, marginRight: 10 },
            containerStyle,
          ]}
          leftIcon={noIcon ? undefined : leftIcon ? leftIcon : searchIcon}
          leftIconContainerStyle={[
            styles.leftIconContainerStyle,
            leftIconContainerStyle,
          ]}
          placeholderTextColor={placeholderTextColor}
          rightIcon={
            <View style={{ flexDirection: 'row' }}>
              {showLoading && (
                <ActivityIndicator
                  style={[
                    clearIcon && !isEmpty && { marginRight: 10 },
                    loadingStyle,
                  ]}
                  {...otherLoadingProps}
                />
              )}
              {clearIcon && !isEmpty && (
                <CloseIcon
                  size={20}
                  color={IOS_GRAY}
                  onPress={() => this.clear()}
                />
              )}
            </View>
          }
          rightIconContainerStyle={[
            styles.rightIconContainerStyle,
            rightIconContainerStyle,
          ]}
        />
        <Pressable onPress={this.cancel}>
          <Text style={styles.cancelBtn}>{'Cancel'}</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    backgroundColor: Colors.darkBlue,
    paddingBottom: 5,
    paddingTop: 8,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginLeft: 6,
    fontSize: 14,
  },
  inputContainer: {
    marginTop: 0,
    borderBottomWidth: 0,
    backgroundColor: Colors.white,
    borderRadius: 6,
    height: 30,
    marginLeft: 10,
  },
  rightIconContainerStyle: {
    marginRight: 8,
  },
  leftIconContainerStyle: {
    marginLeft: 8,
  },
  cancelBtn: {
    color: Colors.white,
    fontSize: 14,
    paddingLeft: 10,
    paddingTop: 8,
  },
});

export default SearchBar;
