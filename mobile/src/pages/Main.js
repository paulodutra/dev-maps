import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';



/**
 * requestPermissionsAsync: Pede a permissão para utilizar a localização do usuário
 * getCurrentPositionAsync: Obtem a localização do usuário, caso o usuário de permissão 
 * a função ira retornar um objeto com a propriedade granted true.
 * OBS: temos outras informações tais como, experies (quando expira a permissão), 
 * android(se o dispositivo e android), ios(se o dispositivo e ios), canAskAgain(perguntar novamente)
 * enableHighAccuracy: obtem a localização atualizada só ira funcionar se o serviço de GPS estiver habilitado
 * latitudeDelta e longitudeDelta: calculos navais para obter o zoom dentro do mapa
 * 
 * Marker: Marcação dentro do mapa
 * Callout: Abre algo ao clicar em um ponto do mapa
 * 
 * { navigation }: faz o destructing nas propriedades (props) e obtem os dados de navegação
 * 
 * autoCapitalize: Primeira letra de cada palavra como caixa alta
 * autoCorrect: Habilita ou desabilita a autocorreção
 */
function Main({ navigation }) {

    //estado
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');

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

    async function loadDevs() {
        // obtem a latitude e longitude do usuario
       const { latitude, longitude } = currentRegion;

       const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
       });

       console.log(response.data)

       //atualiza o estado
       setDevs(response.data.devs);


    }

    //recebe os dados de alteração de localização e seta no estado
    function handleRegionChanges(region) {
      setCurrentRegion(region)  
    }

    //Não ira renderizar o mapa
    if(!currentRegion){
        return null;
    }

    return (
        <>
            <MapView onRegionChangeComplete={handleRegionChanges} 
                initialRegion={currentRegion} 
                style={styles.map}
            >
               {devs.map(dev => (
                    <Marker 
                        key={dev._id}
                        coordinate={{ 
                            longitude: dev.location.coordinates[0],
                            latitude: dev.location.coordinates[1]
                        }}
                    >
                        <Image 
                            style={styles.avatar} 
                            source={{ uri: dev.avatar_url }} 
                        />
                    
                        <Callout onPress={() => {
                            //navegação: O primeiro parametro é o nome da Tela/Rota o segundo são dados que podem ser enviados
                            navigation.navigate('Profile', { githubUsername: dev.github_username });
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker> 
               ))}

            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder='Buscar devs por techs'
                    placeholderTextColor='#999'
                    autoCapitalize='words'
                    autoCorrect={false}
                    value={techs}
                    onChangeText={ text => setTechs(text)}
                />

                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={20} color='#FFF'/>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }, 

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    }, 

    callout: {
        width: 260,
    },

    devName: {
        fontWeight: 'bold', 
        fontSize: 16,
    },

    devBio: {
        color: '#666', 
        marginTop: 5,
    }, 

    devTechs: {
        marginTop: 5,
    }, 

    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5, 
        flexDirection: 'row',
    }, 

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        }, 
        elevation: 2


    }, 

    loadButton: {
       width: 50,
       height: 50, 
       backgroundColor: '#8E4Dff', 
       borderRadius: 25, 
       justifyContent: 'center',
       alignItems: 'center', 
       marginLeft: 15
    }
});

export default Main;