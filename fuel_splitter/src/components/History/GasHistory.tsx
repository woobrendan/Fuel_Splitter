import TravelList from "./Travel_Log/TravelList";
import { useAppSelector } from "../store/hooks";
// totalPrice: 0,
// totalKM: 0,
// costPerLitre: 0,
// Brendan: { totalKM: 0, totalTrips: 0, billPortion: 0 },
// Lory: { totalKM: 0, totalTrips: 0, billPortion: 0 },
// David: { totalKM: 0, totalTrips: 0, billPortion: 0 },
// Parco: { totalKM: 0, totalTrips: 0, billPortion: 0 },
// tripLogs: [],

const GasHistory: React.FC = () => {
  const history = useAppSelector((state) => state.fuelHistory);
  return (
    <section className="history">
      <TravelList />
    </section>
  );
};

export default GasHistory;
