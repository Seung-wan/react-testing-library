import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('inputs should be initially empty', () => {
  render(<App />);

  const emailInputElement = screen.getByRole('textbox');
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  expect(emailInputElement.value).toBe('');
  expect(passwordInputElement.value).toBe('');
  expect(confirmPasswordInputElement.value).toBe('');
});

test('should be able to type an email', () => {
  render(<App />);

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  });

  userEvent.type(emailInputElement, 'tmddhks0104@gmail.com');

  expect(emailInputElement.value).toBe('tmddhks0104@gmail.com');
});

test('should be able to type an password', () => {
  render(<App />);

  const passwordInputElement = screen.getByLabelText('Password');

  userEvent.type(passwordInputElement, '123456');

  expect(passwordInputElement.value).toBe('123456');
});
test('should be able to type an confirm password', () => {
  render(<App />);

  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  userEvent.type(confirmPasswordInputElement, '123456');

  expect(confirmPasswordInputElement.value).toBe('123456');
});

test('should show email error message on invalid email', () => {
  render(<App />);

  const emailErrorElement = screen.getByText(/the email you input is invalid/i);

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  });
  const submitButtonElement = screen.getByRole('button', {
    name: /submit/i,
  });

  expect(emailErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, 'tmddhks0104gmail.com');

  userEvent.click(submitButtonElement);

  expect(emailErrorElement).toBeInTheDocument();
});
