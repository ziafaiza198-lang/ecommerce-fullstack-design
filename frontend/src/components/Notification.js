import React from "react";

function Notification({ message, show }) {
  return (
    <div
      className={`fixed top-5 right-5 px-6 py-3 rounded shadow-lg text-white font-semibold transition-transform duration-300
        ${show ? "translate-x-0 opacity-100" : "translate-x-28 opacity-0"} 
        bg-green-600`}
    >
      {message}
    </div>
  );
}

export default Notification;
