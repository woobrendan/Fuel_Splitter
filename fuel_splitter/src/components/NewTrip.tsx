import { FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";
import { useState } from "react";
import { TripInfo } from "../model";
import DatePicker from "./DatePicker";

interface Props {
  handleAdd: (e: React.FormEvent, trip: TripInfo) => void;
}

interface ErrorHandle {
  hasCheck: boolean;
  hasDistance: boolean;
}

const initialState = {
  isBrendanIn: false,
  isLoryIn: false,
  isDavidIn: false,
  isParcoIn: false,
  totalKM: 0,
  date: new Date(),
};

const NewTrip: React.FC<Props> = ({ handleAdd }) => {
  const [tripInfo, setTripInfo] = useState<TripInfo>(initialState);
  const [error, setError] = useState<ErrorHandle>({
    hasCheck: true,
    hasDistance: true,
  });

  const getDate = (dateVal: Date | null): void => {
    setTripInfo((prev) => ({
      ...prev,
      date: dateVal,
    }));
  };

  const handleSubmit = (e: React.FormEvent, trip: TripInfo) => {
    const { isBrendanIn, isLoryIn, isDavidIn, isParcoIn } = tripInfo;

    if (!isBrendanIn && !isLoryIn && !isDavidIn && !isParcoIn) {
    }
    handleAdd(e, trip);
    setTripInfo(() => initialState);
  };

  const onCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // type Person = keyof TripInfo
    // const indiv: Person = `is${event.target.value}In`
    // // const person: string = `is${event.target.value}In`
    // setTripInfo((prev: TripInfo) => ({
    //   ...prev,
    //   [`is${event.target.value}In`]: !Boolean(prev[indiv]),
    // }));

    // refactor later to not be brute force
    const indiv: string = event.target.value;
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
        handleSubmit(e, tripInfo);
      }}
    >
      <h1>Add New Trip Info</h1>
      <DatePicker getDate={getDate} />
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
          control={
            <Checkbox
              checked={tripInfo.isLoryIn}
              onChange={onCheck}
              value="Lory"
            />
          }
          label="Lory"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={tripInfo.isDavidIn}
              onChange={onCheck}
              value="David"
            />
          }
          label="David"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={tripInfo.isParcoIn}
              onChange={onCheck}
              value="Parco"
            />
          }
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
      <Button
        variant="contained"
        color="success"
        type="submit"
        className="submit_button"
      >
        Submit
      </Button>
    </form>
  );
};

export default NewTrip;
