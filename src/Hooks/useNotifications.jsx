import { useState, useCallback } from "react";

import "./Notifications.css"; // Archivo CSS para estilos básicos de las notificaciones

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const notificacionDeExito = useCallback((message) => {
    addNotification(message, "success");
  }, []);

  const notificacionDeError = useCallback((message) => {
    addNotification(message, "error");
  }, []);

  function addNotification(message, type) {
    const id = Date.now(); // Genera un ID único
    setNotifications((prev) => [...prev, { id, message, type }]);
    // Elimina la notificación después de 3 segundos
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 10000);
  }

  return {
    notificacionDeExito,
    notificacionDeError,
    notifications,
  };
};
