import React from 'react';
import { render } from '@testing-library/react';
import UserRegister from '../Components/UserRegister/UserRegister';

test('Renderiza el componente UserRegister sin errores', () => {
  const formik = {
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    values: {},
    touched: {},
    errors: {},
  };

  const { getByText } = render(<UserRegister formik={formik} />);
  const createAccountButton = getByText('Crear cuenta');
  expect(createAccountButton).toBeInTheDocument();
});
