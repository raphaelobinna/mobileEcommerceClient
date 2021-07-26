import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Dimensions } from 'react-native';
import { GRAY, WHITE } from '../constants/colors';
//import { HeaderRight } from '../header/HeaderRight';

export const PaperBoardLayout = ({navigation, children, style}) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: WHITE,
      },
      headerTintColor: GRAY,
      headerTitleStyle: {
        fontFamily:"Nunito_700Bold",
        fontSize: 17,
        color: GRAY,
      },
      // headerRight: () => ( <HeaderRight type={'dark'} navigation={navigation} /> ),
    });
  }, [navigation]);

  style = style ?? {};

  return (
    <View style={[styles.container, style.container]}>
      <View style={[styles.section, style.section]}>
        <View style={[styles.article, style.article]}>
          {children}
        </View>
      </View>
    </View>
  );
};

// PropTypes
PaperBoardLayout.propTypes = {
  navigation: PropTypes.object.isRequired, 
  style: PropTypes.object,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginLeft:'3%',
    marginRight:'3%',
    paddingTop:'3%',
  },
  section:{
    height: Dimensions.get('window').height / 1
  },
  article:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
  },
});