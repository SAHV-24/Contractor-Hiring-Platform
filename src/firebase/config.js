import { getAuth , GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA9AYTFe7erbV8knu427ElZ2rh02eqy5JQ",
  authDomain: "estructura-de-datos-2.firebaseapp.com",
  projectId: "estructura-de-datos-2",
  storageBucket: "estructura-de-datos-2.appspot.com",
  messagingSenderId: "1005692678",
  appId: "1:1005692678:web:2aa0bc7c9fe6e86cbce087",
};

//Is the main configuration for our project, it has some atributes as the id,
//the project key and some other things
const app = initializeApp(firebaseConfig);
const auth = getAuth(); // para la autenticación de firebase
const provider = new GoogleAuthProvider();
// en caso tal de que quiera persistencia en la aplicación, puedo usar:

export { app, auth, provider };
