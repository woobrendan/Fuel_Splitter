import { FormControlLabel, Checkbox } from "@mui/material";
import { NameVal } from "../../model";

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
          onChange={onCheck}
          value={name}
          data-testid={name}
        />
      }
      label={name}
    />
  );
};

export default TripCheckbox;