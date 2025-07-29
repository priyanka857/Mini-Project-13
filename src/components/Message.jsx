// src/components/Message.jsx
import React from "react";

const Message = ({ type = "success", message, onClose }) => {
  const bgColors = {
    success: "#d4edda",
    error: "#f8d7da",
    warning: "#fff3cd",
    info: "#d1ecf1",
  };

  const textColors = {
    success: "#155724",
    error: "#721c24",
    warning: "#856404",
    info: "#0c5460",
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: bgColors[type],
        color: textColors[type],
        padding: "15px 20px",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        zIndex: 1060,
        minWidth: 280,
        maxWidth: "90vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: "600",
      }}
    >
      <div>{message}</div>
      <button
        onClick={onClose}
        style={{
          background: "transparent",
          border: "none",
          color: textColors[type],
          fontSize: 20,
          fontWeight: "bold",
          cursor: "pointer",
          marginLeft: 20,
          lineHeight: 1,
        }}
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  );
};

export default Message;
