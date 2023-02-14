import { FormControlLabel } from "@mui/material";

interface Props {
  onCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC = () => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={tripInfo.isBrendanIn}
          onChange={onCheck}
          value="Brendan"
        />
      }
      label="Brendan"
    />
  );
};

export default Checkbox;
