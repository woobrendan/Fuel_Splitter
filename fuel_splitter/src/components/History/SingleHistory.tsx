import { FuelBill } from "../../model";
import TravelList from "../Travel_Log/TravelList";
import TripDetails from "./TripDetails";

interface Props {
  bill: FuelBill;
  tripNum: number;
}

const SingleHistory: React.FC<Props> = ({ bill, tripNum }) => {
  return (
    <section className="history__single">
      <h2>Trip Summary #{tripNum}</h2>
      <div className="history__single__summary">
        <TravelList tripLogs={bill.tripLogs} historyComp={true} />
        <TripDetails bill={bill} />
      </div>
    </section>
  );
};

export default SingleHistory;
