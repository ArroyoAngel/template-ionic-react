import { IonButton, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { RouteComponentProps } from "react-router";

import List from './List'

const App: React.FC<RouteComponentProps> = (props) => {
  const { match } = props
  return (
    <IonRouterOutlet >
      {/* APP */}
      <Route path={`${match.path}/list`} render={ props => <List {...props}/>} />

      <Route path={`${match.path}`} exact>{ <Redirect to={`${match.path}/list`}/> }</Route>
    </IonRouterOutlet>
  )
}

export default App