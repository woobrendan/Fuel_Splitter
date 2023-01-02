import { TableBody, TableRow, TableCell } from "@mui/material";
import React from "react";

function createData(trip: number, totalKm: number, involved: string[]) {
  return { trip, totalKm, involved };
}

const TravelRow: React.FC = () => {
  const rows = [createData(1, 12, ["Brendan", "Lory"])];
  return (
    <TableBody>
      {rows.map((row, index) => (
        <TableRow
          key={index}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.trip}
          </TableCell>
          <TableCell align="right">{row.totalKm}</TableCell>
          <TableCell align="right">{}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TravelRow;

// trip, total km, people involved
