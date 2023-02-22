const costPerL = "1.72";
const totalGas = "72.89 ";
import { Trip, trips, checkEachName } from "../helpers/model_functions";

describe("Final Gas Totals", () => {
  beforeEach(() => {
    cy.request("DELETE", "http://localhost:1212/trips/delete/all");
    cy.visit("http://localhost:3000/");
  });

  it("Should have 3 errors without info", () => {
    cy.get('[data-testid="submit_all"]').click();

    cy.get('[data-cy="no_trips"]').should("exist");
    cy.get('[data-cy="gasCost_error"]').should("exist");
    cy.get('[data-cy="costPerL_error"]').should("exist");
  });

  it("Should only have two input errors when trips are added", () => {
    const trip = trips[0];

    checkEachName(trip);

    cy.get(
      `[data-testid="checkbox_${trip.names[0]}"] > .PrivateSwitchBase-input`,
    ).should("be.checked");

    cy.get('[data-testid="totalKM"]').type(trip.km);
    cy.get('[data-testid="description"]').type(trip.description);
    cy.get('[data-testid="submit_trip"]').click();
    cy.get('[data-testid="submit_all"]').click();

    cy.get('[data-cy="gasCost_error"]').should("exist");
    cy.get('[data-cy="costPerL_error"]').should("exist");
  });

  it("Should only show appropriate errors after being partially fixed", () => {
    cy.get('[data-testid="submit_all"]').click();
    cy.get('[data-testid="costPerL"]').clear().type(costPerL);
    cy.get('[data-testid="submit_all"]').click();

    cy.get('[data-cy="gasCost_error"]').should("exist");
    cy.get('[data-cy="costPerL_error"]').should("not.exist");
    cy.get('[data-cy="no_trips"]').should("exist");

    cy.get('[data-testid="costPerL"]').clear();
    cy.get('[data-testid="gasCost"]').clear().type(totalGas);
    cy.get('[data-testid="submit_all"]').click();

    cy.get('[data-cy="gasCost_error"]').should("not.exist");
    cy.get('[data-cy="costPerL_error"]').should("exist");
    cy.get('[data-cy="no_trips"]').should("exist");
  });
});
