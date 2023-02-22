import SingleTripInfo from "../TripManage/SingleTripInfo";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "../../store/store";

describe(SingleTripInfo, () => {
  it("can click submit all button", () => {
    //need to fill other inputs?
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <Provider store={createStore()}>
        <SingleTripInfo />
      </Provider>,
    );

    //create new trip then proceed to test buttoin

    const button = getByTestId("submit_all");

    const costPerL = getByTestId("costPerL") as HTMLInputElement;
    fireEvent.change(costPerL, { target: { value: 1.89 } });

    const gasCost = getByTestId("gasCost") as HTMLInputElement;
    fireEvent.change(gasCost, { target: { value: 50.12 } });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
