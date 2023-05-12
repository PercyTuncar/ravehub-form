import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { useState } from "react";
import ReactLoading from 'react-loading';

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
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    address: "",
    confirm: "yes",
    photo: null,
    socialMedia: {
      youtube: "",
      facebook: "",
      instagram: "",
      twitter: "",
      whatsapp: "",
      linkedin: "",
      website: "",
      onlyfans: ""
    }
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSocialMediaInputs, setShowSocialMediaInputs] = useState({
    youtube: false,
    facebook: false,
    instagram: false,
    twitter: false,
    whatsapp: false,
    linkedin: false,
    website: false,
    onlyfans: false
  });
  






  const saveDataToFirestore = async () => {
    setLoading(true); // Activa la barra de carga
    // Subir foto a Firebase Storage
    let photoUrl = null;
    if (formData.photo) {
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`photos/${formData.photo.name}`);
      await fileRef.put(formData.photo);
      photoUrl = await fileRef.getDownloadURL();
    }
  
    // Guardar datos en Firebase Firestore
    const db = firebase.firestore();
    db.collection("wildbirthdaylist")
      .add({
        firstname: formData.firstname,
        lastname: formData.lastname,
        dob: formData.dob,
        address: formData.address,
        confirm: formData.confirm,
        photo: photoUrl,
        socialMedia: formData.socialMedia,
        created_at: new Date(),
      })
      .then(() => {
        console.log("Datos guardados en Firestore");
        setShowSuccessMessage(true);
        setFormData({
          firstname: "",
          lastname: "",
          dob: "",
          whatsapp: "",
          address: "",
          confirm: "yes",
          photo: null,
          socialMedia: {
            youtube: "",
            facebook: "",
            instagram: "",
            twitter: "",
            whatsapp: "",
            linkedin: "",
            website: "",
            onlyfans: ""
          }
        });
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      })
      .catch((error) => {
        console.error("Error al guardar datos en Firestore:", error);
      })
      .finally(() => setLoading(false)); // Desactiva la barra de carga
  };
  



  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (event.target.type === "submit") {
      saveDataToFirestore();
    }
  };
  


  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;

    // Si el input es un campo de archivo (type=file)
    if (type === "file") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else if (name.startsWith("socialMedia")) {
      const [_, socialMediaName] = name.split(".");
      setFormData((prevFormData) => ({
        ...prevFormData,
        socialMedia: {
          ...prevFormData.socialMedia,
          [socialMediaName]: value
        }
      }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  //Funcion para mostrar los campos de redes sociales
  const toggleSocialMediaInput = (fieldName) => {
    setShowSocialMediaInputs((prevShowSocialMediaInputs) => ({
      ...prevShowSocialMediaInputs,
      [fieldName]: !prevShowSocialMediaInputs[fieldName]
    }));
  };
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div className={styles.center}>
          <div className="formbold-main-wrapper">
            <div className="formbold-form-wrapper">
    
                 <form onSubmit={handleSubmit}>
    <label htmlFor="firstname">First name:</label>
    <input
      type="text"
      id="firstname"
      name="firstname"
      value={formData.firstname}
      onChange={handleInputChange}
    />

    <label htmlFor="lastname">Last name:</label>
    <input
      type="text"
      id="lastname"
      name="lastname"
      value={formData.lastname}
      onChange={handleInputChange}
    />

    <label htmlFor="dob">Date of birth:</label>
    <input
      type="date"
      id="dob"
      name="dob"
      value={formData.dob}
      onChange={handleInputChange}
    />

    <label htmlFor="address">Address:</label>
    <textarea
      id="address"
      name="address"
      value={formData.address}
      onChange={handleInputChange}
    />

    <label htmlFor="confirm">Confirm:</label>
    <select
      id="confirm"
      name="confirm"
      value={formData.confirm}
      onChange={handleInputChange}
    >
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>

    <label htmlFor="photo">Photo:</label>
    <input
      type="file"
      id="photo"
      name="photo"
      accept="image/*"
      onChange={handleInputChange}
    />











<button
  className={styles.socialMediaButton}
  onClick={() => toggleSocialMediaInput("instagram")}
>
  Instagram
</button>


{showSocialMediaInputs.instagram && (
  <div>
    <label htmlFor="instagram">Instagram:</label>
    <input
      type="text"
      id="instagram"
      name="socialMedia.instagram"
      value={formData.socialMedia.instagram}
      onChange={handleInputChange}
    />
  </div>
)}






 
    <button type="submit" disabled={loading}>
      {loading ? "Loading..." : "Submit"}
    </button>

                <div className="formbold-steps">
                  <img src="https://firebasestorage.googleapis.com/v0/b/ravehub-birthday.appspot.com/o/photos%2FArtboard-1_1%20(1).png?alt=media&token=3ad21e7f-f2b2-4648-bdd4-545cbe34df41" alt="ravehub-logo" />
                 
                 <span className="img2">
                 <img  src="https://ultraperu.com/wp-content/uploads/2022/12/Ultra-Peru-Logo-1024x263.png" alt="ravehub-logo" />
                 </span>
                  {showSuccessMessage && (
                    <p className="success-message">Registro exitoso</p>
                  )}
{loading && (
  <div className="loading-wrapper">
    <ReactLoading type="spin" color="#F6981D" height={20} width={20} />
    <p className="cargando">Te estamos registrando mi estimado/a Raver...</p>
  </div>
)}
                </div>
                
 
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}