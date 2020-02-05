import React from 'react';
import { Text } from 'react-native';
import { Linking } from 'expo';

export default class Link extends React.Component<any, any> {
    _handlePress = () => {
        Linking.openURL(this.props.href);
        this.props.onPress && this.props.onPress();
    };

    render() {
        return (
            <Text {...this.props} onPress={this._handlePress}>
                {this.props.children}
            </Text>
        );
    }
}