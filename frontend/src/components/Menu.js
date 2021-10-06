import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const Menu = ({ name }) => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div style={{ backgroundColor: "lightgrey" }}>
      <Link to="/" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      {name} logged in
      <Button
        text={"logout"}
        onButtonClick={() => {
          window.localStorage.clear();
        }}
      >
        logout
      </Button>
    </div>
  );
};

export default Menu;
