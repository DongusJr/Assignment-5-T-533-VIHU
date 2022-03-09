/// <reference types="cypress" />


describe("📝 TODO app", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  }) 

  it('Should have an empty todo list before get api/list', () => {
    cy.get('[data-testid=todo-item]').should('not.exist')
  })
})

