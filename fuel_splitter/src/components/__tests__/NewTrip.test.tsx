import NewTrip from "../TripManage/New_trip/NewTrip";
import TripCheckbox from "../TripManage/New_trip/TripCheckbox";
import { render, fireEvent, screen } from "@testing-library/react";
import { GasBill, FuelBill } from "../../model";
import { Provider } from "react-redux";
import { createStore } from "../../store/store";
import { Trip, trips, checkEachName } from "./model_functions";

// const comp = (
//   <Provider store={createStore()}>
//     <NewTrip handleAdd={handleAdd} />
//   </Provider>
// );

describe(NewTrip, () => {
  it("Should toggle checkbox", () => {
    const handleClick = jest.fn();
    const name = { name: "Brendan", value: false };
    const { getByTestId } = render(
      <TripCheckbox nameVal={name} onCheck={handleClick} />,
    );

    const checkbox = getByTestId("checkbox_Brendan");
    fireEvent.click(checkbox);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("Should be able to toggle all check boxes", () => {
    const name = { name: "Brendan", value: false };
    const handleAdd = jest.fn();

    trips[1].names.forEach((name) => {
      const val = { name, value: true };
      const { getByTestId } = render(
        <TripCheckbox nameVal={val} onCheck={handleAdd} />,
      );
      fireEvent.click(getByTestId(`checkbox_${name}`));
    });

    expect(handleAdd).toHaveBeenCalledTimes(4);
  });

  it("Should be able to uncheckboxes", () => {});

  it.skip("Should check box and have truthy value", () => {
    const handleClick = jest.fn();
    const name = { name: "Brendan", value: false };
    const { getByTestId } = render(
      <TripCheckbox nameVal={name} onCheck={handleClick} />,
    );

    const checkbox = getByTestId("checkbox_Brendan");
    // const child = checkbox.querySelector("input");

    fireEvent.click(checkbox);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(getByTestId("checkbox_Brendan")).toHaveClass("Mui-checked");
  });
});
