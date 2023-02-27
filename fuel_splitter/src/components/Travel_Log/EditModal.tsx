import { Modal, Box } from "@mui/material";
import "../../Styles/modal.scss";
import { TripDetails } from "../../model";

interface Props {
  show: boolean;
  handleToggle: () => void;
  tripDetails: TripDetails;
}

const EditModal: React.FC<Props> = ({ show, handleToggle, tripDetails }) => {
  // render out data as inputs and create onchange to set and then return the tripDetails
  return (
    <Modal open={show} onClose={handleToggle}>
      <Box id="edit_modal">Seome Stuff</Box>
    </Modal>
  );
};

export default EditModal;
