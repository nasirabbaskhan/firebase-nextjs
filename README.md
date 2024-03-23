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

"use client";
import { db } from "@/firebase";
import {
addDoc,
collection,
deleteDoc,
doc,
getDocs,
updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

export default function TodoApp() {
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [student, setStudent] = useState<any[]>([]);
const [isLooading, setIsLoading] = useState(false);
const [id, setId] = useState("");

// Adding data into firebase Database
const addDocumentHandler = async () => {
try {
const docRef = await addDoc(collection(db, "users"), {
firstName: firstName,
lastName: lastName,
email: email,
});
console.log("Document written with ID: ", docRef.id);
fetchData();
} catch (e) {
console.error("Error adding document: ", e);
}
};
// Getting data from firebase firestore database
const fetchData = async () => {
try {
const collectionName = collection(db, "users");
// const queryReference = query(
// collection(db, "users"),
// where("email", "==", "abc@gmail.com")
// );
const doc = await getDocs(collectionName);
const studentData: any[] = [];
doc.forEach((item) => {
studentData.push({
id: item.id,
...item.data(),
});
});
setStudent(studentData);
console.log("student", student);
} catch (error) {
console.log("error", error);
}
};
useEffect(() => {
fetchData();
}, []);

// delete date from firebase database
const deleteHandler = async (id: any) => {
setId(id);
setIsLoading(true);
await deleteDoc(doc(db, "users", id));
fetchData();
};
// Update date from firebase database
const updateHandler = async (id: any) => {
const DocRef = doc(db, "users", id);
await updateDoc(DocRef, {
email: "nasirabbas@gmail.com",
});
fetchData();
};
