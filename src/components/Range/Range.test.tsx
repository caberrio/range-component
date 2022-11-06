import React from "react";
import Range from "./Range";
import { render, screen } from "@testing-library/react";

const args = { range: { min: 1, max: 500 } };
const renderComponent = (isEditable = false) =>
  render(<Range {...args} isEditable={isEditable} />);

describe("Test Range component", () => {
  it("renders correctly", () => {
    const { baseElement } = renderComponent();
    expect(baseElement).toBeTruthy();
  });
  it("should render the component and show the range passed", () => {
    renderComponent();
    expect(screen.queryByText(/1/i)).toBeTruthy();
    expect(screen.queryByText(/500/i)).toBeTruthy();
  });

  it("should have a contentEditable label when is editable", () => {
    renderComponent(true);
    const label = screen.getByTestId("label-left");
    expect(label).toHaveAttribute("contentEditable", "true");
  });
});
