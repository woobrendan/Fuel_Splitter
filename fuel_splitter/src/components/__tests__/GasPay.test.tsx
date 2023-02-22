import GasPay from "../TripManage/GasPay";
import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import { GasBill, FuelBill } from "../../model";
import { Provider } from "react-redux";
import { createStore } from "../../store/store";

const testSubmit = (gasBill: GasBill) => {
  const copy: FuelBill = {
    totalKM: 24,
    brendan: { name: "Brendan", totalKM: 10, totalTrips: 1, billPortion: 0.4 },
    lory: {
      name: "Lory",
      totalKM: 10,
      totalTrips: 1,
      billPortion: 0.4,
    },
    david: { name: "David", totalKM: 2.5, totalTrips: 1, billPortion: 0.1 },
    parco: { name: "Parco", totalKM: 2.5, totalTrips: 1, billPortion: 0.1 },
    tripLogs: [
      {
        isBrendanIn: true,
        isLoryIn: true,
        isDavidIn: false,
        isParcoIn: false,
        totalKM: 20,
        date: new Date(),
        description: "Groceries",
      },
      {
        isBrendanIn: false,
        isLoryIn: false,
        isDavidIn: true,
        isParcoIn: true,
        totalKM: 14,
        date: new Date(),
        description: "Gym",
      },
    ],
    totalPrice: gasBill.gasCost,
    costPerLitre: gasBill.costPerL,
  };

  return copy;
  // dispatch(historyActions.addToHistory(copy));
  // addToHistory(copy);

  // //** reset trip Logs */
  // dispatch(fuelBillActions.resetGasTrip());
  // resetTripLog();

  // navigate("/history");
};

const comp = (
  <Provider store={createStore()}>
    <GasPay finalSubmit={testSubmit} />
  </Provider>
);

describe(GasPay, () => {
  it("Submit button to have text 'submit all'", () => {
    const { getByTestId } = render(comp);

    const button = getByTestId("submit_all");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Submit All");
  });

  it("should update the input value when typing", () => {
    const { getByTestId } = render(comp);

    const costPerL = getByTestId("costPerL") as HTMLInputElement;
    fireEvent.change(costPerL, { target: { value: 1.89 } });
    expect(costPerL.value).toBe("1.89");
  });

  it("can click submit all button", () => {
    //need to fill other inputs?
    const handleClick = jest.fn();
    const { getByTestId } = render(comp);

    const button = getByTestId("submit_all");

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
