export async function fetchAllCategories(clientKey) {
  const response = await fetch(
    "https://server-production-789b.up.railway.app/api/Categorias/",
    {
      headers: {
        "jwt-token": clientKey,
      },
    }
  );

  if (!response.ok)
    throw new Error("No se ha podido obtener todas las categorías");
  return response.json();
}
