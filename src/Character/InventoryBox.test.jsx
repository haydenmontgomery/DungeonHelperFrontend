import React from "react";
import {render, screen, fireEvent} from '@testing-library/react';
import InventoryBox from "./InventoryBox";
import { expect, test, vi } from "vitest";

test('it renders without crashing', () => {
  const mockOnClose = vi.fn();
  const mockHandleAdd = vi.fn();
  const categories = [
    {
      index: "first-cat",
      name: "Category1"
    },
    {
      index: "second-cat",
      name: "Category2"
    },
  ]
  render(<InventoryBox onClose={mockOnClose} handleAdd={mockHandleAdd} categories={categories}/>);
});

test('it mocks adding and closing', () => {
  const mockOnClose = vi.fn();
  const mockHandleAdd = vi.fn();
  const categories = [
    {
      index: "first-cat",
      name: "Category1"
    },
    {
      index: "second-cat",
      name: "Category2"
    },
  ]

  render(<InventoryBox onClose={mockOnClose} handleAdd={mockHandleAdd} categories={categories}/>);

  fireEvent.click(screen.getByRole("button", { name: /add item/i }));
  expect(mockHandleAdd).toHaveBeenCalledTimes(1);

  fireEvent.click(screen.getByRole("button", { name: /close/i }));

  expect(mockOnClose).toHaveBeenCalledTimes(1);
});
