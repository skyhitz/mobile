import { StyleSheet, View } from 'react-native';
import { useMediaQuery } from 'react-responsive';

function ResponsiveLayout(props) {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <View style={isDesktop ? styles.webContainer : {}}>{props.children}</View>
  );
}
const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    maxWidth: 1136,
    width: '100%',
    marginHorizontal: 'auto',
  },
});

export default ResponsiveLayout;
