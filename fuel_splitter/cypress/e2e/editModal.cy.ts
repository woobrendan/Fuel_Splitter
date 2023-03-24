import { trips, addAndAssertTrips } from "../helpers/model_functions";

describe.only("Edit Modal", () => {
  beforeEach(() => {
    cy.request("DELETE", "http://localhost:1212/trips/all");
    cy.visit("http://localhost:3000/");
    addAndAssertTrips();
  });

  it("Should open on click and have matching trip info", () => {
    const newKm = "100";
    const newDescription = "A long trip";
    cy.get('[data-testid="edit_trip_0"]').click();
    cy.get('.modal__input > :nth-child(1) > [data-testid="totalKM"]').should(
      "have.value",
      trips[0].km,
    );
    cy.get(
      '.modal__input > :nth-child(2) > [data-testid="description"]',
    ).should("have.value", trips[0].description);
    cy.get(
      `[data-testid="checkbox_${trips[0].names[0]}"] > .PrivateSwitchBase-input`,
    ).should("be.checked");

    cy.get('.modal__input > :nth-child(1) > [data-testid="totalKM"]')
      .clear()
      .type(newKm)
      .should("have.value", newKm);
    cy.get('.modal__input > :nth-child(2) > [data-testid="description"]')
      .clear()
      .type(newDescription)
      .should("have.value", newDescription);
  });

  it.only("Should be able to delete trip", () => {
    cy.get('[data-testid="edit_trip_0"]').click();
    cy.get('[data-testid="modal_delete_confirm"]').should("not.exist");
    cy.get('[data-testid="modal_delete"]').click();
    cy.get('[data-testid="modal_delete_confirm"]').click();

    cy.get(`.MuiTableBody-root > :nth-child(1) > :nth-child(2)`).should(
      "not.contain",
      trips[0].km,
    );
  });

  after(() => {
    cy.request("DELETE", "http://localhost:1212/trips/delete/all");
  });
});
