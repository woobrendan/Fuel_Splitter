import { Modal, Box, Button } from "@mui/material";
import "../../Styles/modal.scss";
import { TripInfo, initialTripState } from "../../Models/tripModels";
import { useState } from "react";
import { convertDateToString } from "../../helperFunc";
import axios from "axios";
import {
  tripErrorHandle,
  tripErorrInitialState,
} from "../../Models/errorModels";
import TripManage from "../TripManage/TripManage";

interface Props {
  show: boolean;
  handleToggle: () => void;
  updateTrip: (val: TripInfo) => void;
  tripLog: TripInfo;
}

const EditModal: React.FC<Props> = ({
  show,
  handleToggle,
  updateTrip,
  tripLog,
}) => {
  const [modalTrip, setModalTrip] = useState<TripInfo>({ ...tripLog });
  const [error, setError] = useState<tripErrorHandle>(tripErorrInitialState);
  const [toBeDeleted, setToBeDeleted] = useState<boolean>(false);

  const onInputChange = (e: React.FormEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const value =
      target.name === "totalKM" ? Number(target.value) : target.value;
    setModalTrip((prev) => ({
      ...prev,
      [target.name]: value,
    }));
  };

  const onCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const indiv: string = event.target.value;
    const copy = { ...modalTrip };

    if (indiv === "Brendan") copy.isBrendanIn = !copy.isBrendanIn;
    if (indiv === "Lory") copy.isLoryIn = !copy.isLoryIn;
    if (indiv === "David") copy.isDavidIn = !copy.isDavidIn;
    if (indiv === "Parco") copy.isParcoIn = !copy.isParcoIn;

    setModalTrip(() => copy);
  };

  const handleSubmit = (e: React.FormEvent, trip: TripInfo) => {
    const { isBrendanIn, isLoryIn, isDavidIn, isParcoIn } = trip;

    e.preventDefault();

    const errorCopy: tripErrorHandle = { ...error };

    !isBrendanIn && !isLoryIn && !isDavidIn && !isParcoIn
      ? (errorCopy.hasCheck = true)
      : (errorCopy.hasCheck = false);

    !trip.totalKM
      ? (errorCopy.hasDistance = true)
      : (errorCopy.hasDistance = false);

    !trip.description
      ? (errorCopy.hasDescription = true)
      : (errorCopy.hasDescription = false);

    if (
      errorCopy.hasDistance ||
      errorCopy.hasDescription ||
      errorCopy.hasCheck ||
      errorCopy.hasDate
    ) {
      setError(() => ({ ...errorCopy }));
      return;
    } else {
      axios.patch(`http://localhost:1212/trips/update/${trip._id}`, modalTrip);
      updateTrip(modalTrip);
      handleToggle();

      setError(() => tripErorrInitialState);
      setModalTrip(() => initialTripState);
    }
  };

  return (
    <Modal open={show} onClose={handleToggle}>
      <Box id="edit_modal">
        <Button variant="outlined" color="error" className="edit_modal_delete">
          Delete Trip
        </Button>
        <h3>Date: {convertDateToString(modalTrip.date)}</h3>
        <TripManage
          trip={modalTrip}
          onInputChange={onInputChange}
          onCheck={onCheck}
          error={error}
          comp="modal"
        />

        <Button
          variant="contained"
          className="edit_modal_update"
          onClick={(e) => handleSubmit(e, modalTrip)}
        >
          Update
        </Button>
        {toBeDeleted && (
          <Button variant="contained" color="error">
            Confirm Delete
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default EditModal;
