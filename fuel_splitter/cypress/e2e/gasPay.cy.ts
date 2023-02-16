const costPerL = "1.72";
const totalGas = "72.89 ";

describe("Final Gas Totals", () => {
  beforeEach(() => {
    cy.request("DELETE", "http://localhost:1212/trips/delete/all");
    cy.visit("http://localhost:3000/");
  });

  it("Should have 3 errors without info", () => {
    cy.get('[data-cy="submit_all"]').click();

    cy.get('[data-cy="no_trips"]').should("exist");
    cy.get('[data-cy="gas_paid_error"]').should("exist");
    cy.get('[data-cy="cost_L_error"]').should("exist");
  });

  it("Should not allow you to submit without any trips", () => {
    // cy.get('[data-cy="cost_per_L"]').clear().type(costPerL);
    // cy.get('[data-cy="total_cost"]').clear().type(totalGas);
    cy.get('[data-cy="submit_all"]').click();

    cy.get('[data-cy="no_trips"]').should("exist");
  });
});
