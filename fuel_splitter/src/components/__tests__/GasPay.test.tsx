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

    // expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Submit All");
  });

  it("should update cost per L value when typing", () => {
    const { getByTestId } = render(comp);

    const costPerL = getByTestId("costPerL") as HTMLInputElement;
    fireEvent.change(costPerL, { target: { value: 1.89 } });
    expect(costPerL.value).toBe("1.89");
  });

  it("should update total cost value when typing", () => {
    const { getByTestId } = render(comp);

    const gasCost = getByTestId("gasCost") as HTMLInputElement;
    fireEvent.change(gasCost, { target: { value: 50.12 } });
    expect(gasCost.value).toBe("50.12");
  });
});
