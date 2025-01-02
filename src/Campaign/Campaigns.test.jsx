import React from "react";
import {render} from '@testing-library/react';
import Campaigns from "./Campaigns";
import { test } from "vitest";

test('it renders without crashing', () => {
  render(<Campaigns />)
});
