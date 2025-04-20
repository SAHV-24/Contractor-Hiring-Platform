export const fetchAllContratistas = async (clientKey) => {
    const response = await fetch(
      "https://server-production-789b.up.railway.app/api/Contratistas/",
      {
        headers: {
          "jwt-token": clientKey,
        },
      }
    );
  
    if (!response.ok) throw new Error(`Error al obtener contratistas: ${response.status}`);
    return response.json();
  };