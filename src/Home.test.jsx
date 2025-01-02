import React from "react";
import {render} from '@testing-library/react';
import Home from "./Home";
import UserContext from "./UserContext";

import { test } from "vitest";

test('it renders without crashing', () => {
  const mockUser = {id: 222, username: 'test', firstName: "testFirst", lastName: "testLast", email: "testemail@gmail.com", isAdmin: false};
  render(
    <UserContext.Provider value={{currentUser: mockUser}}>
      <Home />
    </UserContext.Provider>
  );
});
