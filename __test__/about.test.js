import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import About from '../pages/about';

test('click snackbar button and display snackbar', () => {
    const { getByText } = render(<About />);
    fireEvent.click(getByText("Open Success Snackbar"))
    expect(screen.getByRole('alert')).toHaveTextContent('This is a success message!')
  });