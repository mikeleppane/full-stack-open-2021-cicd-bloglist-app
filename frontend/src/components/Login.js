import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import LoginIcon from "@mui/icons-material/Login";

const Login = ({
  handleLogin,
  handleUsernameOnChange,
  handlePasswordOnChange,
  username,
  password,
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            size="small"
            label={"Enter username"}
            required
            id="username_login"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameOnChange}
          />
        </div>
        <div>
          <TextField
            sx={{ marginTop: 2 }}
            type={"password"}
            size="small"
            label={"Enter password"}
            required
            id="password_login"
            value={password}
            name="Password"
            onChange={handlePasswordOnChange}
          />
        </div>
        <Button
          sx={{ marginTop: 2 }}
          startIcon={<LoginIcon />}
          size="small"
          variant="contained"
          color={"primary"}
          id="login-button"
          type="submit"
        >
          login
        </Button>
      </form>
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameOnChange: PropTypes.func.isRequired,
  handlePasswordOnChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default Login;
