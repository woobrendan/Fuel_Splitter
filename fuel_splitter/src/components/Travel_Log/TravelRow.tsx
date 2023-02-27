import { TableRow, TableCell, Button } from "@mui/material";
import { convertDateToString, getNames } from "../../helperFunc";
import { TripInfo } from "../../model";
import { useState } from "react";

interface Props {
  tripLog: TripInfo;
}

const TravelRow: React.FC<Props> = ({ tripLog }) => {
  const [showModal, setShowModal] = useState(false);
  const {
    isBrendanIn,
    isLoryIn,
    isDavidIn,
    isParcoIn,
    date,
    totalKM,
    description,
  } = tripLog;

  const getNamesInvolved = () => {
    let names: string[] = [];
    if (isBrendanIn) names.push("Brendan");
    if (isLoryIn) names.push("Lory");
    if (isDavidIn) names.push("David");
    if (isParcoIn) names.push("Parco");
    return names;
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{convertDateToString(date)}</TableCell>
      <TableCell align="right">{totalKM}</TableCell>
      <TableCell align="right">{getNames(getNamesInvolved())}</TableCell>
      <TableCell align="right">{description}</TableCell>
      <TableCell align="right">
        <Button
          variant="contained"
          // onClick={(e) => handleFinalSubmit(e, gasBill)}
          // className="submit_button"
          data-testid="edit_trip"
        >
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default TravelRow;
