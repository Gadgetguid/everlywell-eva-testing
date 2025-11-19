# Eva Support Chatbot - Playwright Tests

Automated testing suite for the Eva Support chatbot with a complete mock chatbot for local testing.

## 📋 Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Mock Chatbot](#mock-chatbot)
- [Running Tests](#running-tests)
- [Test Scenarios](#test-scenarios)
- [Configuration](#configuration)
- [Python AI Tools](#python-ai-tools)
- [Project Structure](#project-structure)

## Overview

This project contains comprehensive Playwright tests for the Eva Support chatbot, along with a fully functional mock chatbot for local testing. The mock chatbot simulates all expected behaviors and responses, allowing you to validate your tests before running them against the real Eva chatbot.

## Quick Start

### 1. Install Dependencies

```bash
npm install
npx playwright install
```

### 2. Start the Mock Server

In one terminal window:

```bash
npm run mock-server
```

This starts a local server at `http://localhost:3000`

### 3. Run Tests Against Mock Chatbot

In another terminal window:

```bash
npm run test:mock:headed
```

This runs all tests against the mock chatbot with a visible browser.

## Mock Chatbot

The mock chatbot (`mock-eva-chatbot.html`) is a fully functional chatbot that:

- ✅ Matches the same UI structure and data-testid attributes as the real Eva chatbot
- ✅ Responds appropriately to all test scenarios
- ✅ Simulates realistic thinking/typing delays
- ✅ Handles timing questions (results, shipping, delivery)
- ✅ Defers medical interpretation questions to physicians
- ✅ Redirects account management to support
- ✅ Provides direct answers to general health questions
- ✅ Never mentions specific medications

### Viewing the Mock Chatbot

1. Start the mock server: `npm run mock-server`
2. Open your browser to: `http://localhost:3000/mock-eva-page.html`
3. Interact with the chatbot to see how it responds

## Running Tests

### Test Against Mock Chatbot (Recommended for Development)

```bash
# Run tests in headless mode
npm run test:mock

# Run tests with visible browser
npm run test:mock:headed

# Run tests in interactive UI mode
npm run test:mock:ui
```

### Test Against Real Eva Chatbot

```bash
# Run tests in headless mode
npm run test:real

# Run tests with visible browser
npm run test:real:headed
```

### Other Test Commands

```bash
# Run all tests (uses mock by default)
npm test

# Run tests with UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

## Test Scenarios

The test suite includes **23 comprehensive scenarios** covering:

### Timing Questions (3 scenarios)
- When will results be ready?
- How long does shipping take?
- When should I expect my kit?

### Medical Interpretation (5 scenarios)
- TSH level meaning
- High cortisol level
- Low vitamin D
- HbA1c level
- Testosterone level

**Expected behavior:** Defer to physician, no medication names

### Medical Advice (4 scenarios)
- Should I take medication for high cholesterol?
- What medication for thyroid?
- Can I treat low vitamin D with supplements?
- Should I be concerned about my results?

**Expected behavior:** Cannot provide medical advice, consult physician

### Account Management (4 scenarios)
- How to cancel test
- Update shipping address
- View test results
- Return test kit

**Expected behavior:** Direct to account/support

### General Health Questions (4 scenarios)
- What tests do you offer?
- How accurate are your tests?
- What should I do before taking a test?
- Can I share results with my doctor?

**Expected behavior:** Answer directly

## Configuration

### Switching Between Mock and Real Chatbot

Edit `test-config.js`:

```javascript
const TEST_MODE = process.env.TEST_MODE || 'mock';
```

Or use environment variables:

```bash
TEST_MODE=mock npm test    # Use mock chatbot
TEST_MODE=real npm test    # Use real chatbot
```

### Updating the Real Chatbot URL

If the real Eva chatbot URL changes, update it in `test-config.js`:

```javascript
real: {
  url: 'https://www.everlywell.com/support/eva',  // Update this
  useIframe: true
}
```

## Python AI Tools

This project includes two powerful AI-powered tools built with Claude AI to accelerate test development and debugging.

### 🤖 Test Generator (`test-generator.py`)

Automatically generates comprehensive Playwright test suites from natural language feature descriptions.

**Setup:**
```bash
# Install Python dependencies
pip install -r requirements.txt

# Set your Anthropic API key
export ANTHROPIC_API_KEY='your-api-key-here'
```

**Usage:**
```bash
python test-generator.py "Feature description here"
```

**Example:**
```bash
python test-generator.py "Eva chatbot that handles timing questions about test results and shipping"

# Output: tests/generated-eva-chatbot-20250118_143022.spec.js
# ✅ Complete Playwright test suite ready to run!
```

**What It Generates:**
- ✅ Happy path tests
- ✅ Edge cases
- ✅ Error handling
- ✅ Healthcare-specific validations (medical advice deferral, HIPAA compliance)
- ✅ Proper data-testid selectors
- ✅ Comprehensive assertions

### 🔍 Failure Analyzer (`failure-analyzer.py`)

Analyzes test failures and provides intelligent debugging suggestions using AI.

**Usage:**
```bash
python failure-analyzer.py "test name" "error message" [optional-test-file]
```

**Example:**
```bash
python failure-analyzer.py \
  "Eva responds to TSH question" \
  "TimeoutError: locator.click: Timeout 30000ms exceeded" \
  tests/eva-chatbot.spec.js

# Output:
# 🔍 Comprehensive analysis with:
# - Root cause identification
# - Specific code fixes
# - Robustness improvements
# - Additional test suggestions
# - Healthcare compliance considerations
```

**What It Provides:**
1. **Root Cause Analysis** - Why the test failed
2. **Immediate Fix** - Specific code changes to apply
3. **Robustness Improvements** - Make tests more reliable
4. **Additional Coverage** - Related scenarios to test
5. **Healthcare Considerations** - Compliance and safety impacts

### 📚 Examples and Documentation

Check the `examples/` directory for:
- `QUICKSTART.md` - 5-minute getting started guide
- `example-feature-descriptions.md` - 15 ready-to-use feature descriptions
- `example-failures.md` - Common failure patterns and how to analyze them

### When to Use AI Tools

**Use Test Generator when:**
- Starting a new feature test suite
- Need comprehensive test coverage quickly
- Want to explore edge cases you might miss
- Learning Playwright patterns

**Use Failure Analyzer when:**
- Tests are failing and root cause is unclear
- Need suggestions for making tests more robust
- Want to understand complex error messages
- Debugging flaky tests

**Important:** Always review AI-generated code before using in production! AI tools accelerate development but require human judgment, especially for healthcare applications.

## Project Structure

```
everlywell/
├── tests/
│   ├── eva-chatbot.spec.js              # Single TSH scenario test
│   └── eva-chatbot-scenarios.spec.js    # All 23 test scenarios
├── examples/
│   ├── QUICKSTART.md                    # Quick start guide for AI tools
│   ├── example-feature-descriptions.md  # Sample feature descriptions
│   └── example-failures.md              # Common failure patterns
├── analysis/                            # Generated failure analyses (created automatically)
├── mock-eva-chatbot.html                # Mock chatbot (standalone)
├── mock-eva-page.html                   # Mock page with iframe wrapper
├── mock-server.js                       # Simple HTTP server
├── test-config.js                       # Test configuration
├── test-generator.py                    # 🤖 AI test generator
├── failure-analyzer.py                  # 🔍 AI failure analyzer
├── requirements.txt                     # Python dependencies
├── playwright.config.js                 # Playwright configuration
├── package.json                         # Dependencies and scripts
└── README.md                            # This file
```

## Files Explained

### Test Files

- **eva-chatbot.spec.js**: Basic test with one TSH question scenario
- **eva-chatbot-scenarios.spec.js**: Comprehensive test suite with 23 scenarios

### Mock Chatbot Files

- **mock-eva-chatbot.html**: Standalone chatbot interface with all response logic
- **mock-eva-page.html**: Wrapper page that embeds the chatbot in an iframe (matches real setup)
- **mock-server.js**: Simple Node.js HTTP server to serve the mock files

### Configuration Files

- **test-config.js**: Central configuration for switching between mock/real chatbot
- **playwright.config.js**: Playwright test runner configuration

### Python AI Tools

- **test-generator.py**: AI-powered Playwright test generator using Claude
- **failure-analyzer.py**: AI-powered test failure analyzer and debugger
- **requirements.txt**: Python package dependencies

### Data-TestID Selectors

The tests use these `data-testid` attributes:
- `chat-interface` - The main chat container
- `open-chat-button` - Button to open the chat (if needed)
- `message-input` - Input field for typing messages
- `send-button` - Button to send messages
- `user-message` - Container for user messages
- `eva-response` - Container for Eva's responses

## Tips for Testing

1. **Start with Mock**: Always test against the mock chatbot first to validate your test logic
2. **Use Headed Mode**: Use `--headed` flag to see what's happening in the browser
3. **Use UI Mode**: Use `--ui` flag for interactive debugging
4. **Check Data-TestIDs**: Make sure the real Eva chatbot uses the same data-testid attributes
5. **Adjust Timeouts**: If tests are flaky, adjust timeouts in the test files

## Troubleshooting

### Mock server won't start
- Make sure port 3000 is not already in use
- Check that you've run `npm install`

### Tests fail against mock but logic seems correct
- Open the mock chatbot manually in your browser
- Test the queries to see what responses you get
- Check the browser console for errors

### Tests fail against real Eva chatbot
- Verify the URL in `test-config.js` is correct
- Check if the real chatbot uses iframes
- Verify data-testid attributes match
- Check network tab for iframe selectors

## Next Steps

1. ✅ Validate all tests pass against the mock chatbot
2. ✅ Manually verify the mock chatbot responses are realistic
3. ✅ Update `test-config.js` with the real Eva chatbot URL
4. ✅ Verify data-testid attributes match the real implementation
5. ✅ Run tests against the real chatbot
6. ✅ Adjust tests as needed based on real chatbot behavior

## Support

For questions or issues, please check:
- The mock chatbot's response patterns in `mock-eva-chatbot.html`
- Test configuration in `test-config.js`
- Test scenarios in `tests/eva-chatbot-scenarios.spec.js`
