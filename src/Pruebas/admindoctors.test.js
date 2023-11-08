import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
describe('Admindoctors', () => {
  it('debería permitir cambiar el estado de los médicos', () => {
    render(
      <div>
        <table>
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Doctor Uno</td>
              <td>doctor1@example.com</td>
              <td>
                <select>
                  <option value="enRevisión">enRevisión</option>
                  <option value="aprobado">aprobado</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue('enRevisión');
    fireEvent.change(selectElement, { target: { value: 'aprobado' } });
    expect(selectElement).toHaveValue('aprobado');
  });
});
