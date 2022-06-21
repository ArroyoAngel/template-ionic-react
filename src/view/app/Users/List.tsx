import React from "react";
import { RouteComponentProps } from "react-router";
import { IonButton, IonContent } from "@ionic/react";

interface P {}
type Props = P & RouteComponentProps
export const List: React.FC<Props> = (props: Props) => {
  return <IonContent>
    <h1>List</h1>
    <IonButton onClick={()=>props.history.push('/users/login')} >LOGIN</IonButton>
  </IonContent>
}

export default List;