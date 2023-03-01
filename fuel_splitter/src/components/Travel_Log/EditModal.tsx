import { Modal, Box, Button, FormGroup } from "@mui/material";
import "../../Styles/modal.scss";
import { NameVal, TripInfo } from "../../model";
import { useState } from "react";
import TripCheckbox from "../TripManage/New_trip/TripCheckbox";
import { convertDateToString } from "../../helperFunc";
import axios from "axios";

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

  const onSubmit = () => {
    const tripId = modalTrip._id;
    axios.patch(`http://localhost:1212/trips/update/${tripId}`, modalTrip);
    updateTrip(modalTrip);
    handleToggle();
  };

  const names: NameVal[] = [
    { name: "Brendan", value: modalTrip.isBrendanIn },
    { name: "Lory", value: modalTrip.isLoryIn },
    { name: "David", value: modalTrip.isDavidIn },
    { name: "Parco", value: modalTrip.isParcoIn },
  ];

  // render out data as inputs and create onchange to set and then return the tripDetails
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
          </div>
          <div className="modal__input">
            <label>Description:</label>
            <input
              value={modalTrip.description}
              name="description"
              type="input"
              onChange={(e) => handleOnChange(e)}
            />
          </div>
        </div>
        <div className="modal__input">
          <label>Trip Participants:</label>
          <FormGroup className="modal__checkboxes">
            {names.map((name: NameVal, index: number) => (
              <TripCheckbox key={index} nameVal={name} onCheck={onCheck} />
            ))}
          </FormGroup>
        </div>

        <Button variant="contained" color="success" onClick={() => onSubmit()}>
          Update
        </Button>
      </Box>
    </Modal>
  );
};

export default EditModal;
