import React from "react";
import {render} from '@testing-library/react';
import SearchForm from "./SearchForm";
import { test } from "vitest";

test('it renders without crashing', () => {
  render(<SearchForm />)
});
