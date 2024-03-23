# 1: To signup and create fibebase database

1 To use fibebase database we have need to create account on firebase to use firebaseDatabase as a service.

2 npm install firebase

3 copy the keys in firebase.ts file

import { initializeApp } from "firebase/app";

const firebaseConfig = {
apiKey: process.env.APIKEY,
authDomain: process.env.AUTHDOMAIN,
projectId: process.env.PROJECTID,
storageBucket: process.env.STORAGEBUCKET,
messagingSenderId: process.env.MESSAGINGSENDERID,
appId: process.env.APPID,
};

const app = initializeApp(firebaseConfig);
