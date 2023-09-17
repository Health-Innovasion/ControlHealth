import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar la autenticación
    console.log(`Correo: ${email}, Contraseña: ${password}`);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: 'lightblue' }}>
      <Form className="p-5 border border-primary bg-white" onSubmit={handleSubmit}>
        <h2 className="text-primary mb-4">C&H</h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" placeholder="Ingrese correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>

        <Button variant="primary" type="submit">
          Continuar
        </Button>
        <p className="mt-3">
          ¿No estás registrado aún? <a href="/register">Regístrate</a>
        </p>
      </Form>
    </Container>
  );
};

export default Login;
