import NewTrip from "../TripManage/New_trip/NewTrip";
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

describe(NewTrip, () => {});
