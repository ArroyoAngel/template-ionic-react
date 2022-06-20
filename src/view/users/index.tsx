import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { RouteComponentProps } from "react-router";

import Login from './Login'

const Users: React.FC<RouteComponentProps> = (props) => {
  const { match } = props
  return (
    <IonReactRouter>
      <IonRouterOutlet id="main">
        {/* USERS */}
        <Route path={`${match.path}/login`} render={ props => <Login {...props}/>} />

        <Route path={`${match.path}/`} exact>{ <Redirect to={`${match.path}/login`}/> }</Route>
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

export default Users