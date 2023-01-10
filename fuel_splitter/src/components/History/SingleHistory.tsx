import { FuelBill } from "../../model";
import TravelList from "../Travel_Log/TravelList";

interface Props {
  bill: FuelBill;
}

const SingleHistory: React.FC<Props> = ({ bill }) => {
  return (
    <div className="history_single">
      <TravelList />
    </div>
  );
};

export default SingleHistory;
