const { CHATBOT_URL, USE_IFRAME, TEST_MODE } = require('../../cypress-config');

describe('Cypress Setup Verification', () => {
  it('should load configuration correctly', () => {
    cy.log(`Test Mode: ${TEST_MODE}`);
    cy.log(`Chatbot URL: ${CHATBOT_URL}`);
    cy.log(`Use Iframe: ${USE_IFRAME}`);

    // Verify configuration is loaded
    expect(TEST_MODE).to.be.a('string');
    expect(CHATBOT_URL).to.be.a('string');
    expect(USE_IFRAME).to.be.a('boolean');
  });

  it('should be able to visit a webpage', () => {
    // Just verify we can visit Google as a basic test
    cy.visit('https://www.google.com', { timeout: 10000 });
    cy.get('body').should('exist');
  });
});
