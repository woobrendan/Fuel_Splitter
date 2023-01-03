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
      <label>Total KM's travelled</label>
      <input
        placeholder="Enter Total KM's travelled"
        type="input"
        value={tripInfo.totalKM}
        onChange={(e: React.FormEvent) => {
          const target = e.target as HTMLTextAreaElement;
          setTripInfo((prev) => ({ ...prev, totalKM: Number(target.value) }));
        }}
      />
      <Button variant="contained" color="success">
        Submit
      </Button>
    </form>
  );
};

export default NewTrip;

// {...prev, totalKM: e.target.value}
