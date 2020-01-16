import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

/**
 * requestPermissionsAsync: Pede a permissão para utilizar a localização do usuário
 * getCurrentPositionAsync: Obtem a localização do usuário, caso o usuário de permissão 
 * a função ira retornar um objeto com a propriedade granted true.
 * OBS: temos outras informações tais como, experies (quando expira a permissão), 
 * android(se o dispositivo e android), ios(se o dispositivo e ios), canAskAgain(perguntar novamente)
 * enableHighAccuracy: obtem a localização atualizada só ira funcionar se o serviço de GPS estiver habilitado
 * latitudeDelta e longitudeDelta: calculos navais para obter o zoom dentro do mapa
 */
function Main() {

    //estado

    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            //manda a requisição de permissão 
            const { granted, } = await requestPermissionsAsync();
            //se o usuário permitir 
            if(granted) {
                //obtem as coordernadas
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });

                const { latitude, longitude } = coords; 
                //seta as coordenadas de latitude, longitude e zoom no estado da aplicação
                setCurrentRegion({
                    latitude, 
                    longitude, 
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }
        }
        //carrega a localização inicial
        loadInitialPosition();
    });

    //Não ira renderizar o mapa
    if(!currentRegion){
        return null;
    }

    return <MapView initialRegion={currentRegion} style={styles.map} />
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});

export default Main;