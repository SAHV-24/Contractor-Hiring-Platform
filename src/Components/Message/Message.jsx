/* eslint-disable react/prop-types */
import styles from "./Message.module.css";
import { memo } from "react";

const Message = ({ user, message }) => {
  return (
    <li
      className={message.from === user._id ? styles.fromMe : styles.fromOther}
    >
      <div className={styles.userChat}>
        <img
          src={message.photoURL}
          className={styles.profilePic}
          alt="User profile"
        />
        <span className={styles.username}>@{message.name}</span>
      </div>
      <span className={styles.message}>{message.message}</span>
    </li>
  );
};

export default memo(Message);
