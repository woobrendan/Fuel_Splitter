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

  const [cleanTrip, setCleanTrip] = useState<TripDetails>({
    date: convertDateToString(date),
    totalKM,
    involved: getNames(getNamesInvolved()),
    description,
  });

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell>{cleanTrip.date}</TableCell>
        <TableCell align="right">{cleanTrip.totalKM}</TableCell>
        <TableCell align="right">{cleanTrip.involved}</TableCell>
        <TableCell align="right">{cleanTrip.description}</TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            onClick={() => handleModal()}
            // className="submit_button"
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
          tripDetails={cleanTrip}
        />
      )}
    </>
  );
};

export default TravelRow;
