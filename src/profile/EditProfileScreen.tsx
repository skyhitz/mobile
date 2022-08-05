import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Colors from 'app/src/constants/Colors';
import {
  UserAvatarMedium,
  UserAvatarMediumWithUrlOnly,
  LoadingUserAvatar,
} from 'app/src/ui/UserAvatar';
import EditProfilePhotoBtn from 'app/src/profile/EditProfilePhotoBtn';
import LargeBtn from '../ui/LargeBtn';
import cursorPointer from 'app/src/constants/CursorPointer';
import AccountBoxIcon from 'app/src/ui/icons/account-box';
import PersonOutlineIcon from 'app/src/ui/icons/person-outline';
import MailOutlineIcon from 'app/src/ui/icons/mail-outline';
import LogoutIcon from 'app/src/ui/icons/logout';
import InfoCirlceIcon from 'app/src/ui/icons/info-circle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessionStore } from '../stores/session';
import { profileAtom, profileValidationErrorAtom } from '../atoms/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

export default (props) => {
  const { signOut } = SessionStore();
  const [
    { loadingAvatar, avatarUrl, displayName, username, email, description },
    setEditProfile,
  ] = useRecoilState(profileAtom);

  const validationError = useRecoilValue(profileValidationErrorAtom);

  const handleLogOut = async () => {
    await signOut();
    await AsyncStorage.multiRemove(await AsyncStorage.getAllKeys());
    props.navigation.navigate(Platform.OS === 'web' ? 'WebApp' : 'AuthScreen');
  };

  const handleWithdrawal = async () => {
    props.navigation.navigate('WithdrawalModal');
  };

  // TODO: fix props.profile with initials
  const renderAvatar = () => {
    if (loadingAvatar) {
      return <LoadingUserAvatar />;
    }
    if (avatarUrl) {
      return UserAvatarMediumWithUrlOnly(avatarUrl);
    }
    return UserAvatarMedium(props.profile);
  };

  // TODO: get credits from payments store
  const renderWithdrawalXLM = () => {
    if (props.credits && props.credits > 0) {
      return (
        <View style={styles.withdrawalXLMField}>
          <Text style={styles.creditsInfo}>Credits</Text>
          <LargeBtn text="Withdraw" onPress={handleWithdrawal} />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}
        enabled={false}
      >
        <View
          style={[styles.errorContainer, { opacity: validationError ? 1 : 0 }]}
        >
          <Text style={styles.error}>{validationError}</Text>
        </View>
        <View style={styles.headerWrap}>
          {renderAvatar()}
          <EditProfilePhotoBtn />
        </View>

        <View style={styles.inputContainerTop}>
          <View style={styles.field}>
            <View style={styles.placeholderIcon}>
              <AccountBoxIcon size={20} color={Colors.dividerBackground} />
            </View>
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
              value={displayName}
              onChangeText={(text) =>
                setEditProfile((oldState) => ({
                  ...oldState,
                  displayName: text,
                }))
              }
              maxLength={30}
            />
          </View>
          <View style={styles.field}>
            <View style={styles.placeholderIcon}>
              <InfoCirlceIcon size={24} color={Colors.dividerBackground} />
            </View>
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholder="Description"
              autoCorrect={false}
              style={[
                styles.input,
                Platform.OS === 'web' ? ({ outlineWidth: 0 } as any) : {},
              ]}
              placeholderTextColor="white"
              value={description}
              onChangeText={(text) =>
                setEditProfile((oldState) => ({
                  ...oldState,
                  description: text,
                }))
              }
              maxLength={150}
            />
          </View>
          <View style={styles.fieldWithoutBorder}>
            <View style={styles.placeholderIcon}>
              <PersonOutlineIcon size={24} color={Colors.dividerBackground} />
            </View>
            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholder="Username"
              autoCorrect={false}
              style={[
                styles.input,
                Platform.OS === 'web' ? ({ outlineWidth: 0 } as any) : {},
              ]}
              placeholderTextColor="white"
              value={username}
              onChangeText={(text) =>
                setEditProfile((oldState) => ({
                  ...oldState,
                  username: text,
                }))
              }
              maxLength={30}
            />
          </View>
        </View>
        <Text style={styles.privateInfo}>Private Information</Text>
        <View style={styles.inputContainerMiddle}>
          <View style={styles.field}>
            <View style={styles.placeholderIcon}>
              <MailOutlineIcon size={22} color={Colors.dividerBackground} />
            </View>

            <TextInput
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              placeholder="Email address"
              autoCorrect={false}
              style={[
                styles.input,
                Platform.OS === 'web' ? ({ outlineWidth: 0 } as any) : {},
              ]}
              placeholderTextColor="white"
              value={email}
              onChangeText={(text) =>
                setEditProfile((oldState) => ({
                  ...oldState,
                  email: text,
                }))
              }
              maxLength={34}
            />
          </View>
        </View>
        {renderWithdrawalXLM()}
        <Text style={styles.privateInfo}>More</Text>
        <View style={styles.inputContainerBottom}>
          <Pressable
            style={[styles.fieldWithoutBorder, cursorPointer]}
            onPress={handleLogOut}
          >
            <View style={styles.placeholderIcon}>
              <View style={styles.placeholderIcon}>
                <LogoutIcon size={22} color={Colors.dividerBackground} />
              </View>
              <Text style={styles.input}>Log Out</Text>
            </View>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

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
    maxHeight: maxHeight,
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
