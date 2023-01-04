import NewTrip from "./NewTrip";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import "../Styles/tripinfo.scss";
import { TripInfo } from "../model";
import { fuelBillActions } from "../store/GasTripSlice";

const SingleTripInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleAdd = (e: React.FormEvent, trip: TripInfo) => {
    e.preventDefault();
    //dispatch gas trip action
    dispatch(fuelBillActions.addNewTrip(trip));
  };

  const oneBill = useAppSelector((state) => state.fuelBill);
  console.log("oneTrip", oneBill);

  return (
    <>
      <NewTrip handleAdd={handleAdd} />
    </>
  );
};

export default SingleTripInfo;
