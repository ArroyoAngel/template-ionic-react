import React from "react";
import { RouteComponentProps } from "react-router";
import { IonContent } from "@ionic/react";

interface P {}
type Props = P & RouteComponentProps
export const List: React.FC<Props> = (props: Props) => {
  return <IonContent>
    <h1>List</h1>
  </IonContent>
}

export default List;