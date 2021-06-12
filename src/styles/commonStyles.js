import { Dimensions, StyleSheet } from 'react-native';
import colors from './colors';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const { highlightColor } = colors;

const commonstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerStyle: {
    width: screenWidth,
    height: screenHeight * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default commonstyles;
