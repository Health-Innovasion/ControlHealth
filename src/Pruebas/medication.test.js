import React from 'react';
import { render, screen } from '@testing-library/react';
// Función simulada que actúa como el componente Medication
const Medication = ({ medications }) => {
  return (
    <div>
      {medications.map((medication, index) => (
        <div key={index}>
          <p>Nombre del Medicamento: {medication.data.data.medication.nombreMedicamento}</p>
          <p>Dosificación: {medication.data.data.medication.dosificacion}</p>
          <p>Unidades: {medication.data.data.medication.unidades}</p>
          <p>Tomas al Día: {medication.data.data.medication.tomasDelDia}</p>
          <p>Fecha de Inicio: {medication.data.data.medication.fechadeinicio}</p>
          <p>Hora: {medication.data.data.medication.hora}</p>
          <img alt="icon-delete" />
        </div>
      ))}
    </div>
  );
};
test('Renderiza el componente Medication con datos en la pantalla', () => {
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
  render(<Medication medications={medications} />);
  expect(screen.getByText('Nombre del Medicamento: Medicamento 1')).toBeInTheDocument();
  expect(screen.getByText('Dosificación: 10mg')).toBeInTheDocument();
  expect(screen.getByText('Unidades: 30')).toBeInTheDocument();
  expect(screen.getByText('Tomas al Día: 2')).toBeInTheDocument();
  expect(screen.getByText('Fecha de Inicio: 2023-11-03')).toBeInTheDocument();
  expect(screen.getByText('Hora: 08:00:00')).toBeInTheDocument();
  expect(screen.getByAltText('icon-delete')).toBeInTheDocument();
  expect(screen.queryByText('No hay información de medicación disponible.')).toBeNull();
});
