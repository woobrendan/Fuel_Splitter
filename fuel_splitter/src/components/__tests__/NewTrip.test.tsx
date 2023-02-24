import NewTrip from "../TripManage/New_trip/NewTrip";
import TripCheckbox from "../TripManage/New_trip/TripCheckbox";
import DatePicker from "../TripManage/DatePicker";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "../../store/store";
import { Trip, trips, checkEachName } from "./model_functions";
import { getToday } from "../../helperFunc";

const newTrip = () => {
  const handleAdd = jest.fn();
  return (
    <Provider store={createStore()}>
      <NewTrip handleAdd={handleAdd} />
    </Provider>
  );
};

describe(NewTrip, () => {
  //** CheckBoxes */
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

  //** Date Picker */

  it("Should start with todays date", () => {
    const today = getToday();
    const handleChange = jest.fn();

    const { getByTestId } = render(<DatePicker getDate={handleChange} />);
    const datePicker = getByTestId("date_picker").querySelector("input");

    expect(datePicker).toHaveValue(today);
  });

  it("Should start with update date picker with new value", () => {
    const handleChange = jest.fn();
    const dateVal = "03-15-2023";

    const { getByTestId } = render(<DatePicker getDate={handleChange} />);
    const datePicker = getByTestId("date_picker").querySelector(
      "input",
    ) as HTMLElement;

    fireEvent.change(datePicker, { target: { value: dateVal } });

    expect(datePicker).toHaveValue(dateVal);
  });

  //** New Trip Input */
  it("Should start with total KM at 0 and no description", () => {
    const { getByTestId } = render(newTrip());

    const totalKM = getByTestId("totalKM");
    const tripDescription = getByTestId("description");

    expect(totalKM).toHaveValue("0");
    expect(tripDescription).toHaveValue("");
  });

  it("Should accepts strings in both inputs", () => {
    const { getByTestId } = render(newTrip());
    const kmVal = trips[0].km;
    const description = trips[0].description;

    const totalKM = getByTestId("totalKM");
    const tripDescription = getByTestId("description");

    fireEvent.change(totalKM, { target: { value: kmVal } });
    fireEvent.change(tripDescription, { target: { value: description } });

    expect(totalKM).toHaveValue("25");
    expect(tripDescription).toHaveValue("Airport");
  });
});
