import { IonButton, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
import React from 'react'

const List = React.lazy(() =>
  import('./List')
);

const App: React.FC<RouteComponentProps> = (props) => {
  const { match } = props
  console.log(match.path)
  return (
    <IonRouterOutlet >
      {/* APP */}
      <Route path={`${match.path}/list`} render={ (props) => <List {...props}/>} />

      <Route path={`${match.path}`} exact>{ <Redirect to={`${match.path}/list`}/> }</Route>
    </IonRouterOutlet>
  )
}

export default App