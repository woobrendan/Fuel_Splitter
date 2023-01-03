import { TableBody, TableRow, TableCell } from "@mui/material";
import React from "react";

function createData(trip: number, totalKm: number, involved: string[]) {
  return { trip, totalKm, involved };
}

const TravelRow: React.FC = () => {
  const rows = [createData(1, 12, ["Brendan", "Lory"])];

  const getNames = (nameArr: string[]) => {
    let names: string = "";
    if (nameArr.length === 1) return nameArr[0];
    for (let i = 0; i < nameArr.length; i++) {
      if (i === nameArr.length - 1) {
        names += names[i];
      } else {
        names += `${names[i]}, `;
      }
    }
    return names;
  };

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
          <TableCell align="right">{getNames(row.involved)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TravelRow;

// trip, total km, people involved
