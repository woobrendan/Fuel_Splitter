import { TableRow, TableCell, Button } from "@mui/material";
import { convertDateToString, getNames } from "../../helperFunc";
import { TripInfo } from "../../Models/tripModels";
import { useState } from "react";
import EditModal from "../Travel_Log/EditModal";

interface Props {
  tripLog: TripInfo;
  historyComp: boolean;
  index: number;
}

const TravelRow: React.FC<Props> = ({ tripLog, historyComp, index }) => {
  const [showModal, setShowModal] = useState(false);

  const getNamesInvolved = (log: TripInfo) => {
    let names: string[] = [];
    if (log.isBrendanIn) names.push("Brendan");
    if (log.isLoryIn) names.push("Lory");
    if (log.isDavidIn) names.push("David");
    if (log.isParcoIn) names.push("Parco");
    return names;
  };

  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell>{convertDateToString(tripLog.date)}</TableCell>
        <TableCell align="right">{tripLog.totalKM}</TableCell>
        <TableCell align="right">
          {getNames(getNamesInvolved(tripLog))}
        </TableCell>
        <TableCell align="right">{tripLog.description}</TableCell>
        {!historyComp && (
          <TableCell align="right">
            <Button
              variant="contained"
              onClick={() => setShowModal(!showModal)}
              data-testid={`edit_trip_${index}`}
            >
              Edit
            </Button>
          </TableCell>
        )}
      </TableRow>
      {showModal && (
        <EditModal
          show={showModal}
          handleToggle={() => setShowModal(!showModal)}
          tripLog={tripLog}
        />
      )}
    </>
  );
};

export default TravelRow;
