import { useEffect, useState } from "react";

export function useDataFromUser(username) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Inicialmente null para manejar el estado de carga

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://server-production-789b.up.railway.app/api/Usuarios/${username}`
        );
        const data = await response.json();
        if (data.length > 0) {
          setUser(data[0]); // Solo tomar el primer usuario si hay varios
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }

    if (username) { // Solo ejecutar si hay un username válido
      fetchData();
    }
  }, [username]); // Volver a ejecutar si el username cambia

  return [user, isLoggedIn];
}
