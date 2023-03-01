import { TableRow, TableCell, Button } from "@mui/material";
import { convertDateToString, getNames } from "../../helperFunc";
import { TripInfo, TripDetails } from "../../model";
import { useState } from "react";
import EditModal from "../Travel_Log/EditModal";

interface Props {
  tripLog: TripInfo;
}

const TravelRow: React.FC<Props> = ({ tripLog }) => {
  const [showModal, setShowModal] = useState(false);
  const [tripLogState, setTripLogState] = useState<TripInfo>({ ...tripLog });

  const getNamesInvolved = (log: TripInfo) => {
    let names: string[] = [];
    if (log.isBrendanIn) names.push("Brendan");
    if (log.isLoryIn) names.push("Lory");
    if (log.isDavidIn) names.push("David");
    if (log.isParcoIn) names.push("Parco");
    return names;
  };

  const handleModal = () => setShowModal(!showModal);

  const updateTrip = (val: TripInfo) => {
    setTripLogState(() => val);
  };

  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell>{convertDateToString(tripLogState.date)}</TableCell>
        <TableCell align="right">{tripLogState.totalKM}</TableCell>
        <TableCell align="right">
          {getNames(getNamesInvolved(tripLogState))}
        </TableCell>
        <TableCell align="right">{tripLogState.description}</TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            onClick={() => handleModal()}
            data-testid="edit_trip"
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
      {showModal && (
        <EditModal
          show={showModal}
          handleToggle={handleModal}
          updateTrip={updateTrip}
          tripLog={tripLogState}
        />
      )}
    </>
  );
};

export default TravelRow;
