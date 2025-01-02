import React from "react";
import {render} from '@testing-library/react';
import CharacterCard from "./CharacterCard";
import { test } from "vitest";

test('it renders without crashing', () => {
  render(<CharacterCard />)
});
