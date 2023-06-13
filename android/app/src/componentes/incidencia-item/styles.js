import {StyleSheet} from 'react-native';
import {COLOR} from '../../constants/index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 140,
    backgroundColor: COLOR.item,
    margin: 10,
    borderRadius: 10,
  },
  containerTouchable: {
    flex: 1,
    flexDirection: 'row',
    border: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  photo: {
    margin: 20,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  datos: {
    marginVertical: 22,
  },
  title: {
    marginVertical: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLOR.text,
  },
  dato: {
    color: COLOR.text,
  },
});
