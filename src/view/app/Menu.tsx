import React from "react";
import { RouteComponentProps } from "react-router";
import { IonContent } from "@ionic/react";

interface P {}
type Props = P & RouteComponentProps
export const Menu: React.FC<Props> = (props: Props) => {
  return <IonContent>
    Menu
  </IonContent>
}

export default Menu;