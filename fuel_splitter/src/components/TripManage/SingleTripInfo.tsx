import NewTrip from "./New_trip/NewTrip";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import "../../Styles/tripinfo.scss";
import { TripInfo, GasBill, FuelBill } from "../../model";
import { fuelBillActions } from "../../store/GasTripSlice";
import TravelList from "../Travel_Log/TravelList";
import GasPay from "./GasPay";
import { historyActions } from "../../store/historySlice";
import { useNavigate } from "react-router";
import { addToHistory, addTripLog, resetTripLog } from "../../helperFunc";

const SingleTripInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const oneBill = useAppSelector((state) => state.fuelBill);

  const handleAdd = async (e: React.FormEvent, trip: TripInfo) => {
    e.preventDefault();
    dispatch(fuelBillActions.addNewTrip(trip));
    addTripLog(trip);
  };

  const finalSubmit = (gasBill: GasBill) => {
    const copy: FuelBill = {
      ...oneBill,
      totalPrice: gasBill.gasCost,
      costPerLitre: gasBill.costPerL,
    };

    dispatch(historyActions.addToHistory(copy));
    addToHistory(copy);

    //** reset trip Logs */
    dispatch(fuelBillActions.resetGasTrip());
    resetTripLog();

    navigate("/history");
  };

  return (
    <div id="single_trip__container">
      <section className="single_trip__tripInfo">
        <TravelList historyComp={false} />
        <NewTrip handleAdd={handleAdd} />
      </section>
      <GasPay finalSubmit={finalSubmit} />
    </div>
  );
};

export default SingleTripInfo;
