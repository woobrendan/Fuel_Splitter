import GasPay from "../TripManage/GasPay";
import { render, cleanup, fireEvent } from "@testing-library/react";
import React from "react";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<GasPay finalSubmit={"test"} />);
});
