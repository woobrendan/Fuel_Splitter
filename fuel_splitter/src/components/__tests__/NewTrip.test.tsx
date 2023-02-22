import NewTrip from "../TripManage/New_trip/NewTrip";
import TripCheckbox from "../TripManage/New_trip/TripCheckbox";
import { render, fireEvent, screen } from "@testing-library/react";
import { GasBill, FuelBill } from "../../model";
import { Provider } from "react-redux";
import { createStore } from "../../store/store";

const handleAdd = jest.fn();
const comp = (
  <Provider store={createStore()}>
    <NewTrip handleAdd={handleAdd} />
  </Provider>
);

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
});
