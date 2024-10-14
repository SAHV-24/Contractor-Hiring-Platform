import { useState, useEffect } from "react";
//import axios from "axios";
import './PaginaDeBusqueda.css';

const PaginaDeBusqueda = () => {
  const [contratistas, setContratistas] = useState([]);
  const [filteredContratistas, setFilteredContratistas] = useState([]);
  const [filtros, setFiltros] = useState({
    masCercano: false,
    menorPrecio: true,
    guardados: false
  });

  // esto es una prueba
  const contratistasPrueba = [
    {
      _id: '1',
      nombre: 'Juanito Pereira',
      ciudad: 'Cali',
      precioCategoria: 400000,
      ratingUsuario: 5,
      fotoDePerfil: 'https://placehold.co/60',
      distancia: 5,
      guardado: true
    },
    {
      _id: '2',
      nombre: 'Juanito Pereira',
      ciudad: 'Bogotá',
      precioCategoria: 350000,
      ratingUsuario: 4,
      fotoDePerfil: 'https://placehold.co/60',
      distancia: 50,
      guardado: false
    },
    {
      _id: '3',
      nombre: 'Juanito',
      ciudad: 'Pereira',
      precioCategoria: 300000,
      ratingUsuario: 5,
      fotoDePerfil: 'https://placehold.co/60',
      distancia: 15,
      guardado: true
    },
    {
      _id: '4',
      nombre: 'Juanito',
      ciudad: 'Palmira',
      precioCategoria: 450000,
      ratingUsuario: 4,
      fotoDePerfil: 'https://placehold.co/60',
      distancia: 10,
      guardado: false
    },
  ];

  
  const fetchContratistas = async () => {
    try {
      setContratistas(contratistasPrueba);
      setFilteredContratistas(contratistasPrueba);
      {/*
      const res = await axios.get("http://localhost:3000/api/Contratistas"); 
      setContratistas(res.data);
      setFilteredContratistas(res.data);
      */}
    } catch (error) {
      console.error("Error al obtener contratistas", error);
    }
  };

  const aplicarFiltros = () => {
    let filtrados = [...contratistas];

    if (filtros.masCercano) {
      filtrados = filtrados.sort((a, b) => a.distancia - b.distancia); 
    }
    if (filtros.menorPrecio) {
      filtrados = filtrados.sort((a, b) => a.precioCategoria - b.precioCategoria);
    }
    if (filtros.guardados) {
      filtrados = filtrados.filter(contratista => contratista.guardado);
    }

    setFilteredContratistas(filtrados);
  };

  
  useEffect(() => {
    fetchContratistas();
  }, []);

  
  useEffect(() => {
    aplicarFiltros();
  }, [filtros, contratistas]);

  const manejarFiltro = (e) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.checked
    });
  };

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

      <div className="resultados">
        {filteredContratistas.map((contratista) => (
          <div className="contratista-card" key={contratista._id}>
            <img src={contratista.fotoDePerfil} alt={contratista.nombre} />
            <div className="info-contratista">
              <h3>{`${contratista.nombre} - ${contratista.ciudad}`}</h3>
              <p>${contratista.precioCategoria}</p>
              <p>{contratista.ratingUsuario} estrellas</p>
              <button onClick={()=> alert("Cita solicitada OKS?")}>Solicitar cita</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaginaDeBusqueda;
