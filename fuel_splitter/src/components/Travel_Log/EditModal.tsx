import { Modal, Box, Button } from "@mui/material";
import "../../Styles/modal.scss";
import { TripInfo } from "../../Models/tripModels";
import { useState } from "react";
import { convertDateToString } from "../../helperFunc";
import axios from "axios";
import {
  tripErrorHandle,
  tripErorrInitialState,
} from "../../Models/errorModels";
import TripManage from "../TripManage/TripManage";
import { useAppDispatch } from "../../store/hooks";
import { fuelBillActions } from "../../store/tripSlice";
import { checkTripErrors, handleCheck } from "../../tripActions";

interface Props {
  show: boolean;
  handleToggle: () => void;
  tripLog: TripInfo;
}

const EditModal: React.FC<Props> = ({ show, handleToggle, tripLog }) => {
  const [modalTrip, setModalTrip] = useState<TripInfo>({ ...tripLog });
  const [error, setError] = useState<tripErrorHandle>(tripErorrInitialState);
  const [toBeDeleted, setToBeDeleted] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const customSetError = (err: tripErrorHandle) => setError(() => err);
  const customSetTrip = (trip: TripInfo) => setModalTrip(() => trip);

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
    setModalTrip(() => handleCheck(event, modalTrip));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const worked = checkTripErrors(
      e,
      modalTrip,
      error,
      customSetError,
      customSetTrip,
    );
    if (worked) {
      dispatch(fuelBillActions.updateTripLog(modalTrip));
      handleToggle();
      try {
        await axios.patch(`http://localhost:1212/trips/${modalTrip._id}`, modalTrip);
      } catch (error) {
        console.log("Error patching  trip:", error)
      }
    }
  };

  const handleDelete = (val: TripInfo) => {
    dispatch(fuelBillActions.removeTripLog(val));
    handleToggle();
    axios.delete(`http://localhost:1212/trips/${val._id}`);
  };

  return (
    <Modal open={show} onClose={handleToggle}>
      <Box id="edit_modal">
        <Button
          variant="outlined"
          color="error"
          className="edit_modal_delete"
          data-testid="modal_delete"
          onClick={() => setToBeDeleted(!toBeDeleted)}
        >
          {toBeDeleted ? "Cancel" : "Delete Trip"}
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
          onClick={(e) => handleSubmit(e)}
        >
          Update
        </Button>
        {toBeDeleted && (
          <Button
            variant="contained"
            color="error"
            data-testid="modal_delete_confirm"
            onClick={() => handleDelete(modalTrip)}
          >
            Confirm Delete
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default EditModal;
