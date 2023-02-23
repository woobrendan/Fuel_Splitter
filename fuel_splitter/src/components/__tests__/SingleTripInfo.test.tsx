import SingleTripInfo from "../TripManage/SingleTripInfo";
import {
  render,
  fireEvent,
  screen,
  Matcher,
  MatcherOptions,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "../../store/store";
import { Trip, trips, checkEachName } from "./model_functions";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

describe(SingleTripInfo, () => {
  it("can click submit all button", () => {
    //need to fill other inputs?
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <Provider store={createStore()}>
        <Router>
          <SingleTripInfo />
        </Router>
      </Provider>,
    );

    //create new trip then proceed to test buttoin
    checkEachName(trips[0], getByTestId);
    fireEvent.click(getByTestId("submit_trip"));

    //** Add trip data into Gas Pay component */
    const costPerL = getByTestId("costPerL") as HTMLInputElement;
    fireEvent.change(costPerL, { target: { value: 1.89 } });

    const gasCost = getByTestId("gasCost") as HTMLInputElement;
    fireEvent.change(gasCost, { target: { value: 50.12 } });

    fireEvent.click(getByTestId("submit_all"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
