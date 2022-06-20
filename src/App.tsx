import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import React from 'react'

/* ABOUT */
import Policies from './view/about/Policies'
/* APP */
import App from './view/app'
/* SETTINGS */
import Version from './view/settings/Version'
/* USERS */
import Login from './view/users/Login'
/* ERROR */
import Error from './view/error'

setupIonicReact();

const AppRender: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          {/* ABOUT */}
          <Route exact={true} path='/about'>{ <Redirect to='/about/policies'/> }</Route>
            <Route exact={true} path='/about/policies' render={ props => <Policies {...props}/>} />

          {/* APP */}
          <Route
            path={'/app'}
            render={ props => <App {...props} /> }
          />

          {/* SETTINGS */}
          <Route exact={true} path='/settings'>{ <Redirect to='/settings/version'/> }</Route>
            <Route exact={true} path='/settings/version' render={ props => <Version {...props}/>} />
          
          {/* USERS */}
          <Route exact={true} path='/users'>{ <Redirect to='/users/login'/> }</Route>
            <Route exact={true} path='/users/login' render={ props => <Login {...props}/>} />

          {/* ERROR */}
          <Route exact={true} path='/error' render={ props => <Error {...props}/>} />

          {/* 404 */}
          <Route component={Error}/>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppRender;
