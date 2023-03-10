import history from "../seeds/history";
import {
  Trip,
  trips,
  checkEachName,
  addAndAssertTrips,
} from "../helpers/model_functions";

describe("Adding New Trip", () => {
  beforeEach(() => {
    cy.request("DELETE", "http://localhost:1212/trips/delete/all");
    cy.visit("http://localhost:3000/");
  });

  it("Should start with a table without rows, have a container to add new trip without checks", () => {
    cy.get(
      ".MuiTableBody-root > .MuiTableRow-root > th.MuiTableCell-root",
    ).should("not.exist");
    cy.get(".newTrip__container").should("exist");
    cy.get('[data-testid="checkbox_Brendan"]').should("not.be.checked");
    cy.get('[data-testid="checkbox_David"]').should("not.be.checked");
    cy.get('[data-testid="checkbox_Lory"]').should("not.be.checked");
    cy.get('[data-testid="checkbox_Parco"]').should("not.be.checked");
  });

  it("Should add new trip to table", () => {
    const trip = trips[0];

    checkEachName(trip);

    cy.get(
      `[data-testid="checkbox_${trip.names[0]}"] > .PrivateSwitchBase-input`,
    ).should("be.checked");

    cy.get('[data-testid="totalKM"]').type(trip.km);
    cy.get('[data-testid="description"]').type(trip.description);
    cy.get('[data-testid="submit_trip"]').click();

    cy.get(".MuiTableBody-root > .MuiTableRow-root").should("exist");
    cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(2)").contains(
      trip.km,
    );
    cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(3)").contains(
      trip.names[0],
    );
    cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(4)").contains(
      trip.description,
    );
  });

  it("Should add new trip with multiple people on trip", () => {
    trips.forEach((trip: Trip, index: number) => {
      checkEachName(trip);
      cy.get('[data-testid="totalKM"]').type(trip.km);
      cy.get('[data-testid="description"]').type(trip.description);
      cy.get('[data-testid="submit_trip"]').click();

      cy.get(
        `.MuiTableBody-root > :nth-child(${index + 1}) > :nth-child(2)`,
      ).contains(trip.km);

      trip.names.forEach((name) =>
        cy
          .get(`.MuiTableBody-root > :nth-child(${index + 1}) > :nth-child(3)`)
          .contains(name),
      );
      cy.get(
        `.MuiTableBody-root > :nth-child(${index + 1}) > :nth-child(4)`,
      ).contains(trip.description);
    });
  });
});

describe("Error Handling", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get('[data-testid="submit_trip"]').click();
  });

  it("Should not let you add trip if nothing is checked or filled", () => {
    cy.get(".newTrip__container > :nth-child(5)").should("be.visible");
    cy.get(":nth-child(1) > .error").should("be.visible");
    cy.get(":nth-child(2) > .error").should("be.visible");
    cy.get(
      ".MuiTableBody-root > .MuiTableRow-root > th.MuiTableCell-root",
    ).should("not.exist");
  });

  it("Should show invalid date when date is invalid", () => {
    cy.get("input:first").clear().type("16-15-1002");

    cy.get('[data-testid="submit_trip"]').click();

    cy.get(".Mui-error").contains("invalidDate");
  });

  it("Should show invalid date, then remove error when fixed", () => {
    cy.get("input:first").clear().type("16-15-1002");
    cy.get('[data-testid="submit_trip"]').click();
    cy.get(".Mui-error").contains("invalidDate");

    cy.get("input:first").clear().type("02-24-2023");
    cy.get(".Mui-error").should("not.exist");
  });

  it("should only have one error if checked", () => {
    cy.get(".MuiFormGroup-root > :nth-child(1)").click();
    cy.get('[data-testid="submit_trip"]').click();
    cy.get(
      ".MuiTableBody-root > .MuiTableRow-root > th.MuiTableCell-root",
    ).should("not.exist");
    cy.get(".error").should("be.visible");
  });

  it("should only show appropriate errors after being partially fixed", () => {
    const trip = trips[0];

    cy.get(".MuiFormGroup-root > :nth-child(1)").click();
    cy.get('[data-testid="submit_trip"]').click();

    cy.get(".error")
      .contains("At least one box must be checked")
      .should("not.exist");
    cy.get(":nth-child(1) > .error").should("be.visible");
    cy.get(":nth-child(2) > .error").should("be.visible");

    cy.get('[data-testid="totalKM"]').type(trip.km);
    cy.get('[data-testid="submit_trip"]').click();

    cy.get(".error").contains("Must have Total KM").should("not.exist");
    cy.get(".error")
      .contains("At least one box must be checked")
      .should("not.exist");
    cy.get(":nth-child(2) > .error").should("be.visible");

    cy.get('[data-testid="totalKM"]').clear().type("0");
    cy.get('[data-testid="description"]').type(trip.description);
    cy.get('[data-testid="submit_trip"]').click();
    cy.get(".error")
      .contains("At least one box must be checked")
      .should("not.exist");
    cy.get(".error").contains("Must have Total KM").should("exist");
    cy.get(".error").contains("Must have Trip Description").should("not.exist");
  });

  it("should remove error if all sections are filled", () => {
    const trip = trips[0];

    cy.request("DELETE", "http://localhost:1212/trips/delete/all");

    cy.get(".MuiFormGroup-root > :nth-child(1)").click();
    cy.get('[data-testid="submit_trip"]').click();
    cy.get(".error").should("be.visible");
    cy.get(
      ".MuiTableBody-root > .MuiTableRow-root > th.MuiTableCell-root",
    ).should("not.exist");

    cy.get('[data-testid="totalKM"]').type(trip.km);
    cy.get('[data-testid="description"]').type(trip.description);
    cy.get('[data-testid="submit_trip"]').click();

    cy.get(".newTrip__input > .error").should("not.exist");
  });

  //add error handling tests for gas total
});

describe("Adding to history", () => {
  beforeEach(() => {
    cy.request("DELETE", "http://localhost:1212/trips/delete/all");
    cy.request("DELETE", "http://localhost:1212/history/delete/all");
    cy.visit("http://localhost:3000/");
  });

  it("Should add collect all trip logs and gas, and add trip to history", () => {
    const costPerL = "1.72";
    const totalGas = "72.89 ";

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

    cy.get('[data-testid="costPerL"]').clear().type(costPerL);
    cy.get('[data-testid="gasCost"]').clear().type(totalGas);
    cy.get('[data-testid="submit_all"]').click();

    cy.url().should("eq", "http://localhost:3000/history");
    cy.get('[data-testid="total_price"]').contains(Number(totalGas));
    cy.get('[data-testid="cost_L"]').contains(Number(costPerL));
  });

  after(() => {
    history.forEach((trip) => {
      cy.request("DELETE", "http://localhost:1212/history/delete/all");
      cy.request("POST", "http://localhost:1212/history/new", trip);
    });
  });
});
