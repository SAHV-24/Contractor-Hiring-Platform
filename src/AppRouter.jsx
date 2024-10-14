import { Route, Routes } from "react-router-dom";
import { Help, Home, Profile, Search } from "./assets";

export function AppRouter() {
  const username = "juan123";

  return (
    <div className="app-container">
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/help" element={<Help />} />
          <Route path={`/profile/${username}`} element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}
