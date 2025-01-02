import React from "react";
import {fireEvent, screen, render} from '@testing-library/react';
import NavBar from "./NavBar";
import UserContext from "./UserContext";
import { MemoryRouter } from 'react-router-dom';
import { test, vi } from "vitest";

test('it renders without crashing', () => {
  const mockUser = {id: 222, username: 'test', firstName: "testFirst", lastName: "testLast", email: "testemail@gmail.com", isAdmin: false};
  const mockingLogout = vi.fn();

  render(
    <MemoryRouter>
      <UserContext.Provider value={{currentUser: mockUser}}>
        <NavBar logout={mockingLogout} />
      </UserContext.Provider>
    </MemoryRouter>
  );
});

test('tests logout function being called', () => {
  const mockUser = {id: 222, username: 'test', firstName: "testFirst", lastName: "testLast", email: "testemail@gmail.com", isAdmin: false};
  const mockingLogout = vi.fn();

  render(
    <MemoryRouter>
      <UserContext.Provider value={{currentUser: mockUser}}>
        <NavBar logout={mockingLogout} />
      </UserContext.Provider>
    </MemoryRouter>
  );

  // Simulate logout;
  fireEvent.click(screen.getByRole("link", { name: /logout .*?/i }));
  expect(mockingLogout).toHaveBeenCalledTimes(1);
})