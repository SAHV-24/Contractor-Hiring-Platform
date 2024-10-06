import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import NavBar from "./assets/Components/NavBar/NavBar";
import Footer from "./assets/Components/Footer/Footer";

createRoot(document.getElementById("root")).render(
  <div className="container">
    <NavBar />
    <main>
      {/*Photos */}
      {/* <div>*Catalog /*/}
    </main>
    <Footer />
  </div>
);
