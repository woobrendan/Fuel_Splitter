import NewTrip from "./NewTrip";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import "../Styles/tripinfo.scss";
import { TripInfo, GasBill } from "../model";
import { fuelBillActions } from "../store/GasTripSlice";
import TravelList from "./Travel_Log/TravelList";
import GasPay from "./GasPay";
import { historyActions } from "../store/historySlice";
import { useNavigate } from "react-router";

const SingleTripInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const oneBill = useAppSelector((state) => state.fuelBill);

  const handleAdd = (e: React.FormEvent, trip: TripInfo) => {
    e.preventDefault();
    dispatch(fuelBillActions.addNewTrip(trip));
  };

  const finalSubmit = (e: React.FormEvent, gasBill: GasBill) => {
    e.preventDefault();
    dispatch(fuelBillActions.addGasBill(gasBill));
    dispatch(historyActions.addToHistory(oneBill));
    dispatch(fuelBillActions.resetGasTrip());
    navigate("/history");
  };

  return (
    <div id="single_trip__container">
      <section className="single_trip__tripInfo">
        <TravelList />
        <NewTrip handleAdd={handleAdd} />
      </section>
      <GasPay finalSubmit={finalSubmit} />
    </div>
  );
};

export default SingleTripInfo;
