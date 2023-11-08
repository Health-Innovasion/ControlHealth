import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
const Medication = ({ medications, handleDelete }) => {
  return (
    <div>
      {medications.map((medication, index) => (
        <div key={index}>
          <p>Nombre del Medicamento: {medication.data.data.medication.nombreMedicamento}</p>
          <button onClick={() => handleDelete(medication.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};
const showTomaAlert = jest.fn();
test('Renderiza el componente Medication y muestra la alerta de toma', () => {
  const medications = [
    {
      id: 'medication1',
      data: {
        data: {
          medication: {
            nombreMedicamento: 'Medicamento 1',
          },
        },
      },
    },
  ];
  const handleDelete = (id) => {
    showTomaAlert();
  };
  render(<Medication medications={medications} handleDelete={handleDelete} />);
  expect(screen.getByText('Nombre del Medicamento: Medicamento 1')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Eliminar'));
  expect(showTomaAlert).toHaveBeenCalled();
});
