import PropTypes from 'prop-types';
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
  TouchableOpacity,
} from 'react-native';
import Colors from 'app/constants/Colors';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ViewPropTypes from 'app/modules/ui/ViewPropTypes';
import Input from 'app/modules/ui/Input';

const SCREEN_WIDTH = Dimensions.get('window').width;
const IOS_GRAY = '#7d7d7d';

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
    this.props.onClearText && this.props.onClearText();
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

  onChangeText = text => {
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
      cancelButtonTitle,
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
    const searchIcon = (
      <Ionicon size={20} name={'ios-search'} color={IOS_GRAY} />
    );
    return (
      <View style={styles.container}>
        <Input
          {...attributes}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          ref={input => (this.input = input)}
          inputStyle={[styles.input, inputStyle]}
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
              {clearIcon &&
                !isEmpty && (
                  <Ionicon
                    name={'ios-close-circle'}
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
        <TouchableOpacity onPress={this.cancel}>
          <Text style={styles.cancelBtn}>{cancelButtonTitle}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

SearchBar.propTypes = {
  cancelButtonTitle: PropTypes.string,
  clearIcon: PropTypes.bool,
  loadingProps: PropTypes.object,
  noIcon: PropTypes.bool,
  showLoading: PropTypes.bool,
  onClearText: PropTypes.func,
  onCancel: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  leftIcon: PropTypes.object,
  leftIconContainerStyle: ViewPropTypes.style,
  rightIconContainerStyle: ViewPropTypes.style,
  inputStyle: Text.propTypes.style,
  placeholderTextColor: PropTypes.string,
};

SearchBar.defaultProps = {
  cancelButtonTitle: 'Cancel',
  clearIcon: true,
  loadingProps: {},
  noIcon: false,
  showLoading: false,
  onClearText: null,
  onCancel: null,
  placeholderTextColor: IOS_GRAY,
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    backgroundColor: Colors.darkBlue,
    paddingBottom: 10,
    paddingTop: 6,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginLeft: 6,
    fontSize: 14,
  },
  inputContainer: {
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
    color: Colors.searchTextColor,
    fontSize: 14,
    paddingLeft: 10,
    paddingTop: 8,
  },
});

export default SearchBar;
