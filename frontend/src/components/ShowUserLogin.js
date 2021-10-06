import React from "react";
import Button from "./Button";
import PropTypes from "prop-types";

const ShowUserLogin = ({ name }) => (
  <p>
    {name} logged in
    <Button
      text={"logout"}
      onButtonClick={() => {
        window.localStorage.clear();
      }}
    >
      logout
    </Button>
  </p>
);

ShowUserLogin.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ShowUserLogin;
