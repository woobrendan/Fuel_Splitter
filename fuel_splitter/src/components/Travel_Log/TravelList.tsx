import React from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import TravelRow from "./TravelRow";

const TravelList: React.FC = () => {
  return (
    <div id="travelList__container">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead className="result-table-head">
            <TableRow>
              <TableCell>Trip #</TableCell>
              <TableCell>Total KM's</TableCell>
              <TableCell>Involved</TableCell>
            </TableRow>
          </TableHead>
          {/* <TravelRow />  LOOP THRU ALL ROWS */}
        </Table>
      </TableContainer>
    </div>
  );
};

export default TravelList;
