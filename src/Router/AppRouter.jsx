import { Route, Routes } from "react-router-dom";
import { Help, Home, Profile, Search } from "../assets";

export function AppRouter() {

  return (
    <div className="app-container">
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/help" element={<Help />}></Route>
          <Route path={`/profile/:username`} element={<Profile />}></Route>
        </Routes>
      </div>
    </div>
  );
}
