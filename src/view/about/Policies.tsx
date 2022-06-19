import React from "react";
import { RouteComponentProps } from "react-router";
import { IonContent } from "@ionic/react";

interface P {}
type Props = P & RouteComponentProps
export const Policies: React.FC<Props> = (props: Props) => {
  return <IonContent>
    <h1>POLICIES</h1>
  </IonContent>
}

export default Policies;