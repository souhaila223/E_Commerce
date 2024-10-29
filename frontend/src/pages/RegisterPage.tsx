import { Box, Button, TextField, Typography } from "@mui/material";
import { Container } from "@mui/material";
import { useRef, useState } from "react";
import { Base_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // Validate the form data
    if (!firstName || !lastName || !email || !password) {
      setError("Check submitted data!");
      return;
    }

    // Make the call to API to create the user
    const response = await fetch(`${Base_URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    if (!response.ok) {
      setError("Unable to register user, please try different credentials!");
      return;
    }

    const data = await response.json();
    const token = data.token;
    const isAdmin = data.isAdmin || false; // Default to false if not provided

    if (!token) {
      setError("Incorrect token");
      return;
    }

    // Pass email, token, and isAdmin to the login function
    login(email, token, isAdmin);
    navigate("/");
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h6">Register New Account</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            border: 1,
            borderColor: "#f5f5f5",
            p: 2,
          }}
        >
          <TextField
            inputRef={firstNameRef}
            label="First Name"
            name="firstName"
          />
          <TextField inputRef={lastNameRef} label="Last Name" name="lastName" />
          <TextField inputRef={emailRef} label="Email" name="email" />
          <TextField
            inputRef={passwordRef}
            type="password"
            label="Password"
            name="password"
          />
          <Button onClick={onSubmit} variant="contained">
            Register
          </Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Button onClick={redirectToLogin}>Login here</Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
