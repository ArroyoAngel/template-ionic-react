import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { bookmarkOutline } from 'ionicons/icons';
import './Menu.css';

import { appPages, RoutePage } from '../models/Routes'
import { Fragment } from 'react';

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

//import { Location } from 'history'
interface PathProps { pages: Array<RoutePage>, pathname: string, parent: string }
const PathItems: React.FC<PathProps> = ({ pages, pathname, parent }) => {
  return <Fragment>{
    pages.map(( appPage, index) => {
      const fullPath = parent+appPage.url
      const isSelected = pathname.split(fullPath)[0]===''
      const state = pathname.includes(fullPath)&&isSelected  ? 'selected' : ''

      return (
        <IonMenuToggle key={index} autoHide={false} className={parent?'path-childrens':''}>
          <IonItem className={state} routerLink={fullPath} routerDirection="none" lines="none" detail={false}>
            <IonIcon slot='start' icon={appPage.icon} />
            <IonLabel>{appPage.title}</IonLabel>
          </IonItem>
          { appPage.childrens && state==='selected' && <PathItems pages={appPage.childrens} pathname={pathname} parent={parent+appPage.url} /> }
        </IonMenuToggle>
      )
    })
  }<hr/></Fragment>
}

const Menu: React.FC = () => {
  const location = useLocation();
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Inbox</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          <PathItems pathname={location.pathname} pages={appPages} parent={''}/>
        </IonList>

        <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
