import React from "react";
import {render} from '@testing-library/react';
import LoadingSign from "./LoadingSign";
import { test } from "vitest";

test('it renders without crashing', () => {
  render(<LoadingSign />)
});
