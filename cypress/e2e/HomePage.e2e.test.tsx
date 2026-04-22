/// <reference types="cypress" />

describe("HomePage", () => {
  beforeEach(() => {
    cy.visit("/", {
      onBeforeLoad(win) {
        cy.stub(win, "open").as("windowOpen");
      },
    });
  });

  it("updates the active sidebar item when navigation links are clicked", () => {
    cy.get('aside[aria-label="Workspace navigation"]').as("sidebar");

    cy.get("@sidebar").contains("a", "Overview").should("have.attr", "aria-current", "page");

    cy.get("@sidebar").contains("a", "Components").click();
    cy.get("@sidebar").contains("a", "Components").should("have.attr", "aria-current", "page");
    cy.get("@sidebar").contains("a", "Overview").should("not.have.attr", "aria-current");

    cy.get("@sidebar").contains("a", "Tokens").click();
    cy.get("@sidebar").contains("a", "Tokens").should("have.attr", "aria-current", "page");
  });

  it("supports theme switching, dropdown actions, and modal interactions", () => {
    cy.contains("button", "Dim").click();
    cy.contains("button", "Dim").should("have.attr", "aria-pressed", "true");

    cy.contains("button", "Component actions").click();
    cy.get('[role="menu"][aria-label="Component actions"]').within(() => {
      cy.contains('[role="menuitem"]', "Review tokens").click();
    });
    cy.get('[role="menu"][aria-label="Component actions"]').should("not.exist");

    cy.contains("button", "Open component brief").click();
    cy.get('[role="dialog"][aria-modal="true"]').should("contain.text", "Composition brief");

    cy.contains("button", "Close brief").click();
    cy.get('[role="dialog"]').should("not.exist");
  });

  it("exercises the composition section and validation content", () => {
    cy.get('aside[aria-label="Workspace navigation"]').as("sidebar");

    cy.get("@sidebar").contains("a", "Composition").click();
    cy.get("@sidebar").contains("a", "Composition").should("have.attr", "aria-current", "page");

    cy.contains("button", "Stable").click();
    cy.get('[role="menu"][aria-label="Release channels"]').within(() => {
      cy.contains('[role="menuitem"]', "Beta").should("be.visible");
    });

    cy.get("@sidebar").contains("a", "System notes").click();
    cy.get("@sidebar").contains("a", "System notes").should("have.attr", "aria-current", "page");
    cy.contains("Atomic design methodology").should("be.visible");
    cy.contains("WCAG AA readiness").should("be.visible");
  });
});
