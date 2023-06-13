import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {styles} from './styles'
import {imgIncidencia} from '../../../../../assets/images'

const  IncidenciaItem =({item, onSelected}) =>{
    return(
        <View style={styles.container}>
            <TouchableOpacity 
                style={{...styles.containerTouchable,}}
                onPress={()=> onSelected(item)}
            >
                <View style={styles.photo}>
                    <Image
                        style={styles.tinyLogo}
                        source={{uri: 'https://previews.123rf.com/images/alvinge/alvinge1111/alvinge111100084/11553710-una-tuber%C3%ADa-rota-que-las-fugas-de-agua-en-todas-direcciones.jpg'}}
                    />
                </View>
                <View style={styles.datos}>
                    <Text style={styles.title}>Datos de incidencia</Text>
                    <Text style={styles.dato}>Número de incidencia: {item.id}</Text>
                    <Text style={styles.dato}>Estatus: {item.estatus === 1? 'Pendiente': 'Lista'}</Text>
                    <Text style={styles.dato}>Fecha creación:{item.fecha_creacion}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default IncidenciaItem;