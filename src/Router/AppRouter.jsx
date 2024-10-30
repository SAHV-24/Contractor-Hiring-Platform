import { Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "../Views/Home/Home";
import { Help } from "../Views/Help/Help";
import { Profile } from "../Views/Profile/Profile";
import { Search } from "../Views/Search/Search";
import { PrivateRoutes } from "./PrivateRoutes";
import { Error404 } from "../Views/Error404/Error404";
import { Login } from "../Components/Login/Login";
import { Register } from "../Components/Register/Register";
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";

export function AppRouter() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn]);

  return (
    <div className="app-container">
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/help" element={<Help />}></Route>
          <Route path="/profile">
            <Route path=":username" element={<Profile />} />
          </Route>
          <Route path="/*" element={<Error404 />} />
          <Route
            path="/login"
            element={
              <PrivateRoutes>
                <Login />
              </PrivateRoutes>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <PrivateRoutes>
                <Register />
              </PrivateRoutes>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}
