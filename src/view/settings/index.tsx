import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { RouteComponentProps } from "react-router";

import Version from './Version'

const Settings: React.FC<RouteComponentProps> = (props) => {
  const { match } = props
  return (
    <IonReactRouter>
      <IonRouterOutlet id="main">
        {/* SETTINGS */}
        <Route path={`${match.path}/version`} render={ props => <Version {...props}/>} />

        <Route path={`${match.path}/`} exact>{ <Redirect to={`${match.path}/version`}/> }</Route>
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

export default Settings