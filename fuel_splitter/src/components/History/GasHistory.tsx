import SingleHistory from "./SingleHistory";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import "../../Styles/history.scss";
import { useEffect } from "react";
import axios from "axios";
import { FuelBill } from "../../model";
import { historyActions } from "../../store/historySlice";

const GasHistory: React.FC = () => {
  const history = useAppSelector((state) => state.fuelHistory.history);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    try {
      const history = await axios.get("http://localhost:1212/history/get/");
      const trips: FuelBill[] = history.data.history;
      dispatch(historyActions.setHistory(trips));
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <section id="history">
      {history
        .map((bill, index) => (
          <SingleHistory bill={bill} key={index} tripNum={index + 1} />
        ))
        .sort((a, b) => Number(b.key) - Number(a.key))}
    </section>
  );
};

export default GasHistory;
