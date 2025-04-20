import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export function ContratistaCard({ contratista, user }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-zinc-100 border-2 border-mainColor overflow-hidden hover:shadow-xl duration-300 rounded-2xl w-[500px] hover:cursor-pointer focus:scale-105 hover:translate-y-[-5px] focus:translate-y-[-10px]  focus:shadow-2xl"
      key={contratista._id}
      onClick={() => navigate(`/profile/${contratista.username}`)}
    >
      <div className="flex gap-16 items-center justify-center">
        <img
          src={contratista.fotoDePerfil}
          alt={contratista.nombre}
          className=" ml-4 mt-4 rounded-full h-32 w-32 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
          onClick={() => navigate(`/profile/${contratista.username}`)}
        />
        <div>
          <h2
            onClick={() => navigate(`/profile/${contratista.username}`)}
            className="text-3xl font-semibold text-gray-800 hover:text-[#57bbb4] cursor-pointer transition-colors mb-2"
          >
            {`${contratista.nombre} - ${contratista.ciudad}`}
          </h2>
          <div>
            <h5
              className=" m-0 p-0 text-slate-black font-normal
                text-lg
                "
            >
              Especialidad: {contratista.especialidad}
            </h5>
            <h5
              className="text-slate-black font-normal
              text-lg
              "
            >
              $ {contratista.categoriasOfrecidas[0][0].precioCategoria} pesos
            </h5>
          </div>
          <p className="text-[#239089] text-xl font-medium"></p>
          <p className="text-[#239089] text-xl font-medium"></p>
        </div>
      </div>
      <div className="p-6">
        <div className="flex w-full items-center justify-center">
          <Rating
            defaultValue={
              contratista.rating === 0
                ? Math.round(Math.random() * (5 - 3) + 3)
                : contratista.rating
            }
            readOnly
            className="p-0 m-0 text-[#e5ff1d]"
            sx={{
              gap: "0",
              display: "flex",
              fontSize: "35px",
            }}
          />
        </div>

        <button
          onClick={() =>
            (window.location.href = `/chat/${contratista.username}/${user.username}`)
          }
          className="w-full mt-4 py-2 px-4 bg-[#57bbb4] hover:bg-[#239089] text-white rounded-lg transition-colors duration-200"
        >
          Chatear
        </button>
      </div>
    </div>
  );
}
