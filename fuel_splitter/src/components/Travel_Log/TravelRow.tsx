import { TableBody, TableRow, TableCell } from "@mui/material";
import React from "react";
import { isNamespaceExport } from "typescript";
import { TripInfo } from "../../model";

interface Props {
  tripLog: TripInfo;
  tripNum: number;
}

const TravelRow: React.FC<Props> = ({ tripLog, tripNum }) => {
  // const rows = [createData(1, 12, ["Brendan", "Lory"])];
  // const row = [createData(tripNum, tripLog.totalKM, [])]

  const getNamesInvolved = () => {
    const { isBrendanIn, isLoryIn, isDavidIn, isParcoIn } = tripLog;
    let names: string[] = [];
    if (isBrendanIn) names.push("Brendan");
    if (isLoryIn) names.push("Lory");
    if (isDavidIn) names.push("David");
    if (isParcoIn) names.push("Parco");
    return names;
  };

  const getNames = (nameArr: string[]) => {
    let names: string = "";
    if (nameArr.length === 1) return nameArr[0];
    for (let i = 0; i < nameArr.length; i++) {
      if (i === nameArr.length - 1) {
        names += nameArr[i];
      } else {
        names += `${nameArr[i]}, `;
      }
    }
    return names;
  };

  return (
    <TableBody>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell component="th" scope="row">
          {tripNum}
        </TableCell>
        <TableCell align="right">{tripLog.totalKM}</TableCell>
        <TableCell align="right">{getNames(getNamesInvolved())}</TableCell>
      </TableRow>
    </TableBody>
  );
};

export default TravelRow;

// trip, total km, people involved
