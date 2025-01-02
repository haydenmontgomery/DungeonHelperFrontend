import React from "react";
import {render} from '@testing-library/react';
import CampaignDetails from "./CampaignDetails";
import { test } from "vitest";

test('it renders without crashing', () => {
  render(<CampaignDetails />)
});
