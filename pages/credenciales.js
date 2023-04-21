import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/cards.module.css";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";

const firebaseConfig = {
  apiKey: "AIzaSyBqfJXIAm1kXGmtLt_H6D9Rn8xNR74le8Y",
  authDomain: "ravehub-birthday.firebaseapp.com",
  databaseURL: "https://ravehub-birthday-default-rtdb.firebaseio.com",
  projectId: "ravehub-birthday",
  storageBucket: "ravehub-birthday.appspot.com",
  messagingSenderId: "370315325048",
  appId: "1:370315325048:web:56c3847d68b8afb930478d",
  measurementId: "G-JT16PPPSGC",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function Home() {
  const [birthdayList, setBirthdayList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener datos de la colección "wildbirthdaylist" en Firebase Firestore
    const db = firebase.firestore();
    db.collection("wildbirthdaylist")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setBirthdayList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener datos de Firestore:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <Head className="title">
        <title>Credenciales RaveHub</title>
      </Head>

      <main className={styles.container}>
        <h1 className="h1">Credenciales</h1>
        <img 
          src="https://firebasestorage.googleapis.com/v0/b/ravehub-birthday.appspot.com/o/photos%2FArtboard-1_1%20(1).png?alt=media&token=3ad21e7f-f2b2-4648-bdd4-545cbe34df41"
          alt="RaveHub Logo"
          className="logo"
        />
        {loading ? (
          <ReactLoading type="spin" color="#fff" height={50} width={50} />
        ) : (
          <div className={styles.birthdayCardsContainer}>
            {birthdayList.map((birthday, index) => (
            <div key={`${birthday.firstname}-${birthday.lastname}-${index}`} className={styles.birthdayCard}>
            <div className={styles.birthdayCardContent}>
              {birthday.photo && (
                <div className={styles.birthdayCardPhoto}>
                  <Image
                    src={birthday.photo}
                    alt={`Photo of ${birthday.firstname} ${birthday.lastname}`}
                    width={150}
                    height={150}
                  />
                </div>
              )}
              <div className={styles.birthdayCardInfo}>
                <h2>{`${birthday.firstname} ${birthday.lastname}`}</h2>
                <p>
                  <strong>Date of Birth:</strong> {birthday.dob}
                </p>
                <p>
                  <strong>WhatsApp:</strong> {birthday.whatsapp}
                </p>
                <p>
                  <strong>Address:</strong> {birthday.address}
                </p>
                <p>
                  <strong>Confirmation:</strong> {birthday.confirm}
                </p>
              </div>
            </div>
          </div>
          
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
