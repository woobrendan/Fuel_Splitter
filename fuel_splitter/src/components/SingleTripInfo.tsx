import NewTrip from "./NewTrip";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import "../Styles/tripinfo.scss";
import { TripInfo, GasBill } from "../model";
import { fuelBillActions } from "../store/GasTripSlice";
import TravelList from "./Travel_Log/TravelList";
import GasPay from "./TripManage/GasPay";
import { historyActions } from "../store/historySlice";
import { useNavigate } from "react-router";
import { resetTripLog } from "../helperFunc";

const SingleTripInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const oneBill = useAppSelector((state) => state.fuelBill);

  const handleAdd = async (e: React.FormEvent, trip: TripInfo) => {
    e.preventDefault();
    dispatch(fuelBillActions.addNewTrip(trip));
    try {
      const data = await fetch("http://localhost:1212/trips/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trip),
      });

      return data.json;
    } catch (error) {
      console.log("Error posting trip");
    }
  };

  const finalSubmit = (gasBill: GasBill) => {
    const { gasCost, costPerL } = gasBill;
    const copy = { ...oneBill, totalPrice: gasCost, costPerLitre: costPerL };
    dispatch(fuelBillActions.addGasBill(gasBill));
    dispatch(historyActions.addToHistory(copy));

    //** reset trip Logs */
    dispatch(fuelBillActions.resetGasTrip());
    resetTripLog();

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
