/* eslint-disable react/prop-types */
import styles from "./CitaItem.module.css";

export function Estado({ estado }) {
  return (
    <div className="mt-10 w-full text-center cursor-not-allowed">
      <span className={`${styles.estado} ${styles[estado]} `}>{estado}</span>
    </div>
  );
}
