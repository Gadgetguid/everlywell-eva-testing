# Eva Support Chatbot - Automated Testing Framework

> **Enterprise-grade test automation framework supporting both Playwright and Cypress**
> Built with AI-powered test generation, comprehensive mock services, and performance benchmarking

[![Playwright](https://img.shields.io/badge/Playwright-v1.40-green.svg)](https://playwright.dev/)
[![Cypress](https://img.shields.io/badge/Cypress-v13.0-blue.svg)](https://www.cypress.io/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Quick Start](#quick-start)
- [Testing Frameworks](#testing-frameworks)
- [Mock Chatbot](#mock-chatbot)
- [Running Tests](#running-tests)
- [Performance Benchmarking](#performance-benchmarking)
- [AI-Powered Tools](#ai-powered-tools)
- [Test Scenarios](#test-scenarios)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Best Practices](#best-practices)

## Overview

Enterprise-grade automated testing suite for the Eva Support chatbot featuring:
- **Dual Framework Support**: Complete test coverage in both Playwright and Cypress
- **Mock Infrastructure**: Fully functional local chatbot for development and CI/CD
- **AI Test Generation**: Claude-powered test creation from natural language
- **Performance Benchmarking**: Side-by-side framework comparison tools
- **Healthcare Compliance**: Built-in validations for medical advice deferral and HIPAA considerations

## Key Features

### 🎭 Dual Testing Framework Support
- **Playwright Tests** - Modern, reliable, cross-browser automation
- **Cypress Tests** - Developer-friendly with excellent debugging experience
- **Identical Coverage** - Same 23 test scenarios across both frameworks
- **Easy Comparison** - Built-in benchmarking to evaluate performance

### 🤖 AI-Powered Test Tools
- **Test Generator** - Generate comprehensive test suites from feature descriptions
- **Failure Analyzer** - Intelligent debugging and root cause analysis
- **Healthcare-Aware** - Understands medical compliance requirements

### 🎯 Mock Infrastructure
- Realistic chatbot simulation matching production behavior
- No external dependencies for local development
- CI/CD ready with consistent responses
- Supports iframe-based architecture

### ⚡ Performance Insights
- Side-by-side framework benchmarking
- Execution time comparison
- Pass/fail tracking across frameworks

## Quick Start

### Prerequisites
```bash
node >= 16.0.0
npm >= 8.0.0
python >= 3.8 (for AI tools)
```

### Installation

```bash
# Install Node.js dependencies
npm install

# Install Playwright browsers
npx playwright install

# (Optional) Install Python dependencies for AI tools
pip install -r requirements.txt
export ANTHROPIC_API_KEY='your-api-key-here'
```

### Run Your First Test

```bash
# Start the mock server
npm run mock-server

# In another terminal, run Playwright tests
npm run test:mock:headed

# Or run Cypress tests
npm run cypress:run:mock:headed
```

## Testing Frameworks

### Playwright

**Strengths:**
- True headless mode for faster execution
- Excellent for cross-browser testing (Chrome, Firefox, Safari)
- Better for API testing and network interception
- More reliable auto-waiting mechanisms

**Run Playwright Tests:**
```bash
npm run test:mock           # Headless
npm run test:mock:headed    # With browser UI
npm run test:mock:ui        # Interactive UI mode
```

[📚 Full Playwright Documentation](./docs/PLAYWRIGHT.md)

### Cypress

**Strengths:**
- Superior developer experience with time-travel debugging
- Excellent for visual testing and debugging
- Real-time test execution visualization
- Automatic screenshots and videos on failures

**Run Cypress Tests:**
```bash
npm run cypress:run:mock          # Headless
npm run cypress:run:mock:headed   # With browser UI
npm run cypress:open              # Interactive Test Runner
```

[📚 Full Cypress Documentation](./docs/CYPRESS.md)

## Mock Chatbot

The mock chatbot provides a complete local testing environment:

```bash
# Start mock server on http://localhost:3000
npm run mock-server

# View in browser
open http://localhost:3000/mock-eva-page.html
```

**Mock Features:**
- ✅ Matches production UI structure and data-testid attributes
- ✅ Realistic response patterns for all scenarios
- ✅ Simulated thinking/typing delays
- ✅ Proper medical advice deferral behavior
- ✅ Account management redirection
- ✅ No external API dependencies

## Running Tests

### Against Mock Chatbot (Development)

**Playwright:**
```bash
npm run test:mock           # Fast headless execution
npm run test:mock:headed    # Visual debugging
npm run test:mock:ui        # Interactive mode
```

**Cypress:**
```bash
npm run cypress:run:mock          # Fast headless execution
npm run cypress:run:mock:headed   # Visual debugging
npm run cypress:open              # Interactive Test Runner
```

### Against Production Chatbot

**Playwright:**
```bash
npm run test:real
npm run test:real:headed
```

**Cypress:**
```bash
npm run cypress:run:real
npm run cypress:run:real:headed
```

### Specific Test Files

**Playwright:**
```bash
npx playwright test tests/eva-chatbot.spec.js
npx playwright test tests/eva-chatbot-scenarios.spec.js
```

**Cypress:**
```bash
npx cypress run --spec cypress/e2e/eva-chatbot.cy.js
npx cypress run --spec cypress/e2e/eva-chatbot-scenarios.cy.js
```

## Performance Benchmarking

Compare Playwright vs Cypress execution speed:

```bash
# Run both frameworks simultaneously and compare
npm run benchmark
```

**Example Output:**
```
========================================
Performance Results
========================================

Playwright:          12.45 seconds
Cypress:             18.23 seconds

✓ Playwright is faster by 5.78s (31.71% faster)

Test Status:
  Playwright: PASSED
  Cypress:    PASSED
```

[📚 Benchmarking Guide](./docs/BENCHMARK.md)

## AI-Powered Tools

### 🤖 Test Generator

Generate comprehensive test suites from natural language descriptions.

```bash
python test-generator.py "Feature description"

# Example - Playwright tests
python test-generator.py "Eva chatbot handles timing questions about results and shipping"

# Example - Cypress tests
python cypress-test-generator.py "Eva chatbot validates medical advice deferral"
```

**What it generates:**
- ✅ Happy path scenarios
- ✅ Edge cases and error handling
- ✅ Healthcare-specific validations
- ✅ Proper selectors and assertions
- ✅ Comprehensive test coverage

### 🔍 Failure Analyzer

AI-powered test debugging and root cause analysis.

```bash
python failure-analyzer.py "test name" "error message" [test-file]

# Example
python failure-analyzer.py \
  "Eva responds to TSH question" \
  "TimeoutError: Timeout 30000ms exceeded" \
  tests/eva-chatbot.spec.js
```

**Analysis includes:**
- Root cause identification
- Specific code fixes
- Robustness improvements
- Additional test coverage suggestions
- Healthcare compliance considerations

[📚 AI Tools Documentation](./docs/AI_TOOLS.md)

## Test Scenarios

**23 Comprehensive Test Scenarios** across 5 categories:

### Timing Questions (3 tests)
- When will results be ready?
- How long does shipping take?
- When should I expect my kit?

### Medical Interpretation (5 tests)
- TSH level meaning
- High cortisol interpretation
- Low vitamin D results
- HbA1c level analysis
- Testosterone level questions

**Expected:** Defers to physician, no medication names

### Medical Advice (4 tests)
- Medication for high cholesterol
- Thyroid medication questions
- Vitamin D supplement advice
- Concern about results

**Expected:** Cannot provide medical advice, consult physician

### Account Management (4 tests)
- Cancel test order
- Update shipping address
- View test results
- Return test kit

**Expected:** Direct to account portal or support

### General Health (4 tests)
- Available tests
- Test accuracy
- Pre-test preparation
- Sharing results with doctor

**Expected:** Direct informational answers

## Project Structure

```
everlywell/
├── cypress/
│   ├── e2e/
│   │   ├── eva-chatbot.cy.js              # Basic Cypress test
│   │   ├── eva-chatbot-scenarios.cy.js    # All 23 scenarios
│   │   └── verify-setup.cy.js             # Setup verification
│   ├── reports/                           # Test reports (gitignored)
│   └── screenshots/                       # Failure screenshots (gitignored)
│
├── tests/
│   ├── eva-chatbot.spec.js                # Basic Playwright test
│   ├── eva-chatbot-scenarios.spec.js      # All 23 scenarios
│   └── SCENARIOS.md                       # Test scenario documentation
│
├── docs/
│   ├── PLAYWRIGHT.md                      # Playwright documentation
│   ├── CYPRESS.md                         # Cypress documentation
│   ├── BENCHMARK.md                       # Benchmarking guide
│   └── AI_TOOLS.md                        # AI tools guide
│
├── examples/
│   ├── QUICKSTART.md                      # Quick start for AI tools
│   ├── example-feature-descriptions.md    # Sample feature descriptions
│   └── example-failures.md                # Common failure patterns
│
├── analysis/                              # Generated analyses (gitignored)
│
├── Configuration Files
├── cypress.config.js                      # Cypress configuration
├── cypress-config.js                      # Cypress environment config
├── playwright.config.js                   # Playwright configuration
├── test-config.js                         # Test environment config
│
├── Mock Infrastructure
├── mock-eva-chatbot.html                  # Standalone mock chatbot
├── mock-eva-page.html                     # Iframe wrapper page
├── mock-server.js                         # Local development server
│
├── AI Tools
├── test-generator.py                      # Playwright test generator
├── cypress-test-generator.py              # Cypress test generator
├── failure-analyzer.py                    # Test failure analyzer
│
├── Scripts
├── benchmark-tests.sh                     # Performance benchmarking
├── verify-setup.sh                        # Environment verification
│
└── Documentation
    ├── README.md                          # This file
    ├── START_HERE.md                      # Getting started guide
    ├── WALKTHROUGH.md                     # Detailed walkthrough
    └── requirements.txt                   # Python dependencies
```

## Configuration

### Switching Between Mock and Production

**Environment Variable (Recommended):**
```bash
TEST_MODE=mock npm run test      # Use mock chatbot
TEST_MODE=real npm run test      # Use production chatbot
```

**Configuration Files:**
- `test-config.js` - Playwright environment configuration
- `cypress-config.js` - Cypress environment configuration

### Updating Production URL

Edit the respective config file:

```javascript
// test-config.js or cypress-config.js
real: {
  url: 'https://www.everlywell.com/support/eva',
  useIframe: true
}
```

## Best Practices

### Test Development Workflow

1. **Start with Mock** - Validate test logic locally
2. **Use Headed Mode** - Debug visually during development
3. **Run Both Frameworks** - Ensure consistent coverage
4. **Benchmark Performance** - Optimize execution time
5. **Validate Production** - Test against real chatbot

### When to Use Each Framework

**Use Playwright when:**
- Running in CI/CD pipelines (faster headless execution)
- Cross-browser testing is required
- API testing or network interception needed
- Performance is critical

**Use Cypress when:**
- Developing new tests (better DX)
- Debugging test failures (time-travel debugging)
- Visual regression testing needed
- Team prefers Cypress workflow

### Healthcare Testing Considerations

- ✅ Always verify medical advice deferral
- ✅ Ensure no medication names in responses
- ✅ Validate HIPAA compliance patterns
- ✅ Test account management redirection
- ✅ Verify appropriate response boundaries

## Common Issues & Solutions

### Mock Server Won't Start
```bash
# Check if port 3000 is in use
lsof -ti:3000 | xargs kill -9

# Restart server
npm run mock-server
```

### Tests Pass Locally But Fail in CI
- Ensure `TEST_MODE=mock` is set in CI environment
- Verify mock server is running before tests
- Check for race conditions with async operations

### Flaky Tests
- Increase timeout values for slow networks
- Add explicit waits for dynamic content
- Use the failure analyzer tool for debugging

## Documentation

- [START_HERE.md](./START_HERE.md) - Beginner's guide
- [WALKTHROUGH.md](./WALKTHROUGH.md) - Step-by-step tutorial
- [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) - Presentation guide
- [GIT_SETUP.md](./GIT_SETUP.md) - Git workflow guide

## Contributing

This project follows enterprise testing standards:

1. Test all changes against both frameworks
2. Update documentation for new features
3. Run benchmarks to verify performance
4. Ensure healthcare compliance validations

## Support & Resources

- **Playwright Documentation**: https://playwright.dev
- **Cypress Documentation**: https://www.cypress.io
- **Claude AI**: https://www.anthropic.com/claude

---

**Built by:** Sr. QA AI Automation Engineer
**Framework Versions:** Playwright 1.40+ | Cypress 13.0+
**Last Updated:** November 2025
