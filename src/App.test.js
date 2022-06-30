import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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

  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  });
  const submitButtonElement = screen.getByRole('button', {
    name: /submit/i,
  });

  expect(emailErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, 'tmddhks0104gmail.com');

  userEvent.click(submitButtonElement);

  const afterEmailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );

  expect(afterEmailErrorElement).toBeInTheDocument();
});

test('should show password error message on invaild password', () => {
  render(<App />);

  const passwordErrorElement = screen.queryByText(
    /The password you entered should contain 5 or more character./i
  );

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  });
  const submitButtonElement = screen.getByRole('button', {
    name: /submit/i,
  });
  expect(passwordErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, 'tmddhks0104@gmail.com');
  userEvent.click(submitButtonElement);

  const afterPasswordErrorElement = screen.queryByText(
    /The password you entered should contain 5 or more character./i
  );
  expect(afterPasswordErrorElement).toBeInTheDocument();
});
test('should show confirm password error message on invaild confirm password', () => {
  render(<App />);

  const confirmPasswordErrorElement = screen.queryByText(
      /The passwords don't match. Try again./i
  );

  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  });

  const passwordInputElement =
      screen.getByLabelText(/password/i);

  const confirmPasswordInputElement =
      screen.getByLabelText(/confirm password/i);

  const submitButtonElement = screen.getByRole('button', {
    name: /submit/i,
  });

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, 'tmddhks0104@gmail.com');
  userEvent.type(passwordInputElement, 'password1');
  userEvent.type(confirmPasswordInputElement, 'password');

  userEvent.click(submitButtonElement);

  const afterConfirmPasswordErrorElement = screen.queryByText(
      /The password you entered should contain 5 or more character./i
  );
  expect(afterConfirmPasswordErrorElement).toBeInTheDocument();
});