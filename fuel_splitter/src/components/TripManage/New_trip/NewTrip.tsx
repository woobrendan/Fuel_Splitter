import { FormGroup, Button } from "@mui/material";
import TripCheckbox from "./TripCheckbox";
import { useState } from "react";
import { NameVal, TripInfo } from "../../../model";
import Date_Picker from "../DatePicker";
import InputContainer from "../InputContainer";

interface Props {
  handleAdd: (e: React.FormEvent, trip: TripInfo) => void;
}

interface ErrorHandle {
  hasCheck: boolean;
  hasDistance: boolean;
  hasDescription: boolean;
  hasDate: boolean;
}

const errorInitial = {
  hasCheck: false,
  hasDistance: false,
  hasDescription: false,
  hasDate: false,
};

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
  const [error, setError] = useState<ErrorHandle>(errorInitial);

  const getDate = (dateVal: Date | null): void => {
    setTripInfo((prev) => ({
      ...prev,
      date: dateVal,
    }));
  };

  const getErrorState = (val: boolean) => {
    if (val) {
      setError((prev) => ({
        ...prev,
        hasDate: true,
      }));
    }
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
      errorCopy.hasCheck ||
      errorCopy.hasDate
    ) {
      setError(() => ({ ...errorCopy }));
      return;
    } else {
      setError(() => errorInitial);
      handleAdd(e, trip);
      setTripInfo(() => initialState);
    }
  };

  const onCheck = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // const target = event.target as HTMLInputElement;
    // // const some = `is${target.value}In`
    // type Person = keyof TripInfo
    // const indiv: keyof TripInfo = `is${target.value}In`
    // // const person: string = `is${event.target.value}In`
    // setTripInfo((prev: TripInfo) => ({
    //   ...prev,
    //   [`is${target.name}In`]: !Boolean(prev[indiv]),
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

  const onInputChange = (e: React.FormEvent) => {
    const target = e.target as HTMLTextAreaElement;
    const value =
      target.name === "totalKM" ? Number(target.value) : target.value;
    setTripInfo((prev) => ({
      ...prev,
      [target.name]: value,
    }));
  };

  const names: NameVal[] = [
    { name: "Brendan", value: tripInfo.isBrendanIn },
    { name: "Lory", value: tripInfo.isLoryIn },
    { name: "David", value: tripInfo.isDavidIn },
    { name: "Parco", value: tripInfo.isParcoIn },
  ];

  return (
    <form
      className="newTrip__container"
      onSubmit={(e) => {
        handleSubmit(e, tripInfo);
      }}
    >
      <h1>Add New Trip Info</h1>
      <Date_Picker getDate={getDate} getErrorState={getErrorState} />

      <h2>Trip Participants</h2>
      <FormGroup className="newTrip__checkboxes">
        {names.map((name: NameVal, index: number) => (
          <TripCheckbox key={index} nameVal={name} onCheck={onCheck} />
        ))}
      </FormGroup>
      {error.hasCheck && (
        <span className="error">At least one box must be checked</span>
      )}
      <section className="newTrip__input">
        <InputContainer
          val={tripInfo.totalKM}
          error={error.hasDistance}
          onInputChange={onInputChange}
          label="Total KM"
          name="totalKM"
          type="input"
          comp="newTrip"
        />
        <InputContainer
          val={tripInfo.description}
          error={error.hasDescription}
          onInputChange={onInputChange}
          label="Trip Description"
          name="description"
          type="input"
          comp="newTrip"
        />
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
