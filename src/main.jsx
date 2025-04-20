import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Routes/AppRouter";
import { NavBar } from "./Components/NavBar/NavBar";
import { Footer } from "./Components/";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AppProvider } from "./provider/AppContext/AppProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import { Notifications } from "./Hooks/Notifications";
import { useNotifications } from "./Hooks/useNotifications";
import { useContext } from "react";
import { AppContext } from "./provider/AppContext/AppContext";

// Creamos un componente Layout para manejar la estructura
const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <NavBar />
      <div className="flex-grow flex overflow-hidden">
        <div className="h-24" /> {/* Espaciador para el navbar fijo */}
        <div className="flex-grow overflow-y-auto">
          {" "}
          {/* Solo permitir scroll vertical */}
          <AppRouter />
        </div>
        <div className="h-40" /> {/* Espaciador para el footer fijo */}
      </div>
    </div>
  );
};

// Renderizamos la aplicación con el Layout
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <NotificationsProvider>
      <AppProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AppProvider>
    </NotificationsProvider>
  </Provider>
);
