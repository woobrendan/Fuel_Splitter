import React from "react";
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

interface Props {
  tripLogs?: TripInfo[];
  historyComp?: boolean;
}

const TravelList: React.FC<Props> = ({ tripLogs, historyComp }) => {
  const stateTripLogs = useAppSelector((state) => state.fuelBill.tripLogs);

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
              <TableCell>Trip #</TableCell>
              <TableCell align="right">Total KM's</TableCell>
              <TableCell align="right">Involved</TableCell>
              <TableCell align="right">Date</TableCell>
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
