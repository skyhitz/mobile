import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Platform,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from 'app/modules/ui/Input';
import Colors from 'app/constants/Colors';
import Ionicon from 'react-native-vector-icons/Ionicons';

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

  onChangeText = (text) => {
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
      <Ionicon
        size={20}
        name={'ios-search'}
        color={Colors.searchTextColor}
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
          ref={(input) => (this.input = input)}
          inputStyle={[
            styles.input,
            Platform.OS === 'web' ? { outlineWidth: 0 } : {},
          ]}
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
                  color={Colors.searchTextColor}
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
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    backgroundColor: Colors.darkBlue,
  },
  input: {
    flex: 1,
    width: '100%',
    color: Colors.searchTextColor,
    fontSize: 14,
  },
  inputContainer: {
    backgroundColor: Colors.white,
    borderBottomWidth: 0,
    width: '100%',
    borderRadius: 6,
    height: 30,
  },
  rightIconContainerStyle: {
    marginRight: 8,
  },
  leftIconContainerStyle: {
    marginLeft: 8,
  },
});

export default SearchBar;
