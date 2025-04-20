import { Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { PrivateContratistasRoutes } from "./PrivateContratistasRoutes";
import {
  Home,
  Profile,
  Search,
  Error404,
  CreateContratistaForm,
  Chat,
  Citas,
  Hire,
} from "../views";
import { Login, Register } from "../Components";

import { db } from "../firebase/config";
import { useSelector } from "react-redux";

export function AppRouter() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="app-container">
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile">
            <Route path=":username" element={<Profile />} />
          </Route>
          <Route path="/*" element={<Error404 />} />
          <Route path="/login" element={isLoggedIn ? "" : <Login />} />
          <Route path="/register" element={isLoggedIn ? "" : <Register />} />
          <Route path="/registerContratista">
            <Route
              path=":username"
              element={
                <PrivateContratistasRoutes>
                  <CreateContratistaForm />
                </PrivateContratistasRoutes>
              }
            />
          </Route>{" "}
          <Route path="/registerContratista">
            <Route
              path=":username"
              element={
                <PrivateContratistasRoutes>
                  <CreateContratistaForm />
                </PrivateContratistasRoutes>
              }
            />
          </Route>
          <Route path="/chat">
            <Route path=":username">
              <Route
                path=":loggedInUsername"
                element={
                  <PrivateRoutes>
                    <Chat db={db} />
                  </PrivateRoutes>
                }
              ></Route>
            </Route>
          </Route>
          <Route path="/citas">
            <Route
              path=":username"
              element={<PrivateRoutes>
                <Citas  />
              </PrivateRoutes>}
            ></Route>
          </Route>
          <Route path="/contratar">
            <Route
              path=":hiringContratistaUsername"
              element={
                <PrivateRoutes>
                  <Hire />
                </PrivateRoutes>
              }
            ></Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}
