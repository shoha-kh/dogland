// https://docs.cypress.io/api/introduction/api.html

describe('Login page', () => {
  it('Log-in to admin panel', () => {
    cy.visit('/login')
    cy.get('input[type=email]')
      .type('admin@test.com')
    cy.get('input[type=password]')
      .type('Test123123')
    cy.contains('button')
      .click()
  })
})