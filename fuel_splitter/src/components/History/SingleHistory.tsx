import { FuelBill } from "../../model";
import TravelList from "../Travel_Log/TravelList";
import TotalBreakdown from "./TotalBreakdown";
import IndivBreakDown from "./IndivBreakDown";
import { useState } from "react";
import { Button } from "@mui/material";

interface Props {
  bill: FuelBill;
  tripNum: number;
}

const SingleHistory: React.FC<Props> = ({ bill, tripNum }) => {
  const [toBeDeleted, setToBeDeleted] = useState(false);

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
