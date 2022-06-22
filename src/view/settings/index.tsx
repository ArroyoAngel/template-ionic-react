import { IonRouterOutlet } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
import React from 'react'

const Version = React.lazy(() =>
  import('./Version')
);

const Settings: React.FC<RouteComponentProps> = (props) => {
  const { match } = props
  return (
    <IonRouterOutlet id="main">
      {/* SETTINGS */}
      <Route path={`${match.path}/version`} render={ props => <Version {...props}/>} />

      <Route path={`${match.path}/`} exact>{ <Redirect to={`${match.path}/version`}/> }</Route>
    </IonRouterOutlet>
  )
}

export default Settings