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

export const addAndAssertTrips = () => {
  trips.forEach((trip: Trip, index: number) => {
    checkEachName(trip);
    cy.get('[data-testid="totalKM"]').type(trip.km);
    cy.get('[data-testid="description"]').type(trip.description);
    cy.get('[data-testid="submit_trip"]').click();

    cy.get(
      `.MuiTableBody-root > :nth-child(${index + 1}) > :nth-child(2)`,
    ).contains(trip.km);

    trip.names.forEach((name: string) =>
      cy
        .get(`.MuiTableBody-root > :nth-child(${index + 1}) > :nth-child(3)`)
        .contains(name),
    );
    cy.get(
      `.MuiTableBody-root > :nth-child(${index + 1}) > :nth-child(4)`,
    ).contains(trip.description);
  });
};
