import { fireEvent, Matcher, MatcherOptions } from "@testing-library/react";

export interface Trip {
  km: string;
  description: string;
  names: string[];
}

export const trips: Trip[] = [
  { km: "25", description: "Airport", names: ["David"] },
  {
    km: "14",
    description: "Gym",
    names: ["Lory", "Brendan", "Parco", "David"],
  },
  { km: "9", description: "Physio", names: ["David", "Lory"] },
];

export const checkEachName = (
  trip: Trip,
  getter: (id: Matcher, options?: MatcherOptions | undefined) => HTMLElement,
) => {
  trip.names.forEach((name) => {
    fireEvent.click(getter(`checkbox_${name}`));
  });
};
