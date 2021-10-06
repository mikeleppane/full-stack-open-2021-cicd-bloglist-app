import React from "react";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";

const Notification = ({ message, type }) => {
  if (!message) {
    return null;
  }
  return (
    <div id="notification">
      <Alert severity={type}>{message}</Alert>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
};

export default Notification;
