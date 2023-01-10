import { FuelBill } from "../../model";
import TravelList from "../Travel_Log/TravelList";
import TripDetails from "./TripDetails";

interface Props {
  bill: FuelBill;
}

const SingleHistory: React.FC<Props> = ({ bill }) => {
  return (
    <div className="history__single">
      <TravelList tripLogs={bill.tripLogs} />
      <TripDetails bill={bill} />
    </div>
  );
};

export default SingleHistory;
