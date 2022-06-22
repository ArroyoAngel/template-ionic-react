import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export class Account {
  public id: string;
  public email: string;
  public created: string|Date;
  public available: boolean;
  public credential: User;
  constructor(_id: string, _email: string, _created: Timestamp, _available: boolean, _credential: User ){
    this.id = _id;
    this.email = _email;
    this.created = new Date(_created.seconds*1000);
    this.available = _available;
    this.credential = _credential;
  }
  protected signInPersistence(stsTokenManager: any){
    const { accessToken, expirationTime, refreshToken } = stsTokenManager
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('expirationTime', expirationTime)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('email', this.email)
    localStorage.setItem('id', this.id)
  }
}