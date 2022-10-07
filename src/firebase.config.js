import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBTxLePHXwSVpoESmKcCXtEx9kdjt6bosM",
    authDomain: "delivery-hero-86f27.firebaseapp.com",
    databaseURL: "https://delivery-hero-86f27-default-rtdb.firebaseio.com",
    projectId: "delivery-hero-86f27",
    storageBucket: "delivery-hero-86f27.appspot.com",
    messagingSenderId: "784820896775",
    appId: "1:784820896775:web:19f42ccb84056e16fdd6a2"
};

//proper way to innizialize your firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app)
const storage = getStorage(app)

export { app, firestore, storage };