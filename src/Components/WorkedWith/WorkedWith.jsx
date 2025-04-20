/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./WorkedWith.module.css";

export function WorkedWith({ message = "Trabajó", hiring }) {
  const navigate = useNavigate();

  console.log(hiring);

  return (
    <div
      onClick={() => navigate(`/profile/${hiring.contratistaUsuario.username}`)}
      className="hover:shadow-xl rounded-[20px] duration-300 hover:cursor-pointer focus:scale-105 hover:translate-y-[-5px] focus:translate-y-[-10px]  focus:shadow-2xl"
    >
      <div className={styles.workedWith}>
        <img
          src={hiring.contratistaUsuario.fotoDePerfil}
          className={styles.contratistaImg}
        />
        <div className={styles.texting}>
          <h3>
            {message} con
            <span
              className={styles.contratistaName}
              onClick={() =>
                navigate(`/profile/${hiring.contratistaUsuario.username}`)
              }
            >
              {hiring.contratistaUsuario.nombre}{" "}
            </span>
          </h3>
          <h3>
            En un trabajo de
            <span className={styles.jobTypo}>
              {hiring.categoriaData.nombre}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}
