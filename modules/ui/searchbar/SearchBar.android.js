import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ViewPropTypes from 'app/modules/ui/ViewPropTypes';
import Input from 'app/modules/ui/Input';
import Colors from 'app/constants/Colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ANDROID_GRAY = Colors.searchTextColor;

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
    this.props.onCancel();
  };

  onFocus = () => {
    this.props.onFocus();
    this.setState({ hasFocus: true });
  };

  onBlur = () => {
    this.props.onBlur();
    this.setState({ hasFocus: false });
  };

  onChangeText = text => {
    this.props.onChangeText(text);
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
      showLoading,
      loadingProps,
      ...attributes
    } = this.props;
    const { hasFocus, isEmpty } = this.state;
    const { style: loadingStyle, ...otherLoadingProps } = loadingProps;
    const searchIcon = (
      <MaterialIcon
        size={25}
        color={ANDROID_GRAY}
        name={'magnify'}
        onPress={hasFocus ? this.cancel : null}
      />
    );
    return (
      <View style={styles.container}>
        <Input
          {...attributes}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          ref={input => (this.input = input)}
          inputStyle={[styles.input]}
          containerStyle={[styles.inputContainer, containerStyle]}
          leftIcon={noIcon ? undefined : leftIcon ? leftIcon : searchIcon}
          leftIconContainerStyle={[
            styles.leftIconContainerStyle,
            leftIconContainerStyle,
          ]}
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
                <MaterialIcon
                  name={'close'}
                  size={25}
                  color={ANDROID_GRAY}
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
      </View>
    );
  }
}

SearchBar.defaultProps = {
  clearIcon: true,
  loadingProps: {},
  noIcon: false,
  showLoading: false,
  onCancel: () => null,
  onFocus: () => null,
  onBlur: () => null,
  onChangeText: () => null,
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    marginTop: 6,
    marginBottom: 8,
    marginLeft: 4,
    marginRight: 4,
    height: 40,
  },
  input: {
    flex: 1,
    color: Colors.searchTextColor,
    outlineWidth: 0,
  },
  inputContainer: {
    backgroundColor: Colors.white,
    borderBottomWidth: 0,
    marginLeft: 10,
    marginRight: 10,
    width: SCREEN_WIDTH - 30,
    borderRadius: 6,
  },
  rightIconContainerStyle: {
    marginRight: 8,
  },
  leftIconContainerStyle: {
    marginLeft: 8,
  },
});

export default SearchBar;
