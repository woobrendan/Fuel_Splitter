export interface TripInfo {
  isBrendanIn: boolean;
  isLoryIn: boolean;
  isDavidIn: boolean;
  isParcoIn: boolean;
  totalKM: number;
  date: Date | null;
  description: string;
  _id?: string;
}

export const initialTripState: TripInfo = {
  isBrendanIn: false,
  isLoryIn: false,
  isDavidIn: false,
  isParcoIn: false,
  totalKM: 0,
  date: new Date(),
  description: "",
};

export interface NameVal {
  name: string;
  value: boolean;
}

export const getCheckValues = (trip: TripInfo): NameVal[] => {
  return [
    { name: "Brendan", value: trip.isBrendanIn },
    { name: "Lory", value: trip.isLoryIn },
    { name: "David", value: trip.isDavidIn },
    { name: "Parco", value: trip.isParcoIn },
  ];
};
