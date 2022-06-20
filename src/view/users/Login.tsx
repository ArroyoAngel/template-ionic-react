import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { IonButton, IonContent, IonInput } from "@ionic/react";
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/auth/reducer'

interface P {}
type Props = P & RouteComponentProps
export const Login: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const login = () => {
    const { history } = props
    dispatch(loginUser({email, password, history }))
  }
  return <IonContent>
    <IonInput type="email" placeholder="correo" onIonChange={(e: any)=>setEmail(e.detail.value)} />
    <IonInput type="text" placeholder="contraseña" onIonChange={(e: any)=>setPassword(e.detail.value)} />
    <IonButton onClick={()=>login()} >
      LOGIN
    </IonButton>
  </IonContent>
}

export default Login;