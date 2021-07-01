import React from 'react';
import {View, StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import StyleSpinner from 'react-native-spinkit';

const LoadingOverlay = props => {
  return (
    <View>
      <Spinner
        visible={props.loading}
        customIndicator={
          <View style={styles.activityIndicatorWrapper}>
            <StyleSpinner
              isVisible={true}
              size={30}
              type={'Circle'}
              color={'#000000'}
            />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    backgroundColor: '#ffffff',
    height: 70,
    width: 70,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
export default LoadingOverlay;
