import { FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";
import { useState } from "react";
import { TripInfo } from "../model";

interface Props {
  handleAdd: (e: React.FormEvent) => void;
}

const NewTrip: React.FC<Props> = ({ handleAdd }) => {
  const [tripInfo, setTripInfo] = useState<TripInfo>({
    isBrendanIn: false,
    isLoryIn: false,
    isDavidIn: false,
    isParcoIn: false,
    totalKM: 0,
  });

  const onCheck = (event: React.ChangeEvent): void => {};

  return (
    <form
      className="newTrip__container"
      onSubmit={(e) => {
        handleAdd(e);
      }}
    >
      <h1>Add New Trip Info</h1>
      <FormGroup className="newTrip__checkboxes">
        <FormControlLabel control={<Checkbox />} label="Brendan" />
        <FormControlLabel control={<Checkbox />} label="Lory" />
        <FormControlLabel control={<Checkbox />} label="David" />
        <FormControlLabel control={<Checkbox />} label="Parco" />
      </FormGroup>
      <input placeholder="Enter Total KM's travelled" type="input" />
      <Button variant="contained" color="success">
        Submit
      </Button>
    </form>
  );
};

export default NewTrip;
