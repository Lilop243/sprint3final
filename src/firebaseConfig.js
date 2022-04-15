import { useEffect, useState } from "react";
import { initializeApp } from 'firebase/app';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import Swal from "sweetalert2";



const firebaseConfig = {
  apiKey: "AIzaSyBLjgdUA8Ff53xJdzMIm6x37AX6lznWOc8",
  authDomain: "sprint3-876cc.firebaseapp.com",
  projectId: "sprint3-876cc",
  storageBucket: "sprint3-876cc.appspot.com",
  messagingSenderId: "79604513017",
  appId: "1:79604513017:web:645f5d21754e860e1a8a28"
};

const app = initializeApp(firebaseConfig);
const google = new GoogleAuthProvider();
const facebook = new FacebookAuthProvider()
const db = getFirestore();
const auth = getAuth();


export {
  app,
  google,
  facebook,
  db,
  auth
}

export function register(email, password, username) {
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, email, password)
    .then(async ({ user }) => {
      await updateProfile(auth.currentUser, { displayName: username })
      console.log(user);
    })
    .catch(e =>
      Swal.fire('El correo ya está registrado')
    )
}




export function login(email, password) {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      Swal.fire('Bienvenido')
    })
    .catch(e => Swal.fire('Revise sus campos'))
}

export function CerrarSesion() {
  return signOut(auth)
}


export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

