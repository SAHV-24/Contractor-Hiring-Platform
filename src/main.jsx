import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./assets/views/Home";
import { Search } from "./assets/views/Search";
import { Help } from "./assets/views/Help";
import { NavBar } from "./assets/Components/NavBar/NavBar";
import { Profile } from "./assets";

const username = "juan123"

createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <NavBar />      
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/help" element={<Help />}></Route>
        <Route path={`/profile/${username}`} element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  </>
);
