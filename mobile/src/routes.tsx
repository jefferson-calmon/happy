import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Screen, Navigator } = createStackNavigator();

import Header from './components/Header';
import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetail from './pages/OrphanageDetail';

import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';

const Routes = () => (
    <NavigationContainer>
        <Navigator 
            screenOptions={{ 
                headerShown: false, 
                cardStyle: { backgroundColor: '#f2f3f5', },
            }}
        >

            <Screen 
                name="OrphanagesMap" 
                component={OrphanagesMap}
            />
            <Screen 
                name="OrphanageDetail" 
                component={OrphanageDetail}
                options={{
                    headerShown: true,
                    header: () => <Header showCancel={false} title="Orfanato" />,
                }}
            />

            <Screen 
                name="SelectMapPosition" 
                component={SelectMapPosition}
                options={{
                    headerShown: true,
                    header: () => <Header title="Selecione no mapa" />,
                }}
            />
            <Screen 
                name="OrphanageData" 
                component={OrphanageData}
                options={{
                    headerShown: true,
                    header: () => <Header title="Informe os dados" />,
                }}
            />
        </Navigator>
    </NavigationContainer>
);

export default Routes;
