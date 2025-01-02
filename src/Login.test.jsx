import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import Login from "./Login";
import { expect, test, vi } from "vitest";
import { MemoryRouter } from 'react-router-dom';


test('it renders without crashing', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
)
});

test('calls loginUser with login credentials when form is submitted', () => {
  // Mock login
  const mockingLogin = vi.fn();

  render(
    <MemoryRouter>
      <Login loginUser={mockingLogin} />
    </MemoryRouter>
  );

  // Mimic typing
  fireEvent.change(screen.getByPlaceholderText("Username"), {
    target: { value: "testing" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "testing" },
  });

  // Simulate Submitting
  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  // Testing
  expect(mockingLogin).toHaveBeenCalledWith({ username: "testing", password: "testing" });
  expect(mockingLogin).toHaveBeenCalledTimes(1);
})