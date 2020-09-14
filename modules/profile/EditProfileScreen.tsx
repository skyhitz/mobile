import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { inject } from 'mobx-react';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons';
import Colors from 'app/constants/Colors';
import {
  UserAvatarMedium,
  UserAvatarMediumWithUrlOnly,
  LoadingUserAvatar,
} from 'app/modules/ui/UserAvatar';
import EditProfilePhotoBtn from 'app/modules/profile/EditProfilePhotoBtn';
import * as stores from 'app/skyhitz-common';
import LargeBtn from '../ui/LargeBtn';
type Stores = typeof stores;

@inject((stores: Stores) => ({
  profile: stores.editProfileStore.profile,
  avatarUrl: stores.editProfileStore.avatarUrl,
  loadingAvatar: stores.editProfileStore.loadingAvatar,
  displayName: stores.editProfileStore.displayName,
  description: stores.editProfileStore.description,
  username: stores.editProfileStore.username,
  email: stores.editProfileStore.email,
  phone: stores.editProfileStore.phone,
  updateDisplayName: stores.editProfileStore.updateDisplayName.bind(
    stores.editProfileStore
  ),
  updateDescription: stores.editProfileStore.updateDescription.bind(
    stores.editProfileStore
  ),
  updateUsername: stores.editProfileStore.updateUsername.bind(
    stores.editProfileStore
  ),
  updateEmail: stores.editProfileStore.updateEmail.bind(
    stores.editProfileStore
  ),
  updatePhone: stores.editProfileStore.updatePhone.bind(
    stores.editProfileStore
  ),
  logOut: stores.sessionStore.signOut.bind(stores.sessionStore),
  credits: stores.paymentsStore.credits,
  validationError: stores.editProfileStore.validationError,
}))
export default class EditProfileScreen extends React.Component<any, any> {
  async handleLogOut() {
    await this.props.logOut();
  }
  async handleWithdrawal() {
    this.props.navigation.navigate('WithdrawalModal');
  }
  renderAvatar() {
    if (this.props.loadingAvatar) {
      return <LoadingUserAvatar />;
    }
    if (this.props.avatarUrl) {
      return UserAvatarMediumWithUrlOnly(this.props.avatarUrl);
    }
    return UserAvatarMedium(this.props.profile);
  }
  renderWithdrawalXLM() {
    if (this.props.credits && this.props.credits > 0) {
      return (
        <View style={styles.withdrawalXLMField}>
          <Text style={styles.creditsInfo}>Credits</Text>
          <LargeBtn
            text="Withdraw"
            onPress={this.handleWithdrawal.bind(this)}
          />
        </View>
      );
    }
    return null;
  }
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={styles.container}
          enabled={false}
        >
          <View
            style={[
              styles.errorContainer,
              { opacity: this.props.validationError ? 1 : 0 },
            ]}
          >
            <Text style={styles.error}>{this.props.validationError}</Text>
          </View>
          <View style={styles.headerWrap}>
            {this.renderAvatar()}
            <EditProfilePhotoBtn />
          </View>

