import { FormControlLabel, Checkbox } from "@mui/material";

interface Props {
  onCheck: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nameVal: 
}

const TripCheckbox: React.FC<Props> = ({onCheck}) => {
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

export default TripCheckbox;
