import { FuelBill } from "../model";
import { TripInfo } from "../Models/tripModels";

const addTrip = (state: FuelBill, trip: TripInfo) => {
  // const copyState = {
  //   ...state,
  //   brendan: {...state.brendan},
  //   lory: {...state.lory},
  //   david: {...state.david},
  //   parco: {...state.parco},
  //   tripLogs: [...state.tripLogs]
  // }
  const { isBrendanIn, isDavidIn, isLoryIn, isParcoIn, totalKM } = trip;

  //check how many people are involved, then divide to find portion of km
  let count: number = 0;
  const involvment = [isBrendanIn, isDavidIn, isLoryIn, isParcoIn];

  for (let check of involvment) {
    if (check) count++;
  }

  const costPer: number = totalKM / count;

  // Add new trip KMs total. add Trip to logs
  state.totalKM += totalKM;

  // add trip to trip logs, then sort array to have earliest trip come first
  state.tripLogs = [...state.tripLogs, trip].sort(
    (a: TripInfo, b: TripInfo): any => {
      return a.date!.getTime() - b.date!.getTime();
    },
  );

  //check each individual to see if theyre involved, and adjust trip numbers accordingly
  if (isBrendanIn) {
    state.brendan.totalKM =
      Math.round((state.brendan.totalKM + costPer) * 100) / 100;
    state.brendan.totalTrips = state.brendan.totalTrips + 1;
  }

  if (isLoryIn) {
    state.lory.totalTrips = state.lory.totalTrips + 1;
    state.lory.totalKM = Math.round((state.lory.totalKM + costPer) * 100) / 100;
  }

  if (isParcoIn) {
    state.parco.totalTrips = state.parco.totalTrips + 1;
    state.parco.totalKM =
      Math.round((state.parco.totalKM + costPer) * 100) / 100;
    state.parco.billPortion =
      Math.round((state.parco.totalKM / state.totalKM) * 100) / 100;
  }

  if (isDavidIn) {
    state.david.totalTrips = state.david.totalTrips + 1;
    state.david.totalKM =
      Math.round((state.david.totalKM + costPer) * 100) / 100;
  }
  // recalculate each person bill portion after a new trip has been added
  state.david.billPortion =
    Math.round((state.david.totalKM / state.totalKM) * 100) / 100;
  state.brendan.billPortion =
    Math.round((state.brendan.totalKM / state.totalKM) * 100) / 100;
  state.lory.billPortion =
    Math.round((state.lory.totalKM / state.totalKM) * 100) / 100;
  state.parco.billPortion =
    Math.round((state.parco.totalKM / state.totalKM) * 100) / 100;

  return state;
};

export { addTrip };
