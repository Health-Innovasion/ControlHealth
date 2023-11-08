import React from 'react';
import { render } from '@testing-library/react';
test('Renderiza el formulario de registro de usuario médico con campo de carga de código minsa', () => {
  const { getByText, getByPlaceholderText, getByLabelText } = render(
    <form>
      <label htmlFor="username">Nombre de usuario</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Nombre de usuario"
      />
      <br />
      <label htmlFor="email">Correo electrónico</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Correo electrónico"
      />
      <br />
      <label htmlFor="password">Contraseña</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Contraseña"
      />
      <br />
      <label htmlFor="confirmPassword">Confirmar contraseña</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirmar contraseña"
      />
      <br />
      <label htmlFor="codeMinsa">Cargar código minsa</label>
      <input
        type="file"
        id="codeMinsa"
        name="codeMinsa"
      />
      <br />
      <button type="submit">Crear cuenta</button>
    </form>
  );
  const createAccountButton = getByText('Crear cuenta');
  const usernameInput = getByPlaceholderText('Nombre de usuario');
  const emailInput = getByPlaceholderText('Correo electrónico');
  const passwordInput = getByPlaceholderText('Contraseña');
  const confirmPasswordInput = getByPlaceholderText('Confirmar contraseña');
  const codeMinsaInput = getByLabelText('Cargar código minsa');
  +expect(createAccountButton).toBeInTheDocument();
  expect(usernameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(confirmPasswordInput).toBeInTheDocument();
  expect(codeMinsaInput).toBeInTheDocument();
});
