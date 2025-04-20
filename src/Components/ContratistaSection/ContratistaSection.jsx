/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./ContratistasSection.module.css";
import { ImageFrame, CategoryForHiring } from "../";

export function ContratistaSection({ username = "", clientKey = "" }) {
  const [contratista, setContratista] = useState(null);
  const [ultimosTrabajos, setUltimosTrabajos] = useState([]);
  const [categoriaDetails, setCategoriaDetails] = useState([]);

  useEffect(() => {
    async function fetchContratistaData() {
      const response = await fetch(
        `https://server-production-789b.up.railway.app/api/Contratistas/getByUsername/${username}`,
        {
          headers: {
            "jwt-token": clientKey,
          },
        }
      );
      const theContratista = await response.json();
      setCategoriaDetails(theContratista[0].categoriasDetails);
      setContratista(theContratista[0]);
    }

    fetchContratistaData();
  }, [username, clientKey]);

  useEffect(() => {
    async function fetchUltimosTrabajos() {
      if (contratista?.length === 0) return;
      else {
        if (!contratista) return;
        const theEspecialidad = categoriaDetails[0].nombre;
        const amountOfImages = Math.round(Math.random() * 2) + 1;

        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${theEspecialidad}&per_page=${amountOfImages}&client_id=zctywmv4v9oeKTTPywvSvbw2Ota2lUh-TKU1iMN814w`
        );

        const theImages = await response.json();

        setUltimosTrabajos(theImages.results);
      }
    }

    fetchUltimosTrabajos();
  }, [contratista]);

  return (
    <>
      <section className={styles.categoriasSection}>
        {contratista ? (
          <>
            <p>
              Puedes contratar a {contratista?.usuarioInfo[0].nombre} en lo
              siguiente:
            </p>
            <div className={styles.categoriasCarrousel}>
              {categoriaDetails?.map((cat, key) => (
                <CategoryForHiring
                  contratista={contratista}
                  cat={cat}
                  key={key}
                  styles={styles}
                />
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </section>
      <section className={styles.lastJobsSection}>
        <p className="text-xl">
          Mira los <strong className="text-xl">últimos trabajos</strong> de{" "}
          {contratista?.usuarioInfo[0].nombre}
        </p>
        <div className={styles.lastJobs}>
          {ultimosTrabajos.length > 0
            ? ultimosTrabajos.map((trabajo, index) => (
                <ImageFrame
                  key={index}
                  source={trabajo.urls.raw}
                  h={300}
                />
              ))
            : ""}
        </div>
      </section>
    </>
  );
}
