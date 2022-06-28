import React from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import { observer } from 'mobx-react';
import Colors from 'app/src/constants/Colors';
import LikeOptionRow from 'app/src/search/LikeOptionRow';
import SetPrice from 'app/src/search/SetPrice';
import { Stores } from 'app/src/functions/Stores';
import { useNavigation } from '@react-navigation/native';
import cursorPointer from 'app/src/constants/CursorPointer';
import BuyBtn from 'app/src/ui/buy-btn/BuyBtn';

export default observer(({ route }) => {
  const { sessionStore } = Stores();
  const { entry, previousScreen } = route.params;
  const { goBack } = useNavigation();

  const renderSetPrice = (entry: any) => {
    if (!sessionStore.user) return;
    if (previousScreen === 'MyMusicScreen') {
      return <SetPrice entry={entry} />;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoWrap}>
        <Image source={{ uri: entry.imageUrlMedium }} style={styles.thumb} />
        <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
          {entry.title}
        </Text>
        <Text style={styles.artistName} ellipsizeMode="tail" numberOfLines={1}>
          {entry.artist}
        </Text>
      </View>
      <View style={styles.options}>
        <BuyBtn entry={entry} />

        <LikeOptionRow entry={entry} />

        {renderSetPrice(entry)}
      </View>
      <View style={styles.bottomWrap}>
        <Pressable style={cursorPointer} onPress={() => goBack()}>
          <Text style={styles.btnText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBlueTransparent,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    paddingTop: 80,
    paddingHorizontal: 30,
  },
  infoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  options: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  bottomWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    maxHeight: 50,
  },
  thumb: {
    width: 224,
    height: 224,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 40,
  },
  artistName: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    color: Colors.white,
  },
  text: {
    fontSize: 14,
    textAlign: 'left',
    color: Colors.white,
    paddingLeft: 10,
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.white,
  },
});
