describe("Adding New Trip", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Should have a table without rows, and have container to add new trip", () => {
    cy.get(".css-1ygcj2i-MuiTableCell-root");
    cy.get(
      ".MuiTableBody-root > .MuiTableRow-root > th.MuiTableCell-root",
    ).should("not.exist");
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

  it("Should add new trip to table", () => {
    cy.get(".MuiFormGroup-root > :nth-child(1)").click();
    cy.get(".newTrip__input > input").type("12");
    cy.get(".newTrip__container > .MuiButton-root").click();
    cy.get(
      ".MuiTableBody-root > .MuiTableRow-root > th.MuiTableCell-root",
    ).should("exist");
    cy.get("td.MuiTableCell-alignCenter").contains("12");
    cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(3)").contains(
      "Brendan",
    );
  });
});

describe("Error Handling", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Should not let you add trip if nothing is checked or filled", () => {
    cy.get(".newTrip__container > .MuiButton-root").click();
    cy.get(".newTrip__container > :nth-child(5)").should("be.visible");
    cy.get(".newTrip__input > .error").should("be.visible");
    cy.get(
      ".MuiTableBody-root > .MuiTableRow-root > th.MuiTableCell-root",
    ).should("not.exist");
  });

  it("should only have one error if checked", () => {
    cy.get(".MuiFormGroup-root > :nth-child(1)").click();
    cy.get(".newTrip__container > .MuiButton-root").click();
    cy.get(
      ".MuiTableBody-root > .MuiTableRow-root > th.MuiTableCell-root",
    ).should("not.exist");
    cy.get(".error").should("be.visible");
  });

  it("should remove error if all sections are filled", () => {
    cy.get(".MuiFormGroup-root > :nth-child(1)").click();
    cy.get(".newTrip__container > .MuiButton-root").click();
    cy.get(".error").should("be.visible");
    cy.get(
      ".MuiTableBody-root > .MuiTableRow-root > th.MuiTableCell-root",
    ).should("not.exist");

    cy.get(".MuiFormGroup-root > :nth-child(1)").click();
    cy.get(".newTrip__input > input").type("12");
    cy.get(".newTrip__container > .MuiButton-root").click();
    cy.get(".newTrip__container > :nth-child(5)").should("be.visible");
    cy.get(".newTrip__input > .error").should("not.exist");
  });
});
