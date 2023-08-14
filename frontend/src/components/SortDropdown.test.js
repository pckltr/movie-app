import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import SortDropdown from "./SortDropdown";

describe("SortDropdown", () => {
  const sortingOptions = [
    { value: "none", label: "None" },
    { value: "title-asc", label: "Title (Ascending)" },
    { value: "title-desc", label: "Title (Descending)" },
  ];

  it("renders the SortDropdown component", () => {
    render(
      <SortDropdown
        sorting="none"
        setSorting={() => {}}
        sortingOptions={sortingOptions}
      />
    );
    const dropdownLabel = screen.getByLabelText("Sort by:");
    expect(dropdownLabel).toBeInTheDocument();
  });

  it("changes sorting value when an option is selected", async () => {
    const option = {
      value: "title-desc",
      text: "Title (Descending)",
    };

    const setSorting = jest.fn();

    render(
      <SortDropdown
        sorting="none"
        setSorting={setSorting}
        sortingOptions={sortingOptions}
      />
    );

    const button = screen.getByRole("button");

    fireEvent.mouseDown(button);

    const listbox = within(screen.getByRole("listbox"));

    const item = listbox.getByText(option.text);

    fireEvent.click(item);

    const selectedOption = screen.queryByText(option.text);
    debugger;
    expect(selectedOption).not.toBeNull();
  });
});
