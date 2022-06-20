import React from "react";
import { RouteComponentProps } from "react-router";
import { IonContent } from "@ionic/react";

import Map from '../../components/MapBox'

interface P {}
type Props = P & RouteComponentProps
export const Menu: React.FC<Props> = (props: Props) => {
  return <IonContent>
    <Map/>
  </IonContent>
}

export default Menu;