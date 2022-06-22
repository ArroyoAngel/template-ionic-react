import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { RouteComponentProps } from "react-router";

import Policies from './Policies'

const About: React.FC<RouteComponentProps> = (props) => {
  const { match } = props
  return (
    <IonReactRouter>
      <IonRouterOutlet id="main">
        {/* ABOUT */}
        <Route path={`${match.path}/policies`} render={ props => <Policies {...props}/>} />

        <Route path={`${match.path}/`} exact>{ <Redirect to={`${match.path}/policies`}/> }</Route>
      </IonRouterOutlet>
    </IonReactRouter>
  )
}

export default About