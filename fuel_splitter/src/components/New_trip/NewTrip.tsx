import { FormGroup, FormControlLabel, Button, Checkbox } from "@mui/material";
import TripCheckbox from "./TripCheckbox";
import { useState } from "react";
import { NameVal, TripInfo } from "../../model";
import DatePicker from "../DatePicker";

interface Props {
  handleAdd: (e: React.FormEvent, trip: TripInfo) => void;
}

interface ErrorHandle {
  hasCheck: boolean;
  hasDistance: boolean;
  hasDescription: boolean;
}

const initialState = {
  isBrendanIn: false,
  isLoryIn: false,
  isDavidIn: false,
  isParcoIn: false,
  totalKM: 0,
  date: new Date(),
  description: "",
};

const NewTrip: React.FC<Props> = ({ handleAdd }) => {
  const [tripInfo, setTripInfo] = useState<TripInfo>(initialState);
  const [error, setError] = useState<ErrorHandle>({
    hasCheck: false,
    hasDistance: false,
    hasDescription: false,
  });

  const getDate = (dateVal: Date | null): void => {
    setTripInfo((prev) => ({
      ...prev,
      date: dateVal,
    }));
  };

  const handleSubmit = (e: React.FormEvent, trip: TripInfo) => {
    const { isBrendanIn, isLoryIn, isDavidIn, isParcoIn } = tripInfo;

    e.preventDefault();

    const errorCopy: ErrorHandle = { ...error };

    !isBrendanIn && !isLoryIn && !isDavidIn && !isParcoIn
      ? (errorCopy.hasCheck = true)
      : (errorCopy.hasCheck = false);

    !tripInfo.totalKM
      ? (errorCopy.hasDistance = true)
      : (errorCopy.hasDistance = false);

    !tripInfo.description
      ? (errorCopy.hasDescription = true)
      : (errorCopy.hasDescription = false);

    if (
      errorCopy.hasDistance ||
      errorCopy.hasDescription ||
      errorCopy.hasCheck
    ) {
      setError(() => ({ ...errorCopy }));
      return;
    } else {
      setError(() => ({
        hasCheck: false,
        hasDistance: false,
        hasDescription: false,
      }));
      handleAdd(e, trip);
      setTripInfo(() => initialState);
    }
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

  const onInputChange = (e: React.FormEvent, inputLabel: string) => {
    const target = e.target as HTMLTextAreaElement;
    const value =
      inputLabel === "totalKM" ? Number(target.value) : target.value;
    setTripInfo((prev) => ({
      ...prev,
      [inputLabel]: value,
    }));
  };

  const names: NameVal[] = [
    { name: "Brendan", value: tripInfo.isBrendanIn },
    { name: "Lory", value: tripInfo.isLoryIn },
    { name: "David", value: tripInfo.isDavidIn },
    { name: "Parco", value: tripInfo.isParcoIn },
  ];

  const mappedCheckbox = names.map((name: NameVal) => (
    <TripCheckbox nameVal={name} onCheck={onCheck} />
  ));

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
      <FormGroup className="newTrip__checkboxes">{mappedCheckbox}</FormGroup>
      {error.hasCheck && (
        <span className="error">At least one box must be checked</span>
      )}
      <section className="newTrip__input">
        <div className="newTrip__input__container">
          <label>Total KM's:</label>
          <input
            placeholder="Enter Total KM's travelled"
            type="input"
            value={tripInfo.totalKM}
            data-testid="trip_km"
            onChange={(e: React.FormEvent) => {
              const target = e.target as HTMLTextAreaElement;
              setTripInfo((prev) => ({
                ...prev,
                totalKM: Number(target.value),
              }));
            }}
          />
          {error.hasDistance && <span className="error">Must have KMs</span>}
        </div>
        <div className="newTrip__input__container">
          <label>Trip Description:</label>
          <input
            type="input"
            value={tripInfo.description}
            data-testid="trip_description"
            onChange={(e: React.FormEvent) => {
              const target = e.target as HTMLTextAreaElement;
              setTripInfo((prev) => ({ ...prev, description: target.value }));
            }}
          />
          {error.hasDescription && (
            <span className="error">Must have description</span>
          )}
        </div>
      </section>
      <Button
        variant="contained"
        color="success"
        type="submit"
        data-testid="submit_trip"
        className="submit_button"
      >
        Submit
      </Button>
    </form>
  );
};

export default NewTrip;
