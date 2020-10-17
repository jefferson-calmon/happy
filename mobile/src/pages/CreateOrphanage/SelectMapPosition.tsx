import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import * as Location from 'expo-location';


import mapMarkerImg from '../../images/map-marker.png';

const SelectMapPosition = () => {
  const navigation = useNavigation();
  
  const [ position, setPosition ] = useState({
    latitude: 0,
    longitude: 0,
  });
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


  function handleNextStep() {
    navigation.navigate('OrphanageData', { position });
  }

  function handleSelectMapPosition(event: MapEvent){
    const positions = event.nativeEvent.coordinate;

    setPosition(positions);
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
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        
        {
          position.latitude != 0 && (
            <Marker 
              icon={mapMarkerImg}
              coordinate={position}
            />
          )
        }

      </MapView>

      {
        position.latitude != 0 && (
          <RectButton style={styles.nextButton} onPress={handleNextStep}>
            <Text style={styles.nextButtonText}>Próximo</Text>
          </RectButton>
        )
      }

    </View>
  )
}

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
  },

  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },

  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})

export default SelectMapPosition;