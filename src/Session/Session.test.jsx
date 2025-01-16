import React from "react";
import {render} from '@testing-library/react';
import Session from "./Session";
import { test } from "vitest";

test('it renders without crashing', () => {
  render(<Session />)
});
