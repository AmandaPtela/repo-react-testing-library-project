import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Teste a página Not Found', () => {
  const { container } = render(<NotFound />);
  const image = container.querySelector('.not-found-image');

  test('Verifica se página possui um H2 informando página não encontrada', () => {
    const textHeading = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(textHeading).toBeInTheDocument();
  });

  test('Testa presença do Emoji', () => {
    render(<NotFound />);
    const emoji = screen.getByLabelText('Crying emoji');
    expect(emoji).toBeInTheDocument();
  });

  test('Imagem Pikachu', () => {
    render(<NotFound />);
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
