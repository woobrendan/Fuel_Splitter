import SingleHistory from "./SingleHistory";
import { useAppSelector } from "../../store/hooks";

const temp = {
  totalPrice: 15.99,
  totalKM: 25,
  costPerLitre: 1.45,
  Brendan: { totalKM: 10, totalTrips: 1, billPortion: 0.4 },
  Lory: { totalKM: 10, totalTrips: 1, billPortion: 0.4 },
  David: { totalKM: 2.5, totalTrips: 1, billPortion: 0.1 },
  Parco: { totalKM: 2.5, totalTrips: 1, billPortion: 0.1 },
  tripLogs: [
    {
      isBrendanIn: true,
      isLoryIn: true,
      isDavidIn: false,
      isParcoIn: false,
      totalKM: 20,
      date: Date.now(),
    },
    {
      isBrendanIn: false,
      isLoryIn: false,
      isDavidIn: true,
      isParcoIn: true,
      totalKM: 5,
      date: Date.now(),
    },
  ],
};

const GasHistory: React.FC = () => {
  const history = useAppSelector((state) => state.fuelHistory.history);

  return (
    <section className="history">
      {history.map((bill, index) => (
        <SingleHistory bill={bill} key={index} />
      ))}
    </section>
  );
};

export default GasHistory;
