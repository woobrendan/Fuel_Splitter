import { FormControlLabel, Checkbox } from "@mui/material";
import { NameVal } from "../../../model";

interface Props {
  onCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nameVal: NameVal;
}

const TripCheckbox: React.FC<Props> = ({ onCheck, nameVal }) => {
  const { name, value } = nameVal;
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
          onChange={(e) => onCheck(e)}
          value={name}
          data-testid={`checkbox_${name}`}
        />
      }
      label={name}
    />
  );
};

export default TripCheckbox;
