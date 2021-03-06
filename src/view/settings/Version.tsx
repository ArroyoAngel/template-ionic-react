import React from "react";
import { RouteComponentProps } from "react-router";
import { IonContent } from "@ionic/react";

interface P {}
type Props = P & RouteComponentProps
export const Version: React.FC<Props> = (props: Props) => {
  return <IonContent>
    <h1>Version</h1>
  </IonContent>
}

export default Version;