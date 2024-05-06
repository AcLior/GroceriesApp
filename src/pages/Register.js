import { useState } from "react";
import { Button, TextField, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useFormContext } from "react-hook-form";
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
} from "../constants/AppConstants";
import "../css/Login.css";

function Register() {
  const [confirmRegister, setConfirmRegister] = useState(null);
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useFormContext();

  const onSubmit = async (registeredEmail, registeredPassword) => {
    try {
      const response = await registerUser(registeredEmail, registeredPassword);
      setConfirmRegister(response);
      console.log(response);
    } catch (error) {
      console.error("Register failed:", error.message);
      setConfirmRegister(false);
    }
  };

  const MoveToLoginPage = () => {
    reset();
    navigate("/");
  };

  return (
    <div className="login-container">
      <form className="login-form-container" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" align="center" gutterBottom>
          הרשמה
        </Typography>
        <div className="email-container">
          <label>אימייל</label>
          <TextField
            placeholder="נא הכנס אימייל"
            fullWidth
            {...register("registeredEmail", EMAIL_VALIDATION)}
          />
          {errors.registeredEmail && (
            <Alert severity="error">{errors.registeredEmail.message}</Alert>
          )}
        </div>
        <div className="password-container">
          <label>סיסמא</label>
          <TextField
            placeholder="נא הכנס סיסמא"
            fullWidth
            {...register("registeredPassword", PASSWORD_VALIDATION)}
          />
          {errors.registeredPassword && (
            <Alert severity="error">{errors.registeredPassword.message}</Alert>
          )}
        </div>
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
        <Button variant="contained" color="primary" onClick={MoveToLoginPage}>
          Do you have an account?
        </Button>
        {confirmRegister ? (
          <p>The account has been successfully registered</p>
        ) : confirmRegister === false ? (
          <p>The account has already been registered</p>
        ) : null}
        {/* if(confirmRegister === true)
        {<p>The account has been successfully registered</p>} else {null} */}
      </form>
    </div>
  );
}

export default Register;
