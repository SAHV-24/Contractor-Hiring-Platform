import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ref, set, onValue } from "firebase/database";
import styles from "./View.module.css";
import Message from "../../Components/Message/Message";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../provider/AppContext/AppContext";
import { fetchUserByUsername } from "../../Helpers/fetchUserByUsername";

export function Chat({ db }) {
  const { notificacionDeExito, notificacionDeError, clientKey } =
    useContext(AppContext);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [chattingUser, setChattingUser] = useState({});
  const [messages, setMessages] = useState([]);
  const { loggedInUsername, username } = useParams();
  const inputRef = useRef();
  const messagesEndRef = useRef(); // referencia para el final de los mensajes

  const usernames = useMemo(
    () => [loggedInUsername, username],
    [loggedInUsername, username]
  );
  const path = useMemo(
    () => usernames.sort((a, b) => a.localeCompare(b)).join("TO"),
    [usernames]
  );

  useEffect(() => {
    async function fetchChattingUser() {
      try {
        const response = await fetchUserByUsername(username, clientKey);
        setChattingUser(response);
      } catch (exc) {
        console.error(exc);
      }
    }

    if (username === loggedInUsername) navigate("/error404");
    if (username === "admin" && loggedInUsername === "admin")
      navigate("/error404");

    fetchChattingUser();
  }, []);

  async function AddToDb(e) {
    e.preventDefault();

    const messagesReference = ref(db, `messages/${path}/${Date.now()}`);
    try {
      await set(messagesReference, {
        message: inputRef.current.value,
        from: user._id,
        createdAt: Date.now(),
        name: user.username,
        photoURL: user.fotoDePerfil,
      });

      inputRef.current.value = "";
    } catch (exc) {
      notificacionDeError(exc.message);
    }
  }

  useEffect(() => {
    const dbRef = ref(db, `messages/${path}`);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const resultedMessages = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        setMessages(resultedMessages);
      }
    });

    return () => unsubscribe();
  }, [db]);

  // Efecto para hacer scroll automático al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="mb-16 mt-16">
      <div className={styles.chatBorder}>
        <div className={styles.userTop}>
          <img
            src={chattingUser.fotoDePerfil}
            className={styles.profilePic}
            alt="User profile"
          />
          <h1>
            {chattingUser.nombre} {chattingUser.apellido}
          </h1>
        </div>
        <div className={styles.chat}>
          <ul className={styles.styleList}>
            {messages.map((message, key) => (
              <Message key={key} message={message} user={user} />
            ))}
            <div ref={messagesEndRef} />
          </ul>
        </div>
        <form onSubmit={AddToDb} className={styles.inputForm}>
          <input type="text" className={styles.input} ref={inputRef} />
          <button className={styles.button}>Enviar</button>
        </form>
      </div>
    </div>
  );
}
