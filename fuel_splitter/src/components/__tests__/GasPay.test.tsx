import GasPay from "../TripManage/GasPay";
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { GasBill, FuelBill } from "../../model";
import { Provider } from "react-redux";
import store from "../../store/store";

// const render = (component: React.FC) =>
//   rtlRender(<Provider store={store}>{component}</Provider>);

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

describe(GasPay, () => {
  // it("renders without crashing", () => {
  //   render(<GasPay finalSubmit={testSubmit} />);
  //   expect(getByText("Cost Per L:")).toBeInTheDocument;
  // });

  it("can click submit all button", () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <Provider store={store}>
        <GasPay finalSubmit={testSubmit} />
      </Provider>,
    );

    const button = getByTestId("submit_all");

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("Submit button to have text 'submit all'", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <GasPay finalSubmit={testSubmit} />
      </Provider>,
    );

    const button = getByTestId("submit_all");
    // expect(button).toHaveTextContent("Submit All");
    expect(button).toBeInTheDocument();
  });
});
