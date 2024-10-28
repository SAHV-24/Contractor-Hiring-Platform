import { useMemo } from "react";
import { Error404 } from "../Views/Error404/Error404"; 
import { useSelector } from "react-redux";

export function PrivateRoutes({ children }) {
//   const uid = useSelector((state) => state.auth.uid);
//   const isLoggedIn = useMemo(() => (uid ? true : false), [uid]);
  
    const isLoggedIn = true;


  return isLoggedIn ? children : <Error404 />;
}
