import React from 'react';
import { render } from '@testing-library/react';
import Diet from '../Views/Diet/Diet';

describe('Diet Component', () => {
  it('renders without crashing', () => {
    render(<Diet />);
  });

  it('displays the category buttons', () => {
    const { getByText } = render(<Diet />);
    
    expect(getByText('Mostrar Todos')).toBeInTheDocument();
  });

  it('displays item cards', () => {
    const { getAllByRole } = render(<Diet />);
    
    const itemCards = getAllByRole('button');
    expect(itemCards.length).toBeGreaterThan(0);
  });
});
