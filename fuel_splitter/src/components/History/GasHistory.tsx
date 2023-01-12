import SingleHistory from "./SingleHistory";
import { useAppSelector } from "../../store/hooks";
import "../../Styles/history.scss";
import { tempHistory } from "../../temp";

const GasHistory: React.FC = () => {
  const history = useAppSelector((state) => state.fuelHistory.history);

  return (
    <section id="history">
      {tempHistory
        .map((bill, index) => (
          <SingleHistory bill={bill} key={index} tripNum={index + 1} />
        ))
        .sort((a, b) => Number(b.key) - Number(a.key))}
    </section>
  );
};

export default GasHistory;
