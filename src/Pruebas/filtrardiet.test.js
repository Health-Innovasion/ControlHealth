import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Diet from '../Views/Diet/Diet';
import { DietData } from '../Utils/DietData'; 

test('Filtrar elementos por categoría en el componente Diet', () => {
  const { getByText, getByAltText, queryByAltText } = render(<Diet />);

  DietData.forEach((category) => {
    category.items.forEach((item) => {
      expect(getByAltText(item.name)).toBeInTheDocument();
    });
  });
  DietData.forEach((category) => {
    const categoriaButton = getByText(category.title);
    fireEvent.click(categoriaButton);
    DietData
      .filter((cat) => cat.id === category.id)
      .forEach((cat) => {
        cat.items.forEach((item) => {
          expect(getByAltText(item.name)).toBeInTheDocument();
        });
      });
    DietData
      .filter((cat) => cat.id !== category.id)
      .forEach((cat) => {
        cat.items.forEach((item) => {
          expect(queryByAltText(item.name)).toBeNull();
        });
      });
  });
});
