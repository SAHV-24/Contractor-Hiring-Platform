import { memo, useState, useEffect } from "react";

// eslint-disable-next-line react/display-name, react/prop-types
export const Category = memo(({ categoryId }) => {
  console.log("asd");
  console.log(categoryId);

  const [category, setCategory] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          `http://localhost:3000/api/Categorias/getById/${categoryId}`
        );

        if (res.status === 200) {
          const data = await res.json(); // convertimos a JSON
          setCategory(data);
        }
      } catch (err) {
        // TODO estos errores deben de notificarse
        console.log(err);
        alert(err);
      }
    }

    fetchCategories(); // Llamada a la función dentro de useEffect
  }, [categoryId]); // Se añade categoryId como dependencia

  // ! LOS LOGOS DE LAS CATEGORIAS SE IMPORTAN DESDE ESTA PÁGINA:
  // ! DEBE DE PONERSELE EL COLOR: #57bbb4 E IMPORTARLOS DE TAMAÑO 80x80
  // !https://fonts.google.com/?selected=Material+Symbols+Outlined:shower:FILL@0;wght@400;GRAD@0;opsz@20&icon.size=16&icon.color=%23F3F3F3

  return category ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin:"10px 0"
      }}
    >
      <h2>{category.nombre}</h2>
      <img
        src={`/svgs/${category.imagen}`}
        alt={`${category.nombre} icon`}
        style={{ height: 50, width: 50 }}
      />
    </div>
  ) : (
    "Cargando..."
  ); // TODO la pantalla de carga también debe de mejorarse, puede ponerse un componente
});
