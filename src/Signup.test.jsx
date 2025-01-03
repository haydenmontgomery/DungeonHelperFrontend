import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import Signup from "./Signup";
import { expect, test, vi } from "vitest";
import { MemoryRouter } from 'react-router-dom';


test('it renders without crashing', () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
)
});

test('calls signupUser with credentials when form is submitted', () => {
  // Mock login
  const mockingSignup = vi.fn();

  render(
    <MemoryRouter>
      <Signup signupUser={mockingSignup} />
    </MemoryRouter>
  );

  // Mimic typing
  fireEvent.change(screen.getByPlaceholderText("Username"), {
    target: { value: "testing" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "testing" },
  });
  fireEvent.change(screen.getByPlaceholderText("First Name"), {
    target: { value: "First Test" },
  });
  fireEvent.change(screen.getByPlaceholderText("Last Name"), {
    target: { value: "Last Test" },
  });
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "testemail@gmail.com" },
  });

  // Simulate Submitting
  fireEvent.click(screen.getByRole("button", { name: /signup/i }));

  // Testing
  expect(mockingSignup).toHaveBeenCalledWith({ username: "testing", password: "testing", firstName: "First Test", lastName: "Last Test", email: "testemail@gmail.com" });
  expect(mockingSignup).toHaveBeenCalledTimes(1);
})