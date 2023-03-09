import { FuelBill } from "../../model";
import TravelList from "../Travel_Log/TravelList";
import TotalBreakdown from "./TotalBreakdown";
import IndivBreakDown from "./IndivBreakDown";
import { useState } from "react";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import { historyActions } from "../../store/historySlice";
import axios from "axios";

interface Props {
  bill: FuelBill;
  tripNum: number;
}

const SingleHistory: React.FC<Props> = ({ bill, tripNum }) => {
  const [toBeDeleted, setToBeDeleted] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = (val: FuelBill) => {
    dispatch(historyActions.removeFromHistory(val));
    axios.delete(`http://localhost:1212/trips/history/${val._id}`);
  };

  return (
    <section className="history__single">
      <Button
        variant="outlined"
        color="error"
        className="history_delete"
        data-testid="modal_delete"
        onClick={() => setToBeDeleted(!toBeDeleted)}
      >
        {toBeDeleted ? "Cancel" : "Delete Trip"}
      </Button>
      <h2>Trip Summary #{tripNum}</h2>
      {toBeDeleted && (
        <Button
          variant="contained"
          color="error"
          className="history_delete_confirm"
          data-testid="history_delete_confirm"
          onClick={() => {}}
        >
          Confirm Delete
        </Button>
      )}
      <div className="history__single__summary">
        <div className="history__single__breakdown">
          <IndivBreakDown bill={bill} />
          <TotalBreakdown bill={bill} />
        </div>
        <h2>Trip Logs</h2>
        <TravelList tripLogs={bill.tripLogs} historyComp={true} />
      </div>
    </section>
  );
};

export default SingleHistory;
