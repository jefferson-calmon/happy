import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import CreateOrphanage from './pages/CreateOrphanage';
import Orphanage from './pages/Orphanage';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' component={Landing}  exact/>
                <Route path='/app' component={OrphanagesMap} />
                <Route path='/orphanages/create' component={CreateOrphanage} />
                <Route path='/orphanages/:id' component={Orphanage} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;