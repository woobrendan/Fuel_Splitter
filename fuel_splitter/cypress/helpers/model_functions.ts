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

export const checkEachName = (trip: Trip) => {
  trip.names.forEach((name) => {
    cy.get(`[data-testid="checkbox_${name}"]`).click(),
      cy
        .get(`[data-testid="checkbox_${name}"] > .PrivateSwitchBase-input`)
        .should("be.checked");
  });
};
