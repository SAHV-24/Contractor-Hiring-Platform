import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./assets/views/Home";
import { Search } from "./assets/views/Search";
import { Help } from "./assets/views/Help";
import { NavBar, Profile } from "./assets";
import Footer from "./assets/Components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaDeBusqueda from "./PaginaDeBusqueda/PaginaDeBusqueda";

const username = "juan123";

createRoot(document.getElementById("root")).render(
<<<<<<< HEAD
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
=======
  <>
    <BrowserRouter>
      <body>
        <NavBar />
        <Footer />
      </body>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/help" element={<Help />}></Route>
        <Route path={`/profile/${username}`} element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  </>
);
>>>>>>> 148835ee2bc7abd2635aac7850581d6033727a5f
