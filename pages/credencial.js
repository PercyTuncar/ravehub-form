import { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

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

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const db = firebase.firestore();
    const query = db
      .collection("wildbirthdaylist")
      .where("whatsapp", "==", searchTerm);
    try {
      const snapshot = await query.get();
      const results = snapshot.docs.map((doc) => doc.data());
      setSearchResults(results);
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Ingresa el número de WhatsApp"
        />
        <button className="search-button" onClick={handleSearch}>
          Buscar
        </button>
      </div>

      <div className="search-card">
        {searchResults.length > 0 && (
          <ul className="search-results">
            {searchResults.map((result) => (
              <li key={result.whatsapp} className="search-result">
                  <img
                  className="search-result-photo"
                  src={result.photo}
                  alt="Foto"
                />
                <div className="search-result-name">
                  {result.firstname} {result.lastname}
                </div>
                <div className="search-result-dob">{result.dob}</div>
                <div className="search-result-whatsapp">{result.whatsapp}</div>
                <div className="search-result-address">{result.address}</div>
                <img
              src="https://firebasestorage.googleapis.com/v0/b/ravehub-birthday.appspot.com/o/photos%2FArtboard-1_1%20(1).png?alt=media&token=3ad21e7f-f2b2-4648-bdd4-545cbe34df41"
              alt="RaveHub Logo"
              className="logo"
            />
              </li>
            ))}
           
          </ul>
        )}
      </div>
    </>
  );
}
