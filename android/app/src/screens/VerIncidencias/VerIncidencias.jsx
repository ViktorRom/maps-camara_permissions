import React from "react";
import {View, Text, FlatList} from "react-native"
import { IncidenciaItem } from "../../componentes";
import { INCIDENCIAS } from "../../constants/data/incidencias";
import {styles} from './styles'
import { Alert } from "@mui/material";

export const VerIncidencias=()=>{

    const onSelected = (item) => {
        console.warn('item', item);
    }
    const renderItem = ({item}) => <IncidenciaItem item={item} onSelected={onSelected}/>;
    const keyExtractor = (item) => item.id.toString();
    return(
    <View style={styles.container}>
        <Text style={styles.title}>Reporte de incidencias</Text>
        <FlatList
            data={INCIDENCIAS}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
        />
    </View>
)}