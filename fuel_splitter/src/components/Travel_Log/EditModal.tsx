import { Modal, Box, Button } from "@mui/material";
import "../../Styles/modal.scss";
import { NameVal, TripInfo } from "../../model";
import { useState } from "react";

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

  const onSubmit = () => {
    updateTrip(modalTrip);
    handleToggle();
  };

  const names: NameVal[] = [
    { name: "Brendan", value: tripLog.isBrendanIn },
    { name: "Lory", value: tripLog.isLoryIn },
    { name: "David", value: tripLog.isDavidIn },
    { name: "Parco", value: tripLog.isParcoIn },
  ];

  // render out data as inputs and create onchange to set and then return the tripDetails
  return (
    <Modal open={show} onClose={handleToggle}>
      <Box id="edit_modal">
        <div className="modal__input">
          <label>Total KM:</label>
          <input
            value={modalTrip.totalKM}
            name="totalKM"
            type="input"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        {/* <div className="modal__input">
          <label>Involved:</label>
          <input
            value={modalTrip.involved}
            name="involved"
            type="input"
            onChange={(e) => handleOnChange(e)}
          />
        </div> */}
        <div className="modal__input">
          <label>Description:</label>
          <input
            value={modalTrip.description}
            name="description"
            type="input"
            onChange={(e) => handleOnChange(e)}
          />
        </div>

        <Button variant="contained" color="success" onClick={() => onSubmit()}>
          Update
        </Button>
      </Box>
    </Modal>
  );
};

export default EditModal;
