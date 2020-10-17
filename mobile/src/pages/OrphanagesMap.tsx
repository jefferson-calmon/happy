import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

import mapMarker from '../images/map-marker.png';
import styles from '../styles/orphanages-map';
import api from '../services/api';

interface OrphanageProps {
  id: number,
  name: string,
  latitude: number,
  longitude: number
}

const OrphanageMap = () => {
    const navigation = useNavigation();
    
    const [ orphanages, setOrphanages ] = useState<OrphanageProps[]>([]);
    const [ location, setLocation ] = useState<Location.LocationObject>();

    
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, [location])

    useFocusEffect(useCallback(() => {
      api.get('orphanages').then(response => setOrphanages(response.data));
      console.log('ok')
    }, []))

    function handleNavigateToOrphanageDetail(id: number){
      navigation.navigate('OrphanageDetail', { id });
    }

    function handleNavigateToCreateOrphanage(){
      navigation.navigate('SelectMapPosition');
    }

    
    if (!location){
      return (
        <View style={[styles.containerLoading, styles.horizontal]}>
          <ActivityIndicator size="large" color="#15b6b6" />
        </View>
      );;
    }

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude:  location.coords.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
        >
  
          {
            orphanages.map( orphanage => (
              <Marker 
                key={orphanage.id}
                icon={mapMarker}
                coordinate={{
                  latitude: orphanage.latitude,
                  longitude: orphanage.longitude,
                }}
                calloutAnchor={{
                  x: 2.8,
                  y: 0.85,
                }}
              >
                <Callout 
                  tooltip 
                  onPress={() => handleNavigateToOrphanageDetail(orphanage.id)} 
                >
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>
                      {orphanage.name}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            ))
          }
  
        </MapView>
  
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {orphanages.length} orfanatos encontrados
          </Text >
  
          <RectButton 
            style={styles.createOrphanageButton} 
            onPress={handleNavigateToCreateOrphanage}
          >
            <Feather name="plus" size={20} color="#fff" /> 
          </RectButton>
        </View>
      </View>
    );
}

export default OrphanageMap;