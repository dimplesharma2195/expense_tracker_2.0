import React from "react";

const Notification = (props) => {
  let backgroundColor = "#ccc";
  if (props.status === "error") {
    backgroundColor = "#ffb3b3";
  }
  if (props.status === "success") {
    backgroundColor = "#b3ffb3";
  }
  if (props.status === "pending") {
    backgroundColor = "#ffeeba";
  }

  const notificationStyle = {
    backgroundColor: backgroundColor,
    textAlign: "center",
    padding: "1rem",
    width: "100%",
    marginTop: "1rem",
  };

  return (
    <div style={notificationStyle}>
      <h2>{props.title}</h2>
      <p>{props.message}</p>
    </div>
  );
};

export default Notification;