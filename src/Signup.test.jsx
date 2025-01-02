import React from "react";
import {render} from '@testing-library/react';
import Signup from "./Signup";
import { test } from "vitest";
import { MemoryRouter } from 'react-router-dom';

test('it renders without crashing', () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
)
});
