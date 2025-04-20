export const isUserAContratista = (allContratistas, userId) => {
  return allContratistas.some(
    (contratista) => contratista.usuarioId.toString() === userId
  );
};
