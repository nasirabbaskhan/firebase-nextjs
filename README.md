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
return (
<>

<div className="flex flex-col gap-3 max-w-96 mx-auto mt-9">
<input
onChange={(e) => setFirstName(e.target.value)}
className="outline-none border border-black rounded-md p-1 "
type="text"
placeholder="Inter your first name"
/>
<input
onChange={(e) => setLastName(e.target.value)}
className="outline-none border border-black rounded-md p-1"
type="text"
placeholder="Inter your last name"
/>
<input
onChange={(e) => setEmail(e.target.value)}
className="outline-none border border-black rounded-md p-1"
type="email"
placeholder="Inter your email"
/>
<button
          onClick={addDocumentHandler}
          className="bg-slate-600 py-2 px-3 text-white"
        >
Add Documents
</button>
<div>firstName:{firstName}</div>
<div>lastName:{lastName}</div>
<div>email:{email}</div>
</div>
<div className="max-w-[400px] mx-auto mt-10">
<div className="text-3xl font-bold text-blue-800">Student Data</div>
<table>
<thead>
<tr>
<th className="border  border-blue-950 px-5 py-2">FirstName</th>
<th className="border  border-blue-950 px-5 py-2">LastName</th>
<th className="border  border-blue-950 px-5 py-2">Gemail</th>
<th className="border  border-blue-950 px-5 py-2">Action</th>
</tr>
</thead>
<tbody>
{student.map((item) => {
return (
<tr>
<td className="border  border-blue-950 px-5 py-2 ">
{item.firstName}
</td>
<td className="border  border-blue-950 px-5 py-2">
{item.lastName}
</td>
<td className="border  border-blue-950 px-5 py-2">
{item.email}
</td>
<td
onClick={() => deleteHandler(item.id)}
className="bg-blue-800 border border-blue-950 text-white px-5 py-2 cursor-pointer" >
{isLooading && item.id == id ? "Loading..." : "Delete"}
</td>
</tr>
);
})}
</tbody>
</table>
</div>
</>
);
}
