import React from 'react';
import { render, screen } from '@testing-library/react';
import Quote from '../Components/Quotes/Quote';

test('Renderiza el componente Quote con datos en las cards', () => {
  const citas = [
    {
      id: 1,
      data: {
        data: {
          cita: {
            doctor: {
              userName: 'Dr. Smith',
            },
            status: 'approved',
            date: '2023-11-05',
            time: '03:30 PM',
          },
        },
      },
    },
  ];
  render(<Quote />);
  
  setTimeout(() => {
    citas.forEach((cita) => {

      const doctorName = screen.getByText(`Doctor: ${cita.data.data.cita.doctor.userName}`);
      const status = screen.getByText(`Estado: ${cita.data.data.cita.status}`);
      const date = screen.getByText(`Fecha: ${cita.data.data.cita.date}`);
      const time = screen.getByText(`Hora: ${cita.data.data.cita.time}`);
      expect(doctorName).toBeInTheDocument();
      expect(status).toBeInTheDocument();
      expect(date).toBeInTheDocument();
      expect(time).toBeInTheDocument();
    });
  }, 1000);
});
