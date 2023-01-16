describe("Adding New Trip", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Should have a table", () => {
    cy.get(".css-1ygcj2i-MuiTableCell-root");
  });

  it("Should have a table without rows", () => {
    cy.get(
      ".MuiTableBody-root > .MuiTableRow-root > th.MuiTableCell-root",
    ).should("not.exist");
  });

  it("Should have container to add new trip", () => {
    cy.get(".newTrip__container");
  });

  it("New Trip should not have any checks", () => {
    cy.get(
      ":nth-child(1) > .MuiButtonBase-root > .PrivateSwitchBase-input",
    ).should("not.be.checked");
    cy.get(
      ":nth-child(2) > .MuiButtonBase-root > .PrivateSwitchBase-input",
    ).should("not.be.checked");
    cy.get(
      ":nth-child(3) > .MuiButtonBase-root > .PrivateSwitchBase-input",
    ).should("not.be.checked");
    cy.get(
      ":nth-child(4) > .MuiButtonBase-root > .PrivateSwitchBase-input",
    ).should("not.be.checked");
  });

  it("Should be able to add trip participants", () => {
    cy.get(".MuiFormGroup-root > :nth-child(1)").click();
    cy.get(
      ":nth-child(1) > .MuiButtonBase-root > .PrivateSwitchBase-input",
    ).should("be.checked");
  });
});
