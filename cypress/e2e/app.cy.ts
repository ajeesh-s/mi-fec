describe('My App Test', () => {
  it('Visits the app', () => {
    cy.visit('http://localhost:3000');
    cy.intercept('GET', 'http://localhost:3001/categories').as('apiCall');
    cy.wait('@apiCall');
    cy.contains('VManager Demo v0.0.1');
  });
});