import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { LoginContainer, LoginForm, InputField, SubmitButton } from '../assets/styles/LoginPage.styles'; // Importar estilos

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    try {
      const response = await authService.login({ username: email, password });
      if (response.data.message === 'Login successful') {
        localStorage.setItem('auth', 'true'); // Establece el estado de autenticación
        navigate('/'); // Redirige a la página principal
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión');
    }
  };  

  return (
    <LoginContainer>
      <LoginForm component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
          Sign in
        </Typography>
        <InputField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton type="submit" fullWidth>
          Sign in
        </SubmitButton>
      </LoginForm>
    </LoginContainer>
  );
}

export default LoginPage;
