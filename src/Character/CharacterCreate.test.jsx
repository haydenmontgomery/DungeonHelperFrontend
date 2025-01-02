import React from "react";
import {render} from '@testing-library/react';
import CharacterCreate from "./CharacterCreate";
import { MemoryRouter } from 'react-router-dom';
import UserContext from "../UserContext";

import { test } from "vitest";

test('it renders without crashing', () => {
  const mockUser = {id: 222, username: 'test', firstName: "testFirst", lastName: "testLast", email: "testemail@gmail.com", isAdmin: false};
  render(
  <MemoryRouter>
    <UserContext.Provider value={{currentUser: mockUser}}>
      <CharacterCreate />
    </UserContext.Provider>
  </MemoryRouter>
  )
});
