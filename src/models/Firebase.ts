import { initializeApp } from 'firebase/app';
import { 
  getFirestore, setDoc, collection, doc, getDocs, addDoc, 
  query, where, WhereFilterOp, Query, DocumentData 
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { 
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  sendPasswordResetEmail, confirmPasswordReset, signInWithPopup, GoogleAuthProvider, UserCredential, browserLocalPersistence, setPersistence 
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

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore(app)
export const storage = getStorage();
export const provider = {
  google: new GoogleAuthProvider()
}

export async function signUpGoogle(): Promise<UserCredential>{
  const account = await signInWithPopup(auth, provider.google)
  return account
}

export async function loginEmailPassword(_email: string, _password: string): Promise<UserCredential> {
  const account = await setPersistence(auth, browserLocalPersistence).then(() => {
    return signInWithEmailAndPassword(auth, _email, _password)
  })

  await getAuth().onAuthStateChanged( user => {
    console.log("CURRENT LOGIN: ", user)
  })
  return account
}

export async function registerEmailPassword(_email: string, _password: string): Promise<UserCredential> {
  const account = await createUserWithEmailAndPassword(auth, _email, _password)
  return account
}

export async function uploadFile(_url: string, _file: File): Promise<string> {
  const refFile = await ref(storage, `${_url}/${_file.name}`)
  await uploadBytes(refFile, _file)
  const URL = await getDownloadURL(refFile).then(urlFile=>urlFile)
  return URL
}

export async function getDocuments(_collection: string, _query?: [string, WhereFilterOp, string]): Promise<Query<DocumentData>> {
  if(_query)
    return await query(collection(db, _collection), where(_query[0], _query[1], _query[2]))
  else
    return await query(collection(db, _collection))
}

export async function setDocument(_collection: string, _document: Object, _uid?: string){
  if(_uid){
    await setDoc(doc(db, _collection, _uid), { ..._document }, { merge: true })
  }
  else{
    await addDoc(collection(db, _collection), _document).then( e => {
      setDoc(doc(db, _collection, e.id), { id: e.id }, { merge: true })
    })
  }
}

export async function getData(query: Query<DocumentData>): Promise<any> {
  const docs = await getDocs(query)
  let result: Array<DocumentData> = []
  await docs.forEach((doc) => {
    result.push(doc.data())
  })
  return result
}