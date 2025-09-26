import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBvt8XwJNfJ6GjVGQl5Y4fPsg4dke6N5HY",
  authDomain: "to-be-deleted-e84ef.firebaseapp.com",
  projectId: "to-be-deleted-e84ef",
  storageBucket: "to-be-deleted-e84ef.firebasestorage.app",
  messagingSenderId: "486433416589",
  appId: "1:486433416589:web:da8f366b9492259c3689c4",
  measurementId: "G-NZQH1FTSYX",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}