import React from "react";
import PropTypes from "prop-types";

const Button = ({ id, text, onButtonClick }) => {
  return (
    <button id={id} style={{ margin: "5px" }} onClick={onButtonClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default Button;
