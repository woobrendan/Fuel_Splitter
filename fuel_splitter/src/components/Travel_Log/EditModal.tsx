import { Modal, Box } from "@mui/material";

interface Props {
  show: boolean;
  handleToggle: () => void;
}

const EditModal: React.FC<Props> = ({ show, handleToggle }) => {
  return (
    <Modal open={show} onClose={handleToggle}>
      <Box>Seome Stuff</Box>
    </Modal>
  );
};

export default EditModal;
