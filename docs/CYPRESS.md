# Cypress Testing Guide

> Complete guide for running and developing Cypress tests for the Eva Support Chatbot

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Configuration](#configuration)
- [Best Practices](#best-practices)
- [Debugging](#debugging)
- [Reporting](#reporting)

## Overview

Cypress provides an excellent developer experience with time-travel debugging, automatic waiting, and real-time test execution visualization. Our Cypress suite covers all 23 test scenarios for the Eva chatbot.

### Why Cypress?

**Strengths:**
- **Superior DX**: Best-in-class developer experience with interactive Test Runner
- **Time-Travel Debugging**: Step through each command and see exactly what happened
- **Automatic Screenshots**: Captures failures automatically
- **Real-time Reloading**: Instantly see test changes
- **Visual Testing**: Watch tests execute in real-time

**When to Use:**
- Developing new test scenarios
- Debugging complex interactions
- Visual validation requirements
- Team preference for Cypress workflow

## Getting Started

### Installation

```bash
# Install dependencies (includes Cypress)
npm install

# Verify Cypress installation
npx cypress verify
```

### First Test Run

```bash
# Start mock server (in one terminal)
npm run mock-server

# Run Cypress tests (in another terminal)
npm run cypress:run:mock:headed
```

## Running Tests

### Interactive Test Runner

The Test Runner provides the best development experience:

```bash
# Open Cypress Test Runner
npm run cypress:open

# Select E2E Testing
# Choose your browser
# Click on a test file to run it
```

**Features:**
- Select specific tests to run
- Real-time test execution
- Time-travel through each command
- Automatic screenshot on hover
- Console and network logs

### Command Line Execution

#### Mock Environment (Development)

```bash
# Headless mode (fast, no UI)
npm run cypress:run:mock

# Headed mode (see browser)
npm run cypress:run:mock:headed

# Specific test file
npx cypress run --spec cypress/e2e/eva-chatbot.cy.js
```

#### Production Environment

```bash
# Headless mode
npm run cypress:run:real

# Headed mode
npm run cypress:run:real:headed
```

### Running Specific Tests

```bash
# Single test file
npx cypress run --spec "cypress/e2e/eva-chatbot.cy.js"

# Multiple test files
npx cypress run --spec "cypress/e2e/eva-chatbot*.cy.js"

# Specific test by grep
npx cypress run --spec "cypress/e2e/eva-chatbot-scenarios.cy.js" --grep "TSH"
```

### Browser Selection

```bash
# Chrome (default)
npx cypress run --browser chrome

# Firefox
npx cypress run --browser firefox

# Edge
npx cypress run --browser edge

# Electron (headless)
npx cypress run --browser electron
```

## Test Structure

### File Organization

```
cypress/
├── e2e/
│   ├── eva-chatbot.cy.js              # Basic TSH test
│   ├── eva-chatbot-scenarios.cy.js    # All 23 scenarios
│   └── verify-setup.cy.js             # Setup verification
├── reports/                            # Mochawesome reports
├── screenshots/                        # Failure screenshots
└── videos/                            # Test execution videos
```

### Test File Anatomy

```javascript
// cypress/e2e/eva-chatbot.cy.js
const { CHATBOT_URL, USE_IFRAME } = require('../../cypress-config');

describe('Eva Support Chatbot', () => {
  beforeEach(() => {
    cy.visit(CHATBOT_URL);
    cy.wait(2000); // Allow page to fully load
  });

  it('should respond to TSH question', () => {
    // Get chat interface (with or without iframe)
    const chatInterface = USE_IFRAME
      ? cy.get('iframe').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap)
      : cy.get('body');

    // Interact with chatbot
    chatInterface.find('[data-testid="message-input"]').type('What does my TSH level mean?');
    chatInterface.find('[data-testid="send-button"]').click();

    // Wait for response
    cy.wait(3000);

    // Verify response
    chatInterface.find('[data-testid="eva-response"]').last().invoke('text').then(text => {
      const lowerText = text.toLowerCase();
      expect(lowerText).to.include('physician');
      expect(lowerText).not.to.match(/\b(levothyroxine|synthroid|cytomel)\b/i);
    });
  });
});
```

### Key Differences from Playwright

| Feature | Cypress | Playwright |
|---------|---------|------------|
| Syntax | `describe()` / `it()` | `test.describe()` / `test()` |
| Assertions | Chai (`.to.include()`) | Expect (`.toContain()`) |
| Async/Await | Not used (auto-handled) | Required |
| Iframe Access | `.its('0.contentDocument.body')` | `frameLocator()` |
| Commands | `cy.get()`, `cy.should()` | `page.locator()`, `expect()` |

## Configuration

### Main Configuration

**File:** `cypress.config.js`

```javascript
module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    timestamp: 'mmddyyyy_HHMMss'
  },
  e2e: {
    baseUrl: null,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    video: false,
    screenshotOnRunFailure: true,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
  }
});
```

### Environment Configuration

**File:** `cypress-config.js`

```javascript
const TEST_MODE = process.env.TEST_MODE || 'mock';

const config = {
  mock: {
    url: 'http://localhost:3000/mock-eva-page.html',
    useIframe: true
  },
  real: {
    url: 'https://www.everlywell.com/support/eva',
    useIframe: true
  }
};

module.exports = config[TEST_MODE];
```

### Custom Timeouts

Adjust timeouts in individual tests:

```javascript
it('should handle slow response', { defaultCommandTimeout: 15000 }, () => {
  // Test with 15s timeout instead of default 10s
  cy.get('[data-testid="slow-element"]').should('be.visible');
});
```

## Best Practices

### Selector Strategy

**Use data-testid attributes (recommended):**
```javascript
cy.get('[data-testid="message-input"]')   // ✅ Stable
```

**Avoid fragile selectors:**
```javascript
cy.get('.css-class-xyz')                  // ❌ Breaks with CSS changes
cy.contains('Submit')                     // ❌ Breaks with text changes
```

### Waiting for Elements

Cypress auto-waits, but sometimes you need explicit waits:

```javascript
// Wait for element
cy.get('[data-testid="eva-response"]', { timeout: 10000 })
  .should('be.visible');

// Wait for specific condition
cy.get('[data-testid="eva-response"]')
  .should('contain.text', 'physician');

// Fixed wait (use sparingly)
cy.wait(2000);
```

### Handling Iframes

```javascript
const chatInterface = USE_IFRAME
  ? cy.get('iframe')
      .its('0.contentDocument.body')
      .should('not.be.empty')
      .then(cy.wrap)
  : cy.get('body');

chatInterface.find('[data-testid="message-input"]').type('Hello');
```

### Assertions

**Text validation:**
```javascript
cy.get('[data-testid="response"]')
  .invoke('text')
  .then(text => {
    expect(text.toLowerCase()).to.include('physician');
    expect(text).not.to.match(/medication-name/i);
  });
```

**Visibility:**
```javascript
cy.get('[data-testid="element"]').should('be.visible');
cy.get('[data-testid="element"]').should('not.exist');
```

**Multiple assertions:**
```javascript
cy.get('[data-testid="response"]')
  .should('be.visible')
  .and('contain', 'physician')
  .and('not.contain', 'medication');
```

## Debugging

### Interactive Debugging

**Use the Test Runner:**
1. Open Test Runner: `npm run cypress:open`
2. Click on failing test
3. Hover over commands to see DOM snapshots
4. Use time-travel to step through execution
5. Check console and network tabs

**Add debugger:**
```javascript
it('should debug this test', () => {
  cy.get('[data-testid="input"]').type('test');
  cy.pause(); // Pause execution
  cy.get('[data-testid="button"]').click();
});
```

### Console Logging

```javascript
// Log element text
cy.get('[data-testid="response"]')
  .invoke('text')
  .then(text => cy.log('Response:', text));

// Log to browser console
cy.get('[data-testid="response"]')
  .then(($el) => console.log('Element:', $el));
```

### Screenshots and Videos

**Automatic screenshots:**
- Enabled by default on failure
- Saved to `cypress/screenshots/`

**Manual screenshots:**
```javascript
cy.screenshot('custom-screenshot-name');
```

**Videos:**
- Enable in `cypress.config.js`: `video: true`
- Saved to `cypress/videos/`
- Only recorded in headless mode

### Debug Failed Tests

```bash
# Run specific test in headed mode
npx cypress run --spec "cypress/e2e/eva-chatbot.cy.js" --headed --no-exit

# Open Test Runner for specific file
npx cypress open --config specPattern="cypress/e2e/eva-chatbot.cy.js"
```

## Reporting

### Mochawesome Reports

Cypress is configured with Mochawesome for beautiful HTML reports.

**View report:**
```bash
# After running tests
npm run cypress:report

# Or manually
open cypress/reports/mochawesome-report.html
```

**Report features:**
- Pass/fail statistics
- Test duration
- Screenshots on failures
- Stack traces
- Filterable results

### Custom Reporting

**Console output:**
```bash
# Spec reporter (default)
npx cypress run --reporter spec

# JSON reporter
npx cypress run --reporter json --reporter-options "toConsole=false"
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Cypress Tests

on: [push, pull_request]

jobs:
  cypress:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm ci

      - name: Start mock server
        run: npm run mock-server &

      - name: Wait for server
        run: npx wait-on http://localhost:3000

      - name: Run Cypress tests
        run: npm run cypress:run:mock

      - name: Upload screenshots
        uses: actions/upload-artifact@v2
        if: failure()
        with:
          name: cypress-screenshots
          path: cypress/screenshots

      - name: Upload reports
        uses: actions/upload-artifact@v2
        with:
          name: cypress-reports
          path: cypress/reports
```

## Common Issues

### Port 3000 Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Restart mock server
npm run mock-server
```

### Iframe Not Loading

```javascript
// Add wait for iframe
cy.get('iframe', { timeout: 10000 })
  .its('0.contentDocument.body')
  .should('not.be.empty');
```

### Flaky Tests

**Add retry configuration:**
```javascript
// In cypress.config.js
e2e: {
  retries: {
    runMode: 2,    // Retry twice in headless
    openMode: 0    // No retries in Test Runner
  }
}
```

**Or per test:**
```javascript
it('flaky test', { retries: 2 }, () => {
  // Test code
});
```

### Element Not Found

```javascript
// Increase timeout
cy.get('[data-testid="element"]', { timeout: 15000 })
  .should('exist');

// Wait for stability
cy.get('[data-testid="element"]')
  .should('be.visible')
  .and('not.be.disabled');
```

## Advanced Topics

### Custom Commands

Create reusable commands in `cypress/support/commands.js`:

```javascript
Cypress.Commands.add('sendChatMessage', (message) => {
  cy.get('[data-testid="message-input"]').type(message);
  cy.get('[data-testid="send-button"]').click();
  cy.wait(2000);
});

// Usage
cy.sendChatMessage('What is my TSH level?');
```

### Network Interception

```javascript
cy.intercept('POST', '/api/chat', {
  statusCode: 200,
  body: { response: 'Mocked response' }
}).as('chatRequest');

cy.sendChatMessage('Hello');
cy.wait('@chatRequest');
```

### Viewport Testing

```javascript
describe('Responsive tests', () => {
  it('should work on mobile', () => {
    cy.viewport('iphone-x');
    cy.visit(CHATBOT_URL);
    // Test mobile view
  });

  it('should work on tablet', () => {
    cy.viewport('ipad-2');
    cy.visit(CHATBOT_URL);
    // Test tablet view
  });
});
```

## Resources

- **Official Docs**: https://docs.cypress.io
- **Best Practices**: https://docs.cypress.io/guides/references/best-practices
- **Examples**: https://github.com/cypress-io/cypress-example-recipes
- **API Reference**: https://docs.cypress.io/api/table-of-contents

---

[← Back to Main README](../README.md)
