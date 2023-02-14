import { FormControlLabel, Checkbox } from "@mui/material";
import { NameVal } from "../../model";

interface Props {
  onCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nameVal: NameVal;
}

const TripCheckbox: React.FC<Props> = ({ onCheck, nameVal }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={nameVal.value}
          onChange={onCheck}
          value={nameVal.name}
        />
      }
      label={nameVal.name}
    />
  );
};

export default TripCheckbox;
