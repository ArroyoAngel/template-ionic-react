import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { RouteComponentProps } from "react-router";


import React from 'react'
const Login = React.lazy(() =>
  import('./Login')
);


const Users: React.FC<RouteComponentProps> = (props) => {
  const { match } = props
  return (
    <IonRouterOutlet id="main">
      {/* USERS */}
      <Route path={`${match.path}/login`} render={ props => <Login {...props}/>} />

      <Route path={`${match.path}/`} exact>{ <Redirect to={`${match.path}/login`}/> }</Route>
    </IonRouterOutlet>
  )
}

export default Users