import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
import React from 'react'

import Menu from './../../components/Menu';
const Users = React.lazy(() =>
  import('./Users')
);
const MainMenu = React.lazy(() =>
  import('./Menu')
);

const App: React.FC<RouteComponentProps> = (props) => {
  const { match } = props
  return (
    <IonSplitPane contentId="main">
      <Menu />
      <IonRouterOutlet id="main">
        {/* APP */}
        <Route path={`${match.path}/users`} render={ props => <Users {...props}/>} />
        <Route path={`${match.path}/menu`} render={ props => <MainMenu {...props}/>} />

        <Route path={`${match.path}/`} exact>{ <Redirect to={`${match.path}/users`}/> }</Route>
      </IonRouterOutlet>
    </IonSplitPane>
  )
}

export default App