import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import NavBar from "./assets/Components/NavBar/NavBar";
import Footer from "./assets/Components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaDeBusqueda from "./PaginaDeBusqueda/PaginaDeBusqueda";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <div className="container">
        <NavBar />
        <main>
          <Routes>
            {/* en path coloque como va a salir en la url tipo https etc etc/comolopuseenelPath y en element el componente */}
            <Route path="/busqueda" element={<PaginaDeBusqueda />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </StrictMode>
);