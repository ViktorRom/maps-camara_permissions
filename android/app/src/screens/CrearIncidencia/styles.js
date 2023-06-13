import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optIncidencia: {
    flexDirection: 'row',
    height: '7%',
    justifyContent: 'space-between',
    backgroundColor: '#3C7A89',
    width: '100%',
    marginBottom: 6,
  },
  botonLevantaIncidencia: {},
  textMenuPrincipal: {
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#000',
  },
  mapView: {
    height: '100%',
    width: '100%',
  },
  containerM: {
    flex: 1,
  },
  containerModal: {
    backgroundColor: '#fff',
    height: '100%',
  },
  botonesModal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  titleModal: {
    marginTop: 25,
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 25,
    color: '#000',
    fontWeight: 'bold',
  },
  textNormal: {
    fontSize: 15,
    color: '#000',
    textAlign: 'left',
    marginVertical: 10,
    marginLeft: 7,
    fontWeight: '700',
  },
  dropdown: {
    backgroundColor: '#212121',
    fontSize: 30,
  },
  gpoFotos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  tipoIncidenciaSelect: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textArea: {
    padding: 10,
    borderWidth: 1,
    width: '90%',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  containerKeyboardAvoidingView: {
    flex: 1,
  },
});
