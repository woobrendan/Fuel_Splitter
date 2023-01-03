import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

const NewTrip: React.FC = () => {
  return (
    <div className="newTrip__container">
      <FormGroup className="newTrip__checkboxes">
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Brendan"
        />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Lory" />
        <FormControlLabel control={<Checkbox defaultChecked />} label="David" />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Parco" />
      </FormGroup>
    </div>
  );
};

export default NewTrip;
