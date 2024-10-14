import { useState, useEffect } from "react";
import "./PaginaDeBusqueda.css";

const PaginaDeBusqueda = () => {
  const [contratistas, setContratistas] = useState([]);
  const [filteredContratistas, setFilteredContratistas] = useState([]);
  const [filtros, setFiltros] = useState({
    masCercano: false,
    menorPrecio: true,
    guardados: false,
  });

  const category = "Electricidad"; //TODO esto se tiene que obtener de un <input> del html

  // LO que está desde la línea 16 hasta la línea 60 se puede poner en un custom hook
  const aplicarFiltros = () => {
    let filtrados = [...contratistas];
    if (filtros.masCercano) {
      filtrados = filtrados.sort((a, b) => a.distancia - b.distancia);
    }
    if (filtros.menorPrecio) {
      filtrados = filtrados.sort(
        (a, b) => a.precioCategoria - b.precioCategoria
      );
    }
    if (filtros.guardados) {
      filtrados = filtrados.filter((contratista) => contratista.guardado);
    }
    setFilteredContratistas(filtrados);
  };

  const manejarFiltro = (e) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.checked,
    });
  };

  // función para settear a los contratistas
  useEffect(() => {
    const getContratistas = async () => {
      const data = await fetch("http://localhost:3000/api/search", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({ category }),
      }); // hace la petición a la API

      const results = await data.json();

      // Esto retorna un json de esta forma:

      /* ES UN ARREGLO DE OBJETOS:
          [
            {
                    _id,
                    rating, 
                    nombre,
                    apellido, 
                    ciudad,
                    especialidad, 
                    username,
                    fotoDePerfil,
                    categoriasOfrecidas, (AQUÍ SE MUESTRA EL NOMBRE DE LA CATEGORÍA)
                    categoriasInfo, (AQUÍ SE MUESTRA EL PRECIO)
              },
              {
                "_id": "66e4890b5830452cc3c355fd",
                "rating": 5,
                "nombre": "Luis",
                "apellido": "Fernandez",
                "ciudad": "Cartagena",
                "especialidad": "Plomero",
                "username": "luis123",
                "fotoDePerfil": "foto4.jpg",
                "categoriasOfrecidas": [
                  {
                    "idCategoria": "66e4886cbddb83c50ec356f5",
                    "precioCategoria": 45000
                  }
                ],
                "categoriasInfo": {
                  "_id": "66e4886cbddb83c50ec356f5",
                  "nombre": "Plomería",
                  "imagen": "plomeria.jpg"
                }
              }
          ]


*/

      setContratistas(results); // cambia el estado
    };

    getContratistas();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [filtros, contratistas]);

  return (
    <div className="busqueda-container">
      <div className="filtros">
        <h2>Técnico de Computadores</h2>
        <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              name="masCercano"
              checked={filtros.masCercano}
              onChange={manejarFiltro}
            />
            Más cercano
          </label>
          <label>
            <input
              type="checkbox"
              name="menorPrecio"
              checked={filtros.menorPrecio}
              onChange={manejarFiltro}
            />
            Menor precio
          </label>
          <label>
            <input
              type="checkbox"
              name="guardados"
              checked={filtros.guardados}
              onChange={manejarFiltro}
            />
            Guardados
          </label>
        </div>
      </div>
      {/* Esto se puede segregar en algo componentes! */}

      <div className="resultados">
        {filteredContratistas.map((contratista) => (
          <div className="contratista-card" key={contratista._id}>
            <img src={contratista.fotoDePerfil} alt={contratista.nombre} />
            <div className="info-contratista">
              <h3>{`${contratista.nombre} - ${contratista.ciudad}`}</h3>
              <p>${contratista.categoriasOfrecidas[0][0].precioCategoria}</p>
              <p>{contratista.rating} estrellas</p>
              <button onClick={() => alert("Cita solicitada OKS?")}>
                Solicitar cita
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaginaDeBusqueda;
