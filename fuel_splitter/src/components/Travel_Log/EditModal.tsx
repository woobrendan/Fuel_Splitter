import { Modal, Box } from "@mui/material";
import "../../Styles/modal.scss";
import { TripDetails } from "../../model";

interface Props {
  show: boolean;
  handleToggle: () => void;
  tripDetails: TripDetails;
  handleChange: (e: React.FormEvent) => void;
}

const EditModal: React.FC<Props> = ({
  show,
  handleToggle,
  tripDetails,
  handleChange,
}) => {
  const { date, totalKM, description, involved } = tripDetails;
  // render out data as inputs and create onchange to set and then return the tripDetails
  return (
    <Modal open={show} onClose={handleToggle}>
      <Box id="edit_modal">
        <div>
          <input
            value={date}
            name="date"
            type="input"
            onChange={(e) => handleChange(e)}
          />
          <input
            value={description}
            name="description"
            type="input"
            onChange={(e) => handleChange(e)}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default EditModal;
