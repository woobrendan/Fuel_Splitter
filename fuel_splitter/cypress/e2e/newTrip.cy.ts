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
});
