import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import About from '../pages/about';

test('click snackbar button and display snackbar', () => {
    const { getByText } = render(<About />);
    fireEvent.click(getByText("Open Success Snackbar"))
    expect(screen.getByRole('alert')).toHaveTextContent('This is a success message!')
});

// 

// 
test('click snackbar button and display snackbar, then close the snackbar', async () => {
    const { getByText } = render(<About />);
    fireEvent.click(getByText("Open Success Snackbar"))
    await waitFor(() => screen.getByRole('alert'))
    fireEvent.click(screen.getByRole("button", {name: 'Close'}))
    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeNull()
    })
});