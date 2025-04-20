// export async function validateJWT(uid, username, role) {
//     try {
  
//       // LLAVE SECRETA PARA QUE EN EL BACKEND SOLO SE PUEDA CREAR LA KEY, SI SE ENVÍA LA PALABRA CORRECTA.
//       const secretKey = import.meta.env.VITE_SECRET_JWT_SEED
  
//       const response = await fetch("https://server-production-789b.up.railway.app/api/Auth", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           uid,
//           username,
//           role,
//           secretKey
//         }),
//       });
  
//       const data = await response.json();
  
//       // Verifica que la respuesta contenga el formato esperado
//       if (!data.message || data.message !== "OK" || !data.token) {
//         throw new Error("La respuesta de autenticación no es válida.");
//       }
  
//       return data;
//     } catch (error) {
//       console.error("Error en loginToDatabase:", error.message);
//       throw error; // Para permitir que el thunk maneje el error
//     }
//   }
  