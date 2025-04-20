import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "<YOUR_API_KEY>",
  authDomain: "<YOUR_AUTH_DOMAIN>",
  databaseURL: "<YOUR_REAL_TIME_DB>",
  projectId: "<YOUR_PROJECT_ID>",
  storageBucket: "<YOUR_STORAGE>",
  messagingSenderId: "<YOUR_SENDER_ID>",
  appId: "<YOUR_APP_ID>"
};

// Configuración principal para tu proyecto
const app = initializeApp(firebaseConfig);
const auth = getAuth(); // Para la autenticación de Firebase
const provider = new GoogleAuthProvider();
// Para la persistencia en la aplicación, usa:
const db  = getDatabase(app);

export { app, auth, provider, db };
