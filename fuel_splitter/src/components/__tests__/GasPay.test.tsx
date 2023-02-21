import GasPay from "../TripManage/GasPay";
import { render, cleanup, fireEvent } from "@testing-library/react";
import React from "react";

describe(GasPay, () => {
  it("renders without crashing", () => {
    render(<GasPay finalSubmit={"test"} />);
    expect(screen.getByText("Cost Per L:")).toBeInTheDocument;
  });
});
