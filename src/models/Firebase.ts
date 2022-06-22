import { FirebaseApp, initializeApp } from 'firebase/app';
import { 
  getFirestore, setDoc, collection, doc, getDocs, addDoc, 
  query, where, WhereFilterOp, Query, DocumentData, FieldPath, Firestore 
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, FirebaseStorage } from "firebase/storage";
import { 
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithCustomToken,
  sendPasswordResetEmail, confirmPasswordReset, signInWithPopup, GoogleAuthProvider, UserCredential, browserLocalPersistence, setPersistence, User, Auth 
} from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDG8aCWAc50iPPe_CY5xhZzUKlp3AMzYu4",
  authDomain: "delivery-sagas.firebaseapp.com",
  projectId: "delivery-sagas",
  storageBucket: "delivery-sagas.appspot.com",
  messagingSenderId: "215954761083",
  appId: "1:215954761083:web:266ff0d4c394d7f84689de",
  measurementId: "G-SCTKDXZZZL"
};

export class Firebase {
  private app: FirebaseApp;
  private auth: Auth;
  private currentUser: User | null;
  private db: Firestore
  private storage: FirebaseStorage
  private provider: {
    google: GoogleAuthProvider
  }
  constructor(){
    this.app = initializeApp(firebaseConfig)
    this.auth = getAuth()
    this.currentUser = null
    this.auth.onAuthStateChanged(async (user) => {
      this.currentUser = user
      await user?.getIdToken(true).then((idToken)=>{
        return idToken
      })
      const test: any = user
      localStorage.setItem('session', JSON.stringify(test.stsTokenManager))
    });
    this.db = getFirestore(this.app)
    this.storage = getStorage();
    this.provider = {
      google: new GoogleAuthProvider()
    }
  }
  
  async signUpGoogle(): Promise<UserCredential>{
    const account = await signInWithPopup(this.auth, this.provider.google)
    return account
  }

  async loginEmailPassword(_email: string, _password: string): Promise<UserCredential> {
    const account: UserCredential = await setPersistence(this.auth, browserLocalPersistence).then(() => {
      return signInWithEmailAndPassword(this.auth, _email, _password)
    })
    this.currentUser = account.user
    return account
  }

  async registerEmailPassword(_email: string, _password: string): Promise<UserCredential> {
    const account = await createUserWithEmailAndPassword(this.auth, _email, _password)
    return account
  }

  async uploadFile(_url: string, _file: File): Promise<string> {
    const refFile = await ref(this.storage, `${_url}/${_file.name}`)
    await uploadBytes(refFile, _file)
    const URL = await getDownloadURL(refFile).then(urlFile=>urlFile)
    return URL
  }

  async getDocuments(_collection: string, _query?: [string|FieldPath, WhereFilterOp, unknown]): Promise<Query<DocumentData>> {
    if(_query)
      return await query(collection(this.db, _collection), where(_query[0], _query[1], _query[2]))
    else
      return await query(collection(this.db, _collection))
  }

  async setDocument(_collection: string, _document: Object, _uid?: string){
    if(_uid){
      await setDoc(doc(this.db, _collection, _uid), { ..._document }, { merge: true })
    }
    else{
      await addDoc(collection(this.db, _collection), _document).then( e => {
        setDoc(doc(this.db, _collection, e.id), { id: e.id }, { merge: true })
      })
    }
  }

  public async getData(query: Query<DocumentData>): Promise<any> {
    const docs = await getDocs(query)
    let result: Array<DocumentData> = []
    await docs.forEach((doc) => {
      result.push(doc.data())
    })
    return result
  }
}

export default new Firebase()