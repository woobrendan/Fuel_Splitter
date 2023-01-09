import { TableRow, TableCell } from "@mui/material";
import { dateToString } from "../../helperFunc";
import { TripInfo } from "../../model";

interface Props {
  tripLog: TripInfo;
  tripNum: number;
}

const TravelRow: React.FC<Props> = ({ tripLog, tripNum }) => {
  const { isBrendanIn, isLoryIn, isDavidIn, isParcoIn, date, totalKM } =
    tripLog;

  const getNamesInvolved = () => {
    let names: string[] = [];
    if (isBrendanIn) names.push("Brendan");
    if (isLoryIn) names.push("Lory");
    if (isDavidIn) names.push("David");
    if (isParcoIn) names.push("Parco");
    return names;
  };

  const convertDateToString = (day: Date | null): string => {
    const newDate: string = day!.toISOString().split("T")[0];
    return dateToString(newDate);
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
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row" align="center">
        {tripNum}
      </TableCell>
      <TableCell align="center">{totalKM}</TableCell>
      <TableCell align="right">{getNames(getNamesInvolved())}</TableCell>
      <TableCell align="right">{convertDateToString(date)}</TableCell>
    </TableRow>
  );
};

export default TravelRow;

// trip, total km, people involved
