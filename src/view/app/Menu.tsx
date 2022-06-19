import React from "react";
import { RouteComponentProps } from "react-router";
import { IonButton, IonContent } from "@ionic/react";
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/auth/reducer'

interface P {}
type Props = P & RouteComponentProps
export const Menu: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch()
  const login = (email: string = "luis@gmail.com", password: string = "luis123") => {
    const { history } = props
    dispatch(loginUser({email, password, history }))
  }
  return <IonContent>
    <IonButton onClick={()=>login()} >
      LOGIN
    </IonButton>
  </IonContent>
}

export default Menu;