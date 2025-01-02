import React from "react";
import {render} from '@testing-library/react';
import CampaignJoin from "./CampaignJoin";
import { test } from "vitest";
import { MemoryRouter } from 'react-router-dom';
import UserContext from "../UserContext";

test('it renders without crashing', () => {
  const mockUser = {id: 222, username: 'test', firstName: "testFirst", lastName: "testLast", email: "testemail@gmail.com", isAdmin: false};
  render(
    <MemoryRouter>
      <UserContext.Provider value={{currentUser: mockUser}}>
        <CampaignJoin />
      </UserContext.Provider>
    </MemoryRouter>
)
});
