import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Router/AppRouter";
import { NavBar } from "./Components/NavBar/NavBar";
import { Footer } from "./Components/Footer/Footer";

createRoot(document.getElementById("root")).render(
  <>

      <BrowserRouter>
        <div id="jcole">
          <NavBar />
          <AppRouter />
          <Footer />
        </div>
      </BrowserRouter>
  </>
);
