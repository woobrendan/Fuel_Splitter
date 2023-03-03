import { FormGroup, Button } from "@mui/material";
import TripCheckbox from "./TripCheckbox";
import { useState } from "react";
import { TripInfo, getCheckValues, NameVal } from "../../../Models/tripModels";
import TripDatePicker from "../TripDatePicker";
import InputContainer from "../InputContainer";
import {
  tripErorrInitialState,
  tripErrorHandle,
} from "../../../Models/errorModels";
import { initialTripState } from "../../../Models/tripModels";
import TripCheckList from "./TripCheckList";

interface Props {
  handleAdd: (e: React.FormEvent, trip: TripInfo) => void;
}

const NewTrip: React.FC<Props> = ({ handleAdd }) => {
  const [tripInfo, setTripInfo] = useState<TripInfo>(initialTripState);
  const [error, setError] = useState<tripErrorHandle>(tripErorrInitialState);

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
    const { isBrendanIn, isLoryIn, isDavidIn, isParcoIn } = trip;

    e.preventDefault();

    const errorCopy: tripErrorHandle = { ...error };

    !isBrendanIn && !isLoryIn && !isDavidIn && !isParcoIn
      ? (errorCopy.hasCheck = true)
      : (errorCopy.hasCheck = false);

    !trip.totalKM
      ? (errorCopy.hasDistance = true)
      : (errorCopy.hasDistance = false);

    !trip.description
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
      setError(() => tripErorrInitialState);
      handleAdd(e, trip);
      setTripInfo(() => initialTripState);
    }
  };

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
    const indiv: string = e.target.value;
    const copy = { ...tripInfo };

    if (indiv === "Brendan") copy.isBrendanIn = !copy.isBrendanIn;
    if (indiv === "Lory") copy.isLoryIn = !copy.isLoryIn;
    if (indiv === "David") copy.isDavidIn = !copy.isDavidIn;
    if (indiv === "Parco") copy.isParcoIn = !copy.isParcoIn;

    setTripInfo(() => copy);
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

  return (
    <form
      className="newTrip__container"
      onSubmit={(e) => handleSubmit(e, tripInfo)}
    >
      <h1>Add New Trip Info</h1>
      <TripDatePicker getDate={getDate} getErrorState={getErrorState} />

      {/* <h2>Trip Participants</h2>
      <FormGroup className="newTrip__checkboxes">
        {getCheckValues(tripInfo).map((name: NameVal, index: number) => (
          <TripCheckbox key={index} nameVal={name} onCheck={onCheck} />
        ))}
      </FormGroup>
      {error.hasCheck && (
        <span className="error">At least one box must be checked</span>
      )} */}
      <TripCheckList
        error={error.hasCheck}
        tripInfo={tripInfo}
        onCheck={onCheck}
      />
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
