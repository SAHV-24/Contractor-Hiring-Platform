import { Error404 } from "../views";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
export function PrivateContratistasRoutes({ children }) {
  const { isItAContratista } = useSelector((state) => state.auth);

  return !isItAContratista ? children : <Error404 />;
}
