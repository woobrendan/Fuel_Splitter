import SingleHistory from "./SingleHistory";
import { useAppSelector } from "../../store/hooks";
import { FuelBill } from "../../model";

const temp: FuelBill = {
  totalPrice: 15.99,
  totalKM: 25,
  costPerLitre: 1.45,
  brendan: { name: "Brendan", totalKM: 10, totalTrips: 1, billPortion: 0.4 },
  lory: {
    name: "Lory",
    totalKM: 10,
    totalTrips: 1,
    billPortion: 0.4,
  },
  david: { name: "David", totalKM: 2.5, totalTrips: 1, billPortion: 0.1 },
  parco: { name: "Parco", totalKM: 2.5, totalTrips: 1, billPortion: 0.1 },
  tripLogs: [
    {
      isBrendanIn: true,
      isLoryIn: true,
      isDavidIn: false,
      isParcoIn: false,
      totalKM: 20,
      date: new Date(),
    },
    {
      isBrendanIn: false,
      isLoryIn: false,
      isDavidIn: true,
      isParcoIn: true,
      totalKM: 5,
      date: new Date(),
    },
  ],
};

const GasHistory: React.FC = () => {
  const history = useAppSelector((state) => state.fuelHistory.history);

  return (
    <section id="history">
      {/* {history.map((bill, index) => (
        <SingleHistory bill={bill} key={index} />
      ))} */}
      <SingleHistory bill={temp} />
    </section>
  );
};

export default GasHistory;
