import NewTrip from "./New_trip/NewTrip";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import "../../Styles/tripinfo.scss";
import { GasBill, FuelBill } from "../../model";
import { TripInfo } from "../../Models/tripModels";
import { fuelBillActions } from "../../store/GasTripSlice";
import TravelList from "../Travel_Log/TravelList";
import GasPay from "./GasPay";
import { historyActions } from "../../store/historySlice";
import { useNavigate } from "react-router";
import { addToHistory } from "../../helperFunc";
import { resetTripLog, addTripLog } from "../../tripActions";

const SingleTripInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const oneBill = useAppSelector((state) => state.fuelBill);

  const handleAdd = async (e: React.FormEvent, trip: TripInfo) => {
    e.preventDefault();
    const mongoTrip = await addTripLog(trip);
    dispatch(fuelBillActions.addNewTrip(mongoTrip));
  };

  const finalSubmit = async (gasBill: GasBill) => {
    const copy: FuelBill = {
      ...oneBill,
      totalPrice: gasBill.gasCost,
      costPerLitre: gasBill.costPerL,
    };

    const mongoHistory = await addToHistory(copy);
    dispatch(historyActions.addToHistory(mongoHistory));

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
