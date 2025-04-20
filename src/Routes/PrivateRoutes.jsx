
import { Error404 } from "../views";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
export function PrivateRoutes({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? children : <Error404 />;
}
