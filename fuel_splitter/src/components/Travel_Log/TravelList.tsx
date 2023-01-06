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

const TravelList: React.FC = () => {
  const tripLogs = useAppSelector((state) => state.fuelBill.tripLogs);

  return (
    <div id="travelList__container">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Trip #</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Total KM's</TableCell>
              <TableCell align="right">Involved</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tripLogs.map((log, index) => (
              <TravelRow tripLog={log} key={index} tripNum={index + 1} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TravelList;
