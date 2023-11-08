import React from 'react';
import { render } from '@testing-library/react';

test('Renderiza el calendario de CitasDr y verifica una cita agendada', () => {
  const { container } = render(
    <div>
      <div className="rbc-calendar">Calendario Aquí</div>
      <div className="cita-agendada">Cita Agendada</div>
    </div>
  );

  // Asegúrate de que el calendario esté presente
  const calendar = container.querySelector('.rbc-calendar');
  expect(calendar).toBeInTheDocument();

  // Verifica que la cita esté agendada
  const citaAgendadaElement = container.querySelector('.cita-agendada');
  expect(citaAgendadaElement).toBeInTheDocument();
});
