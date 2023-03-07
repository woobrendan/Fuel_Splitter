import { Button } from "@mui/material";
import { useState } from "react";
import { TripInfo } from "../../../Models/tripModels";
import TripDatePicker from "../TripDatePicker";
import {
  tripErorrInitialState,
  tripErrorHandle,
} from "../../../Models/errorModels";
import { initialTripState } from "../../../Models/tripModels";
import TripManage from "../TripManage";
import { checkTripErrors, handleCheck } from "../../../tripActions";

interface Props {
  handleAdd: (e: React.FormEvent, trip: TripInfo) => void;
}

const NewTrip: React.FC<Props> = ({ handleAdd }) => {
  const [tripInfo, setTripInfo] = useState<TripInfo>(initialTripState);
  const [error, setError] = useState<tripErrorHandle>(tripErorrInitialState);

  const customSetError = (err: tripErrorHandle) => setError(() => err);
  const customSetTrip = (trip: TripInfo) => setTripInfo(() => trip);

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
    const worked = checkTripErrors(
      e,
      tripInfo,
      error,
      customSetError,
      customSetTrip,
    );

    if (worked) handleAdd(e, trip);
  };

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTripInfo(() => handleCheck(e, tripInfo));

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
      <TripManage
        trip={tripInfo}
        onInputChange={onInputChange}
        onCheck={onCheck}
        error={error}
        comp="newTrip"
      />
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
