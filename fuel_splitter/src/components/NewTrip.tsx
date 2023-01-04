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

  const onCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // type Person = keyof TripInfo
    // const indiv: Person = `is${event.target.value}In`
    // // const person: string = `is${event.target.value}In`
    // setTripInfo((prev: TripInfo) => ({
    //   ...prev,
    //   [`is${event.target.value}In`]: !Boolean(prev[indiv]),
    // }));

    // refactor later to note brute force
    const indiv: string = event.target.value;
    console.log(indiv);
    switch (indiv) {
      case "Brendan":
        setTripInfo((prev) => ({
          ...prev,
          isBrendanIn: !prev.isBrendanIn,
        }));
        break;
      case "Lory":
        setTripInfo((prev) => ({
          ...prev,
          isLoryIn: !prev.isLoryIn,
        }));
        break;
      case "David":
        setTripInfo((prev) => ({
          ...prev,
          isDavidIn: !prev.isDavidIn,
        }));
        break;
      case "Parco":
        setTripInfo((prev) => ({
          ...prev,
          isParcoIn: !prev.isParcoIn,
        }));
        break;
      default:
        break;
    }
  };

  return (
    <form
      className="newTrip__container"
      onSubmit={(e) => {
        handleAdd(e);
      }}
    >
      <h1>Add New Trip Info</h1>
      <h2>Trip Participants</h2>
      <FormGroup className="newTrip__checkboxes">
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
        <FormControlLabel
          control={<Checkbox onChange={onCheck} />}
          label="Lory"
        />
        <FormControlLabel
          control={<Checkbox checked={false} />}
          label="David"
        />
        <FormControlLabel
          control={<Checkbox checked={false} />}
          label="Parco"
        />
      </FormGroup>
      <div className="newTrip__input">
        <label>Total KM's travelled:</label>
        <input
          placeholder="Enter Total KM's travelled"
          type="input"
          value={tripInfo.totalKM}
          onChange={(e: React.FormEvent) => {
            const target = e.target as HTMLTextAreaElement;
            setTripInfo((prev) => ({ ...prev, totalKM: Number(target.value) }));
          }}
        />
      </div>
      <Button variant="contained" color="success">
        Submit
      </Button>
    </form>
  );
};

export default NewTrip;

// {...prev, totalKM: e.target.value}
