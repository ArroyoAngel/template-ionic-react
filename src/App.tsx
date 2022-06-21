import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

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

import React, { Suspense } from 'react'

/* ABOUT */
import About from './view/about'
/* APP */
import App from './view/app'
/* SETTINGS */
import Settings from './view/settings'
/* USERS */
import Users from './view/users'
/* ERROR */
import Error from './view/error'


/* ABOUT */
import Policies from './view/about/Policies'
/* SETTINGS */
import Version from './view/settings/Version'
/* USERS */
import Login from './view/users/Login'

setupIonicReact();

const AppRender: React.FC = () => {
  return (
    <IonApp>
      <Suspense fallback={<div className='loading'/>}>
        <IonReactRouter>
          <IonRouterOutlet id="main">

            {/* DEFAULT */}
            <Redirect exact from={'/'} to={'/users'} />

            {/* ABOUT */}
            <Route
              path={'/about'}
              render={ props => <About {...props} /> }
              />

            {/* APP */}
            <Route
              path={'/app'}
              render={ props => <App {...props} /> }
              />

            {/* SETTINGS */}
            <Route
              path={'/settings'}
              render={ props => <Settings {...props} /> }
              />
            
            {/* USERS */}
            <Route
              path={'/users'}
              render={ props => <Users {...props} /> }
              />

            {/* ERROR */}
            <Route exact={true} path='/error' render={ props => <Error {...props}/>} />

            {/* 404 */}
            <Route component={Error}/>

          </IonRouterOutlet>
        </IonReactRouter>
      </Suspense>
    </IonApp>
  );
};

export default AppRender;
