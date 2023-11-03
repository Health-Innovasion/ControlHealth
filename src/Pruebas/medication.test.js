import React from 'react';
import { render, screen } from '@testing-library/react';
import Medication from '../Components/Medication/Medication';

test('Renderiza el componente Medication sin errores', () => {
  const currentUser = { uid: 'user123' };
  const medications = [
    {
      id: 'medication1',
      data: {
        data: {
          medication: {
            nombreMedicamento: 'Medicamento 1',
            dosificacion: '10mg',
            unidades: 30,
            tomasDelDia: 2,
            fechadeinicio: '2023-11-03',
            hora: '08:00:00',
          },
        },
      },
    },
  ];

  jest.mock('react-redux', () => ({
    useSelector: (selector) => selector({ user: { currentUser } }),
  }));

  jest.mock('../../redux/action/action', () => ({
    getMedications: (uid, callback) => {
      callback(medications);
      return () => {}; // Unsubscribe function
    },
  }));
  

  const { getByText, queryByText } = render(<Medication />);
  
  // Verifica que el componente se renderice correctamente
  expect(getByText('Nombre del Medicamento:')).toBeInTheDocument();
  expect(getByText('Dosificación:')).toBeInTheDocument();
  expect(getByText('Unidades:')).toBeInTheDocument();
  expect(getByText('Tomas al Día:')).toBeInTheDocument();
  expect(getByText('Fecha de Inicio:')).toBeInTheDocument();
  expect(getByText('Hora:')).toBeInTheDocument();

  // Verifica que se muestre el botón "Borrar" para eliminar la medicación
  const deleteButton = screen.getByAltText('icon-delete');
  expect(deleteButton).toBeInTheDocument();

  // Verifica que no haya un mensaje de "No hay información de medicación disponible."
  expect(queryByText('No hay información de medicación disponible.')).toBeNull();
});
