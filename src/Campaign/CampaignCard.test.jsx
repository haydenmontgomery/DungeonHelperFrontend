import React from "react";
import {render} from '@testing-library/react';
import CampaignCard from "./CampaignCard";
import { MemoryRouter } from 'react-router-dom';
import { test } from "vitest";

test('it renders without crashing', () => {
  render(
    <MemoryRouter>
      <CampaignCard />
    </MemoryRouter>
)
});
