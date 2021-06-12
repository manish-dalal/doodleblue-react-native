import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

import colors from '../styles/colors';

const { highlightColor, themeColor } = colors;

/* List of props----------------------------------------------------------------------------

title:        [important - "string"]  set button text
width:        [int or "percent"]      set button width
height:       [int or "percent"]      set button height
filled:       [boolean]               set button type filled {true} or empty (white) {false}
smoothEdges:  [boolean]               set borderRadius to 5 {true} or none {false}
fontSize:     [int or "px"]           set fontSize (default: 14)
onPress:      [function]              set onPress to the touchableHilight
*/

const styles = StyleSheet.create({
  customButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  customButtonText: {
    color: highlightColor,
  },
});

const propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  width: PropTypes.number,
  color: PropTypes.string,
  smoothEdges: PropTypes.bool,
  fontSize: PropTypes.number,
  height: PropTypes.number,
  loading: PropTypes.bool,
  textStyles: PropTypes.object,
  disabled: PropTypes.bool,
};

function Button(props) {
  const {
    title,
    width,
    color = themeColor,
    smoothEdges,
    onPress,
    fontSize,
    height = 40,
    loading,
    textStyles = {},
    disabled,
  } = props;
  return (
    <View style={{ height }}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.customButtonContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            borderRadius: smoothEdges ? 5 : 0,
            backgroundColor: color,
            borderColor: color,
            width: width || '100%',
            height: height,
            opacity: disabled ? 0.6 : 1,
          },
        ]}>
        {loading && <ActivityIndicator size="small" color={highlightColor} />}
        <Text
          numberOfLines={1}
          style={[
            styles.customButtonText,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              color: highlightColor,
              fontSize: fontSize || 14,
              paddingLeft: loading ? 5 : 0,
              paddingTop: Platform.OS === 'ios' ? 6 : 2,
              ...textStyles,
            },
          ]}>
          {title || "Please pass 'title' prop!"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

Button.propTypes = propTypes;
export default Button;
