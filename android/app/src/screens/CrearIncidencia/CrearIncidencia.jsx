import React, { useEffect, useState } from "react";
import { View, 
        PermissionsAndroid, 
        Button, 
        Alert, 
        Modal, 
        Text, 
        TextInput, 
        Image, 
        KeyboardAvoidingView, 
        TouchableWithoutFeedback, 
        Keyboard,
        Pressable,
        ScrollView} from "react-native";
import MapView, { Marker } from 'react-native-maps';
//import Geolocation from 'react-native-geolocation-service';
import Geolocation from "@react-native-community/geolocation";
import Dropdown from 'react-native-select-dropdown';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles'


export const CrearIncidencia=()=>{
  // const {width, height} = Dimensions.get('screen');  19.42847, -99.12766
  const tamanioMin = 'http://via.placeholder.com/100';


  const [region, setRegion] = useState({
    latitude : 19.42847,
    longitude:-99.12766,
    longitudeDelta: 0.0922,
    latitudeDelta: 0.0922
  })
  const [markerPosicion, setMarkerPosicion] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [optIncidencia, setOptIncidencia] = useState("");
  const [fotoSubida, setFotoSubida ] = useState(false);

  const optionesReporte = ["Toma clandestina", "Fuga hidraulica"]
  

  const [image, setImage] = useState("");

  useEffect(()=>{
    obtenerMiUbicacion
  },[])

  function obtenerMiUbicacion(){
    Geolocation.getCurrentPosition(info=>{
      console.log("LAT", info.coords.latitude)
      console.log("LAT", info.coords.longitude)
      console.warn("Las coordenadas seleccionadas son :"+ info.coords.latitude+ "y" + info.coords.longitude);
      setRegion({
        latitude : info.coords.latitude,
        longitude:info.coords.longitude
      })
      setMarkerPosicion({
        latitude : info.coords.latitude,
        longitude:info.coords.longitude,
      })
    }),
    ()=>{
      console.log("Hubo, algun problema"),{
      enableHighAccuracy:true,
      timeout:2000,} }
  }

  function nuevoMarker(e){
    console.log('***************',e.nativeEvent.coordinate.latitude)
    console.log('***************',e.nativeEvent.coordinate.longitude)
 
    setMarkerPosicion({
      latitude : e.nativeEvent.coordinate.latitude,
      longitude:e.nativeEvent.coordinate.longitude,
    })
  }

  const  levantarIncidencia=()=>{
    if(markerPosicion===null){
        Alert.alert("Debes marcar una posición")
    }else{
        setMostrarModal(true);
    }
  }

  const selectImage = () => {
    const options = {
      title: 'Selecciona imagen',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.errorCode) {
        console.log(response.errorCode);
      } else if (response.didCancel) {
        console.log('El usuario cancelo la seleccion');
      } else {
        const path = response.assets[0].uri;
        setImage(path);
      }
    });
  };

  const takePicture = async() => {
    const options = {
      title: 'Selecciona imagen',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: true,
    };
    try{
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(options, response => {
          if (response.errorCode) {
            console.log(response.errorMessage);
          } else if (response.didCancel) {
            console.log('El usuario canceló la fotografia');
          } else {
            const uri = response.assets[0].uri;
            console.log(response.assets[0].uri);
             setImage(uri);
          }
        });
      } else {
        console.log("Camera permission denied");
        // Alert.alert("No has")
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onHandleEnvio = () =>{
    console.log('Enviando datos');
    Alert.alert("Gracias por tu reporte")
    setMostrarModal(!mostrarModal)
  }

  const onHandleCancel = () =>{
    console.log('Cancelando datos');
    setFotoSubida(false);
    setImage('');
    setOptIncidencia('');
    setMostrarModal(!mostrarModal);
    setMarkerPosicion(null);
  }



  return(
        <View style={styles.container}  >  
          <View style={{position:'relative', height: '100%', width: '100%'}}>
          <MapView 
             onMapReady={()=>{ 
                PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(()=>{
                    console.log("Usuario agree");
                  })
             }}
               style={styles.mapView}
               zoomEnabled={true}
               zoomControlEnabled={true}
                minZoomLevel={15}
               maxZoomLevel={22}
               showsUserLocation={true}
               loadingEnabled={true}
              onPress={(e)=> nuevoMarker(e)  }
              region={region}
              >
                {markerPosicion!==null && <Marker
                coordinate={markerPosicion}
                tite="El Estarbocks"
                description="Esto es el Estarbocks"
                />}
          </MapView>
            <View style={{position:'absolute', left: '30%', bottom:10, zIndex: 2, borderColor:'green'}}>
            <Button styles={styles.botonLevantaIncidencia} title="Levantar incidencia" onPress={levantarIncidencia}/>
            </View>
          </View>
              <Modal
                  animationType="slide"
                  transparent={true}
                  visible={mostrarModal}
                  onRequestClose={() => {setMostrarModal(!mostrarModal)}}>
            <KeyboardAvoidingView behavior="padding" style={styles.containerKeyboardAvoidingView}>
             <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>       
              <ScrollView style={styles.containerModal}>
                <View style={styles.containerModal}>
                      <Text style={styles.titleModal}>Levantamiento de incidencia</Text>
                      <Text style={styles.textNormal}>Llena el siguiente formulario para poder levantar un reporte</Text>
                
                <View style={styles.tipoIncidencia}>
                      <Text style={styles.textNormal}>Selecciona el tipo de incidencia *: </Text>
                      <View style={styles.tipoIncidenciaSelect}>
                        <Dropdown
                            label={"Item"}
                            searchInputTxtColor="Item"
                            buttonStyle={{backgroundColor:'#AFD3E2', borderWidth: 3, margin:10, width:'90%'}}
                            stybuttonStyle={styles.dropdown}
                            data={optionesReporte}
                            onSelect={(itemS,index) => {
                              console.log('index: ', index);
                              setOptIncidencia(index)
                            }}
                          />
                      </View>
                </View>
                <View style={styles.tomarFoto}>        
                  <Text style={styles.textNormal}>Toma o añade una fotografia:</Text>
                  <View style={styles.botonesModal}>
                  <Pressable
                    onPress={selectImage}
                    >
                    <MaterialIcon name="add-photo-alternate" color={'#000'} size={45} />
                   </Pressable>  
    
                  <Pressable
                    onPress={takePicture}
                    >
                    <MaterialIcon name="add-a-photo" color={'#000'} size={45} />
                   </Pressable>  
                  </View>
                  {image && <View style={styles.gpoFotos}>
                      <Image
                          style={{
                            alignSelf: 'center',
                            height: 100,
                            width: 100,
                            marginVertical: 10,
                          }}
                          source={{uri: image}}
                        />
                  </View>}      
                </View>
                <View style={styles.AgregarComentarios}>
                        <Text style={styles.textNormal} >Añade comentarios: </Text>
                        <TextInput
                           editable
                           multiline
                           numberOfLines={4}
                           maxLength={40}
                          //  onChangeText={text => onChangeText(text)}
                          //  value={value}
                           style={styles.textArea}
                           placeholder="Añadir comentarios.">
                        </TextInput>
                      <View style={styles.botonesModal}> 
                        <Button
                            title="Enviar"
                            color='#22806b'
                            onPress={onHandleEnvio} />    
                        <Button
                            title="Cancelar"
                            color='#e8373e'
                            onPress={onHandleCancel} />
                      </View>
                </View>      
              </View>
              </ScrollView>
              </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
              </Modal>

        </View>
    )
    }
