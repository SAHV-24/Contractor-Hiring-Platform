/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Category } from "../";

export function CategoryForHiring({ cat, key, styles, contratista }) {
  const navigate = useNavigate();

  return (
    <div key={key} className={styles.contratistaCatCard}>
      <Category key={key} categoryId={cat._id} />
      <button
        onClick={() =>
          navigate(`/contratar/${contratista.usuarioInfo[0].username}`)
        }
        className="px-4 py-2 rounded-full bg-mainColor text-white font-bold hover:transition-all hover:cursor-pointer hover:bg-terColor "
      >
        Contratar!
      </button>
    </div>
  );
}
