import { IonContent } from "@ionic/react";
import React from "react";
import { RouteComponentProps } from "react-router";

interface P {}
type Props = P & RouteComponentProps
export const Error: React.FC<Props> = (props: Props) => {
  return <IonContent>
    <h1>ERROR</h1>
  </IonContent>
}

export default Error;