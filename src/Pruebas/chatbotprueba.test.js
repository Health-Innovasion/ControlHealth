import React, { useState } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
test('Muestra y oculta el chatbot al hacer clic en el botón', () => {
  const Chatbot = () => {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <button onClick={() => setVisible(!visible)}>Botón del chatbot</button>
        {visible && <div data-testid="chatbot">Chatbot Aquí</div>}
      </>
    );
  };
  render(<Chatbot />);
  expect(screen.queryByTestId('chatbot')).toBeNull();
  const botButton = screen.getByText('Botón del chatbot');
  fireEvent.click(botButton);
  expect(screen.getByTestId('chatbot')).toBeInTheDocument();
  fireEvent.click(botButton);
  expect(screen.queryByTestId('chatbot')).toBeNull();
});
