/// <reference types="cypress" />


describe("📝 TODO app", () => {
  before(() => {
    cy.exec("npm run prisma:reset");
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  }) 

  it('Should have an empty todo list before get api/list', () => {
    cy.get('[data-testid=todo-item]').should('not.exist')
  })

  it('Should add a new todo item on the list when submitted', () => {
    const newItem = 'Workout 💪'

    cy.get('[data-testid=todo-input]').type(`${newItem}{enter}`)
    cy.get('[data-testid=todo-item]').should('have.length', 1)
    cy.get('[data-testid=todo-item]').last().should('have.text', newItem)
  })

  it('Should add another todo item on the list when submitted', () => {
    const newItem = 'Play guitar 🎸'

    cy.get('[data-testid=todo-input]').type(`${newItem}{enter}`)
    cy.get('[data-testid=todo-item]').should('have.length', 2)
    cy.get('[data-testid=todo-item]').last().should('have.text', newItem)
  })

  it('Should remove one item from the list', () => {
    cy.get('[data-testid=todo-item]').first().click()
    cy.get('[data-testid=todo-item]').should('have.length', 1)
  })
})

