import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { RouteComponentProps } from "react-router";

import Menu from './../../components/Menu';
import Users from './Users'
import MainMenu from './Menu'

const App: React.FC<RouteComponentProps> = (props) => {
  const { match } = props
  return (
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          {/* APP */}
          <Route path={`${match.path}/users`} render={ props => <Users {...props}/>} />
          <Route path={`${match.path}/menu`} render={ props => <MainMenu {...props}/>} />

          <Route path={`${match.path}/`} exact>{ <Redirect to={`${match.path}/users`}/> }</Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  )
}

export default App