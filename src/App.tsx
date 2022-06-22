import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, useHistory } from 'react-router-dom';

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
import { useDispatch, useSelector } from 'react-redux'

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
import { refreshToken } from './redux/auth/reducer';
import { getAuth } from 'firebase/auth'
setupIonicReact();


const AppRender: React.FC = () => {
  const dispatch = useDispatch()

  getAuth().onAuthStateChanged(async (user) => {
    await user?.getIdToken(true).then((idToken)=>{
      return idToken
    })
    await dispatch(refreshToken({ user: user }))
  });

  useSelector((state: any)=>console.log(state.auth))
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
