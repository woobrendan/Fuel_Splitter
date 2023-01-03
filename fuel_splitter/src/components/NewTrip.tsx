import { FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";

const NewTrip: React.FC = () => {
  return (
    <form className="newTrip__container" onSubmit={(e) = > {handleAdd(e)}}>
      <h1>Add New Trip Info</h1>
      <FormGroup className="newTrip__checkboxes">
        <FormControlLabel control={<Checkbox />} label="Brendan" />
        <FormControlLabel control={<Checkbox />} label="Lory" />
        <FormControlLabel control={<Checkbox />} label="David" />
        <FormControlLabel control={<Checkbox />} label="Parco" />
      </FormGroup>
      <Button variant="contained" color="success">
        Submit
      </Button>
    </form>
  );
};

export default NewTrip;
