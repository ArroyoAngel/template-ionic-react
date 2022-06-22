import { User, UserInfo, UserMetadata } from "firebase/auth";
import { accounts } from './Firestore'


export class Account {
  public providerData: UserInfo;
  public metadata: UserMetadata;
  public session: Object;
  public data: accounts;
  constructor(_providerData: UserInfo, _metadata: UserMetadata, _session: Object, _data: accounts ){
    this.providerData = _providerData;
    this.metadata = _metadata;
    this.session = _session;
    this.data = _data;
  }
  protected signInPersistence(){
    localStorage.setItem('session', JSON.stringify(this.session))
    localStorage.setItem('user_data', JSON.stringify(this.data))
  }
}