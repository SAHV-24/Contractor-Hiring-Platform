import ReactDOM from "react-dom";
import "./Notifications.css";

export function Notifications({ notifications }) {
  return ReactDOM.createPortal(
    <div className="notification-container">
      {notifications.map((notif) => (
        <div key={notif.id} className={`notification ${notif.type}`}>
          {notif.message}
        </div>
      ))}
    </div>,
    document.body
  );
}
