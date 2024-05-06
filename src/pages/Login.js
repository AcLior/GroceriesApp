import { Button, Typography, Alert, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useFormContext } from "react-hook-form";
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
} from "../constants/AppConstants";
import "../css/Login.css";

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useFormContext();

  const onSubmit = async (data) => {
    try {
      await loginUser(data);
      localStorage.setItem("email", data.email);
      reset();
      navigate("/grocery-list");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const MoveToRegisterPage = () => {
    reset();
    navigate("/register");
  };

  return (
    <div className="login-container">
      <form className="login-form-container" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" align="center" gutterBottom>
          כניסה
        </Typography>
        <div className="email-container">
          <label>אימייל</label>
          <TextField
            placeholder="נא הכנס אימייל"
            fullWidth
            {...register("email", EMAIL_VALIDATION)}
          />
          {errors.email && (
            <Alert severity="error">{errors.email.message}</Alert>
          )}
        </div>
        <div className="password-container">
          <label>סיסמא</label>
          <TextField
            placeholder="נא הכנס סיסמא"
            fullWidth
            {...register("password", PASSWORD_VALIDATION)}
          />
          {errors.password && (
            <Alert severity="error">{errors.password.message}</Alert>
          )}
        </div>
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={MoveToRegisterPage}
        >
          Did you register already?
        </Button>
      </form>
    </div>
  );
}

export default Login;
