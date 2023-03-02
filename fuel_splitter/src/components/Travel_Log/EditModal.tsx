import { Modal, Box, Button, FormGroup } from "@mui/material";
import "../../Styles/modal.scss";
import {
  TripInfo,
  initialTripState,
  NameVal,
  getCheckValues,
} from "../../Models/tripModels";
import { useState } from "react";
import TripCheckbox from "../TripManage/New_trip/TripCheckbox";
import { convertDateToString } from "../../helperFunc";
import axios from "axios";
import {
  tripErrorHandle,
  tripErorrInitialState,
} from "../../Models/errorModels";

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

  const handleOnChange = (e: React.FormEvent) => {
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
        <h2>{convertDateToString(modalTrip.date)}</h2>
        <div className="modal__inputs">
          <div className="modal__input">
            <label>Total KM:</label>
            <input
              value={modalTrip.totalKM}
              name="totalKM"
              type="input"
              onChange={(e) => handleOnChange(e)}
            />
            {error.hasDistance && (
              <span className="error">Must have total KM's</span>
            )}
          </div>
          <div className="modal__input">
            <label>Description:</label>
            <input
              value={modalTrip.description}
              name="description"
              type="input"
              onChange={(e) => handleOnChange(e)}
            />
            {error.hasDescription && (
              <span className="error">Must have Description</span>
            )}
          </div>
        </div>
        <div className="modal__input">
          <label>Trip Participants:</label>
          <FormGroup className="modal__checkboxes">
            {getCheckValues(modalTrip).map((name: NameVal, index: number) => (
              <TripCheckbox key={index} nameVal={name} onCheck={onCheck} />
            ))}
          </FormGroup>
          {error.hasCheck && (
            <span className="error">At least one box must be checked</span>
          )}
        </div>

        <Button
          variant="contained"
          color="success"
          onClick={(e) => handleSubmit(e, modalTrip)}
        >
          Update
        </Button>
      </Box>
    </Modal>
  );
};

export default EditModal;
