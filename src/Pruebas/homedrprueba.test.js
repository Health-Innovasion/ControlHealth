import React from 'react';
import { render, screen } from '@testing-library/react';

test('Renderiza el componente HomeDr con datos simulados', () => {
  render(
    <div>
      <span>Citas</span>
      <span>Notificaciones</span>
      <span>Expedientes</span>
      <span>Cuenta</span>
      <img src="logo.png" alt="Logo" />
    </div>
  );

  // Verificamos que el componente HomeDr se renderice
  expect(screen.getByText('Citas')).toBeInTheDocument();
  expect(screen.getByText('Notificaciones')).toBeInTheDocument();
  expect(screen.getByText('Expedientes')).toBeInTheDocument();
  expect(screen.getByText('Cuenta')).toBeInTheDocument();
  expect(screen.getByAltText('Logo')).toBeInTheDocument();
});
