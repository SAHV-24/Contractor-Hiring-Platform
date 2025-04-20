export const fetchUserByEmail = async (email, clientKey) => {
  const response = await fetch(
    `https://server-production-789b.up.railway.app/api/Usuarios/getByEmail/${email}`,
    {
      headers: {
        "jwt-token": clientKey,
      },
    }
  );

  if (!response.ok)
    throw new Error(`Error al obtener usuario: ${response.status}`);
  return response.json();
};
