const description: string = "This is a description";
const km: string = "12";

describe("Adding New Trip", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.request("DELETE", "http://localhost:1212/trips/delete/all");
  });

  it("Should start with a table without rows, have a container to add new trip without checks", () => {
    cy.get(".css-1ygcj2i-MuiTableCell-root");
    cy.get(
      ".MuiTableBody-root > .MuiTableRow-root > th.MuiTableCell-root",
    ).should("not.exist");
    cy.get(".newTrip__container");
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

  it("Should add new trip to table", () => {
    cy.get(".MuiFormGroup-root > :nth-child(1)").click();
    cy.get(
      ":nth-child(1) > .MuiButtonBase-root > .PrivateSwitchBase-input",
    ).should("be.checked");

    cy.get(".newTrip__input > :nth-child(1) > input").type(km);
    cy.get(".newTrip__input > :nth-child(2) > input").type(description);
    cy.get(".newTrip__container > .MuiButton-root").click();

    cy.get(".MuiTableBody-root > .MuiTableRow-root").should("exist");
    cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(2)").contains(km);
    cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(3)").contains(
      "Brendan",
    );
    cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(4)").contains(
      description,
    );
  });
});

describe("Error Handling", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get(".newTrip__container > .MuiButton-root").click();
  });

  it("Should not let you add trip if nothing is checked or filled", () => {
    cy.get(".newTrip__container > :nth-child(5)").should("be.visible");
    cy.get(":nth-child(1) > .error").should("be.visible");
    cy.get(":nth-child(2) > .error").should("be.visible");
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

  it("should only show appropriate errors after being partially fixed", () => {
    cy.get(".MuiFormGroup-root > :nth-child(1)").click();
    cy.get(".newTrip__container > .MuiButton-root").click();

    cy.get(".error")
      .contains("At least one box must be checked")
      .should("not.exist");
    cy.get(":nth-child(1) > .error").should("be.visible");
    cy.get(":nth-child(2) > .error").should("be.visible");

    cy.get(".newTrip__input > :nth-child(1) > input").type(km);
    cy.get(".newTrip__container > .MuiButton-root").click();

    cy.get(".error").contains("Must have KMs").should("not.exist");
    cy.get(".error")
      .contains("At least one box must be checked")
      .should("not.exist");
    cy.get(":nth-child(2) > .error").should("be.visible");

    cy.get(".newTrip__input > :nth-child(1) > input").clear().type("0");
    cy.get(".newTrip__input > :nth-child(2) > input").type(description);
    cy.get(".newTrip__container > .MuiButton-root").click();
    cy.get(".error")
      .contains("At least one box must be checked")
      .should("not.exist");
    cy.get(".error").contains("Must have KMs").should("exist");
    cy.get(".error").contains("Must have description").should("not.exist");
  });

  it("should remove error if all sections are filled", () => {
    cy.request("DELETE", "http://localhost:1212/trips/delete/all");

    cy.get(".MuiFormGroup-root > :nth-child(1)").click();
    cy.get(".newTrip__container > .MuiButton-root").click();
    cy.get(".error").should("be.visible");
    cy.get(
      ".MuiTableBody-root > .MuiTableRow-root > th.MuiTableCell-root",
    ).should("not.exist");

    cy.get(".newTrip__input > :nth-child(1) > input").type(km);
    cy.get(".newTrip__input > :nth-child(2) > input").type(description);
    cy.get(".newTrip__container > .MuiButton-root").click();

    cy.get(".newTrip__input > .error").should("not.exist");
  });

  //add error handling tests for gas total
});

describe("Adding to history", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.request("DELETE", "http://localhost:1212/trips/delete/all");
  });

  it("Should add collect all trip logs and gas, and add trip to history", () => {
    interface Trip {
      km: string;
      description: string;
      check: string;
      name: string;
    }

    const trips: Trip[] = [
      { km: "14", description: "Gym", check: "2", name: "Lory" },
      { km: "25", description: "Airport", check: "3", name: "David" },
    ];

    trips.map((trip: Trip, index: number) => {
      cy.get(`.MuiFormGroup-root > :nth-child(${trip.check})`).click();
      cy.get(".newTrip__input > :nth-child(1) > input").type(trip.km);
      cy.get(".newTrip__input > :nth-child(2) > input").type(trip.description);
      cy.get(".newTrip__container > .MuiButton-root").click();

      cy.get(".MuiTableBody-root > .MuiTableRow-root").should("exist");
      cy.get(
        `.MuiTableBody-root > :nth-child(${index + 1}) > :nth-child(2)`,
      ).contains(trip.km);
      cy.get(".MuiTableBody-root > .MuiTableRow-root > :nth-child(3)").contains(
        trip.name,
      );
      cy.get(
        `.MuiTableBody-root > :nth-child(${index + 1}) > :nth-child(4)`,
      ).contains(trip.description);
    });
  });
});
