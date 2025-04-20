import { memo, useState, useEffect, useContext } from "react";
import { AppContext } from "../../provider/AppContext/AppContext";

// eslint-disable-next-line react/display-name, react/prop-types
export const Category = memo(({ categoryId }) => {
  // JWT del cliente
  const { clientKey, notificacionDeExito, notificacionDeError } =
    useContext(AppContext);

  const [category, setCategory] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          `https://server-production-789b.up.railway.app/api/Categorias/getById/${categoryId}`,
          {
            headers: {
              "jwt-token": clientKey,
            },
          }
        );

        if (res.status === 200) {
          const data = await res.json(); // convertimos a JSON
          setCategory(data);
        }
      } catch (err) {
        console.log(err);
        notificacionDeError(err);
      }
    }

    fetchCategories(); // Llamada a la función dentro de useEffect
  }, [categoryId]); // Se añade categoryId como dependencia

  return category ? (
    <div className="flex flex-col justify-center items-center my-4 rounded-md border-mainColor shadow-lg border-2 px-3 py-7">
      <h3 className="2xl:text-xl xl:text-lg">{category.nombre}</h3>
      <img
        src={`${category.imagen}`}
        alt={`${category.nombre} icon`}
        style={{ height: 50, width: 50, padding: 0 }}
      />
    </div>
  ) : (
    <div className="flex justify-center items-center">
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status"></div>
      </div>
    </div>
  );
});
