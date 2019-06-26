import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { inject } from 'mobx-react';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons';
import Colors from 'app/constants/Colors';
import CancelEditBtn from 'app/modules/ui/CancelEditBtn';
import DoneEditBtn from 'app/modules/ui/DoneEditBtn';
import {
  UserAvatarMedium,
  UserAvatarMediumWithUrlOnly,
  LoadingUserAvatar,
} from 'app/modules/ui/UserAvatar';
import EditProfilePhotoBtn from 'app/modules/profile/EditProfilePhotoBtn';
import { trackSignOut } from 'app/analytics/Tracking';
import { navigate } from 'app/modules/navigation/Navigator';
import { Stores } from 'skyhitz-common';

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
}))
export default class EditProfileScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: 'Edit Profile',
    headerTitleStyle: { color: Colors.white },
    headerStyle: {
      backgroundColor: Colors.headerBackground,
      borderBottomWidth: 0,
    },
    headerLeft: <CancelEditBtn />,
    headerRight: <DoneEditBtn />,
  };
  async handleLogOut() {
    await this.props.logOut();
    trackSignOut();
  }
  async handleWithdrawal() {
    navigate('WithdrawalModal');
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
          <Text style={styles.privateInfo}>Credits</Text>
          <View style={styles.inputContainerBottom}>
            <TouchableOpacity
              style={styles.fieldWithoutBorder}
              onPress={this.handleWithdrawal.bind(this)}
            >
              <View>
                <MaterialCommunityIcons
                  name="coin"
                  size={22}
                  color={Colors.dividerBackground}
                  style={styles.placeholderIcon}
                />
                <Text style={styles.input}>
                  Withdrawal XLM to External Wallet
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
  }
  render() {
    return (
      <View style={styles.container}>
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
              style={styles.input}
              placeholderTextColor="white"
              value={this.props.displayName}
              onChangeText={t => this.props.updateDisplayName(t)}
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
              placeholder="Info"
              autoCorrect={false}
              style={styles.input}
              placeholderTextColor="white"
              value={this.props.description}
              onChangeText={t => this.props.updateDescription(t)}
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
              onChangeText={t => this.props.updateUsername(t)}
              maxLength={30}
            />
          </View>
        </View>
        <Text style={styles.privateInfo}>PRIVATE INFORMATION</Text>
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
              onChangeText={t => this.props.updateEmail(t)}
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
              onChangeText={t => this.props.updatePhone(t)}
              maxLength={15}
            />
          </View>
        </View>
        {this.renderWithdrawalXLM()}
        <Text style={styles.privateInfo}>MORE</Text>
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
      </View>
    );
  }
}

const formPadding = 20;

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
    maxHeight: 120,
    borderBottomColor: Colors.dividerBackground,
    borderBottomWidth: 1,
    borderTopColor: Colors.dividerBackground,
    borderTopWidth: 1,
  },
  inputContainerMiddle: {
    paddingLeft: formPadding,
    paddingRight: formPadding,
    marginTop: 0,
    flex: 1,
    maxHeight: 80,
    borderBottomColor: Colors.dividerBackground,
    borderBottomWidth: 1,
    borderTopColor: Colors.dividerBackground,
    borderTopWidth: 1,
  },
  inputContainerBottom: {
    paddingLeft: formPadding,
    paddingRight: formPadding,
    marginTop: 0,
    flex: 1,
    maxHeight: 40,
    borderBottomColor: Colors.dividerBackground,
    borderBottomWidth: 1,
    borderTopColor: Colors.dividerBackground,
    borderTopWidth: 1,
  },
  input: {
    backgroundColor: Colors.transparent,
    color: Colors.defaultTextLight,
    fontSize: 14,
    paddingLeft: 36,
    bottom: 10,
  },
  field: {
    maxHeight: 40,
    flex: 1,
    borderBottomColor: Colors.dividerBackground,
    borderBottomWidth: 1,
    justifyContent: 'flex-end',
  },
  withdrawalXLMField: {
    maxHeight: 80,
    flex: 1,
    justifyContent: 'flex-end',
  },
  fieldWithoutBorder: {
    maxHeight: 40,
    flex: 1,
    justifyContent: 'flex-end',
  },
  placeholderIcon: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    backgroundColor: Colors.transparent,
  },
  privateInfo: {
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.defaultTextLight,
  },
});