          <View style={styles.inputContainerTop}>
            <View style={styles.field}>
              <MaterialCommunityIcons
                name="account-card-details"
                size={20}
                color={Colors.dividerBackground}
                style={styles.placeholderIcon}
              />
              <TextInput
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                placeholder="Display Name"
                autoCorrect={false}
                autoFocus={true}
                style={[
                  styles.input,
                  Platform.OS === 'web' ? ({ outlineWidth: 0 } as any) : {},
                ]}
                placeholderTextColor="white"
                value={this.props.displayName}
                onChangeText={(t) => this.props.updateDisplayName(t)}
                maxLength={30}
              />
            </View>
            <View style={styles.field}>
              <FontAwesome
                name="info-circle"
                size={24}
                color={Colors.dividerBackground}
                style={styles.placeholderIcon}
              />
              <TextInput
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                placeholder="Description"
                autoCorrect={false}
                style={styles.input}
                placeholderTextColor="white"
                value={this.props.description}
                onChangeText={(t) => this.props.updateDescription(t)}
                maxLength={150}
              />
            </View>
            <View style={styles.fieldWithoutBorder}>
              <MaterialIcons
                name="person-outline"
                size={24}
                color={Colors.dividerBackground}
                style={styles.placeholderIcon}
              />
              <TextInput
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                placeholder="Username"
                autoCorrect={false}
                style={styles.input}
                placeholderTextColor="white"
                value={this.props.username}
                onChangeText={(t) => this.props.updateUsername(t)}
                maxLength={30}
              />
            </View>
          </View>
          <Text style={styles.privateInfo}>Private Information</Text>
          <View style={styles.inputContainerMiddle}>
            <View style={styles.field}>
              <MaterialIcons
                name="mail-outline"
                size={22}
                color={Colors.dividerBackground}
                style={styles.placeholderIcon}
              />
              <TextInput
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                placeholder="Email address"
                autoCorrect={false}
                style={styles.input}
                placeholderTextColor="white"
                value={this.props.email}
                onChangeText={(t) => this.props.updateEmail(t)}
                maxLength={34}
              />
            </View>
            <View style={styles.fieldWithoutBorder}>
              <MaterialIcons
                name="phone-iphone"
                size={22}
                color={Colors.dividerBackground}
                style={styles.placeholderIcon}
              />
              <TextInput
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                placeholder="Phone Number"
                autoCorrect={false}
                style={styles.input}
                placeholderTextColor="white"
                value={this.props.phone}
                onChangeText={(t) => this.props.updatePhone(t)}
                maxLength={15}
              />
            </View>
          </View>
          {this.renderWithdrawalXLM()}
          <Text style={styles.privateInfo}>More</Text>
          <View style={styles.inputContainerBottom}>
            <TouchableOpacity
              style={styles.fieldWithoutBorder}
              onPress={this.handleLogOut.bind(this)}
            >
              <View>
                <MaterialCommunityIcons
                  name="logout"
                  size={22}
                  color={Colors.dividerBackground}
                  style={styles.placeholderIcon}
                />
                <Text style={styles.input}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const formPadding = 20;
const maxHeight = 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.listItemBackground,
  },
  headerWrap: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainerTop: {
    paddingLeft: formPadding,
    paddingRight: formPadding,
    marginTop: 0,
    flex: 1,
    maxHeight: maxHeight * 3,
    borderBottomColor: Colors.transparent,
    borderBottomWidth: 1,
    borderTopColor: Colors.transparent,
    borderTopWidth: 1,
  },
  inputContainerMiddle: {
    paddingLeft: formPadding,
    paddingRight: formPadding,
    marginTop: 0,
    flex: 1,
    maxHeight: maxHeight * 2,
    borderBottomColor: Colors.transparent,
    borderBottomWidth: 1,
    borderTopColor: Colors.transparent,
    borderTopWidth: 1,
  },
  inputContainerBottom: {
    paddingLeft: formPadding,
    paddingRight: formPadding,
    marginTop: 0,
    width: '100%',
    height: maxHeight,
    borderBottomColor: Colors.transparent,
    borderBottomWidth: 1,
    borderTopColor: Colors.transparent,
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  withdrawalContainer: {
    paddingLeft: formPadding,
    paddingRight: formPadding,
    marginTop: 0,
    flex: 1,
    height: 50,
    minHeight: 50,
    borderBottomColor: Colors.transparent,
    borderBottomWidth: 1,
    borderTopColor: Colors.transparent,
    borderTopWidth: 1,
  },
  input: {
    backgroundColor: Colors.transparent,
    color: Colors.defaultTextLight,
    fontSize: 14,
    paddingLeft: 36,
  },
  withdrawInput: {
    backgroundColor: Colors.transparent,
    color: Colors.defaultTextLight,
    fontSize: 14,
    paddingLeft: 36,
    bottom: 0,
  },
  field: {
    height: maxHeight,
    borderBottomColor: Colors.dividerBackground,
    borderBottomWidth: 0.5,
    justifyContent: 'flex-start',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  withdrawalXLMField: {
    paddingLeft: 18,
    height: 80,
    width: '100%',
    justifyContent: 'center',
    paddingBottom: 10,
    marginTop: 20,
  },
  fieldWithoutBorder: {
    height: maxHeight,
    justifyContent: 'flex-start',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholderIcon: {
    position: 'absolute',
    left: 0,
    backgroundColor: Colors.transparent,
  },
  coinIcon: {
    position: 'absolute',
    left: 20,
    backgroundColor: Colors.transparent,
  },
  privateInfo: {
    paddingLeft: 18,
    paddingTop: 30,
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.defaultTextLight,
  },
  creditsInfo: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.defaultTextLight,
  },
  errorContainer: {
    maxHeight: 40,
    backgroundColor: Colors.errorBackground,
    paddingLeft: formPadding,
    paddingRight: formPadding,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: Colors.white,
  },
});
