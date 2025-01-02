import React from "react";
import {render} from '@testing-library/react';
import ParchmentEfect from "./ParchmentEfect";
import { test } from "vitest";

test('it renders without crashing', () => {
  render(<ParchmentEfect />)
});
