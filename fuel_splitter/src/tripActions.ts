import { TripInfo, initialTripState } from "./Models/tripModels";
import { tripErrorHandle, tripErorrInitialState } from "./Models/errorModels";
import axios from "axios";

const addUpdateTripLog = (
  e: React.FormEvent,
  trip: TripInfo,
  error: tripErrorHandle,
  setError: (error: tripErrorHandle) => void,
  setTrip: (trip: TripInfo) => void,
) => {
  const { isBrendanIn, isLoryIn, isDavidIn, isParcoIn } = trip;

  e.preventDefault();

  const errorCopy: tripErrorHandle = { ...error };

  //** Check to see if at least one person included on trip */
  !isBrendanIn && !isLoryIn && !isDavidIn && !isParcoIn
    ? (errorCopy.hasCheck = true)
    : (errorCopy.hasCheck = false);

  !trip.totalKM
    ? (errorCopy.hasDistance = true)
    : (errorCopy.hasDistance = false);

  !trip.description
    ? (errorCopy.hasDescription = true)
    : (errorCopy.hasDescription = false);

  //** If any error is truth set error and break out of function */
  if (
    errorCopy.hasDistance ||
    errorCopy.hasDescription ||
    errorCopy.hasCheck ||
    errorCopy.hasDate
  ) {
    setError({ ...errorCopy });
    return false;
  } else {
    setError(tripErorrInitialState);
    setTrip(initialTripState);
    return true;
  }
};

export { addUpdateTripLog };
