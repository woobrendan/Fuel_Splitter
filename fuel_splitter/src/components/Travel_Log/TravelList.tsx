import { useState, useEffect } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
} from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import TravelRow from "./TravelRow";
import { TripInfo } from "../../model";
import axios from "axios";

interface Props {
  tripLogs?: TripInfo[];
  historyComp?: boolean;
}

const TravelList: React.FC<Props> = ({ tripLogs, historyComp }) => {
  const stateTripLogs = useAppSelector((state) => state.fuelBill.tripLogs);
  const [trips, setTrips] = useState<TripInfo[]>([]);

  useEffect(() => {
    getTrips();
  }, []);

  const getTrips = async () => {
    try {
      const trips = await axios.get("http://localhost:1212/trips/get");
      setTrips(() => [...trips.data.tripLogs]);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getArr = () => {
    if (historyComp) return tripLogs;
    else {
      return stateTripLogs ? stateTripLogs : null;
    }
  };

  return (
    <div id="travelList__container">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Total KM's</TableCell>
              <TableCell align="right">Involved</TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getArr() &&
              getArr()!.map((log: TripInfo, index: number) => (
                <TravelRow tripLog={log} key={index} tripNum={index + 1} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TravelList;
