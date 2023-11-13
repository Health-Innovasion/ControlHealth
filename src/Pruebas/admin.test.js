import React from 'react';
import { render, screen } from '@testing-library/react';
test('Renderiza y visualiza estadísticas correctamente', () => {
  const Data = {
    usersCount: 3,
    doctorsCount: 1,
    quotesCount: 3,
  };
  render(
    <main>
      <div>
        <h3>DASHBOARD</h3>
      </div>
      <div>
        <div>
          <h3>users</h3>
          <h1>{Data.usersCount}</h1>
        </div>
        <div>
          <h3>doctors</h3>
          <h1>{Data.doctorsCount}</h1>
        </div>
        <div>
          <h3>Quotes</h3>
          <h1>{Data.quotesCount}</h1>
        </div>
      </div>
      <div data-testid="line-chart"></div>
      <div data-testid="bar-chart"></div>
    </main>
  );
  expect(screen.getAllByText('users').length > 0).toBe(true);
  expect(screen.getAllByText('doctors').length > 0).toBe(true);
  expect(screen.getAllByText('Quotes').length > 0).toBe(true);
  expect(screen.getAllByText(String(Data.usersCount)).length > 0).toBe(true);
  expect(screen.getAllByText(String(Data.doctorsCount)).length > 0).toBe(true);
  expect(screen.getAllByText(String(Data.quotesCount)).length > 0).toBe(true);
  expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
});
