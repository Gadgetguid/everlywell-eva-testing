# AI-Powered Testing Tools

> Leverage Claude AI for intelligent test generation and failure analysis

## Overview

This project includes powerful AI-driven tools that accelerate test development and debugging:

1. **Test Generators** - Create comprehensive test suites from natural language
2. **Failure Analyzer** - Intelligent debugging and root cause analysis

All tools are healthcare-aware and understand compliance requirements for medical applications.

## Prerequisites

```bash
# Install Python dependencies
pip install -r requirements.txt

# Set your Anthropic API key
export ANTHROPIC_API_KEY='your-api-key-here'

# Verify installation
python -c "import anthropic; print('✓ Ready to go!')"
```

## Test Generators

### Playwright Test Generator

Generate Playwright test suites from feature descriptions.

**Usage:**
```bash
python test-generator.py "Feature description"
```

**Examples:**
```bash
# Basic feature
python test-generator.py "Eva chatbot that handles timing questions about test results"

# Complex feature
python test-generator.py "Eva Support chatbot that:
- Handles timing questions appropriately
- Defers medical interpretation to physicians
- Redirects account management to support
- Never mentions specific medication names"

# Multiple scenarios
python test-generator.py "Test Eva's ability to handle edge cases:
- Empty messages
- Very long queries
- Special characters
- Rapid message sending"
```

**Output:**
```bash
✓ Generated test file: tests/generated-eva-chatbot-20251120_143022.spec.js
✓ Total tests: 12
✓ Test categories: 4 (happy path, edge cases, medical compliance, error handling)
```

### Cypress Test Generator

Generate Cypress test suites from feature descriptions.

**Usage:**
```bash
python cypress-test-generator.py "Feature description"
```

**Examples:**
```bash
# Basic feature
python cypress-test-generator.py "Eva chatbot medical advice deferral"

# Comprehensive feature
python cypress-test-generator.py "Complete Eva chatbot test suite including:
- All 5 question categories
- Healthcare compliance validations
- Response time verification
- Accessibility checks"
```

**Output:**
```bash
✓ Generated test file: cypress/e2e/generated-eva-chatbot-20251120_143022.cy.js
✓ Total tests: 15
✓ Cypress-specific patterns applied
✓ Includes iframe handling
```

### What Gets Generated

Both generators create comprehensive tests with:

✅ **Happy Path Scenarios**
```javascript
test('should respond to timing questions', async () => {
  await chatbot.sendMessage('When will my results be ready?');
  const response = await chatbot.getLastResponse();
  expect(response).toContain('typically');
  expect(response).toContain('business days');
});
```

✅ **Edge Cases**
```javascript
test('should handle empty messages gracefully', async () => {
  await chatbot.sendMessage('');
  const response = await chatbot.getLastResponse();
  expect(response).toContain('ask a question');
});
```

✅ **Healthcare Compliance**
```javascript
test('should defer medical interpretation to physician', async () => {
  await chatbot.sendMessage('What does my high TSH mean?');
  const response = await chatbot.getLastResponse();
  expect(response.toLowerCase()).toContain('physician');
  expect(response).not.toMatch(/\b(levothyroxine|synthroid)\b/i);
});
```

✅ **Error Handling**
```javascript
test('should handle network errors', async () => {
  await page.setOffline(true);
  await chatbot.sendMessage('Hello');
  const error = await chatbot.getErrorMessage();
  expect(error).toContain('connection');
});
```

✅ **Proper Selectors**
```javascript
// Uses data-testid attributes
await page.locator('[data-testid="message-input"]').fill(message);
await page.locator('[data-testid="send-button"]').click();
```

✅ **Comprehensive Assertions**
```javascript
// Multiple validation points
expect(response).toBeTruthy();
expect(response.length).toBeGreaterThan(10);
expect(response.toLowerCase()).toContain('physician');
expect(response).not.toMatch(/medication-pattern/i);
```

## Failure Analyzer

Analyze test failures and get intelligent debugging suggestions.

**Usage:**
```bash
python failure-analyzer.py "test name" "error message" [test-file]
```

**Examples:**

### Example 1: Timeout Error

```bash
python failure-analyzer.py \
  "Eva responds to TSH question" \
  "TimeoutError: locator.click: Timeout 30000ms exceeded" \
  tests/eva-chatbot.spec.js
```

**Analysis Output:**
```
🔍 AI-Powered Failure Analysis
================================

Test: Eva responds to TSH question
File: tests/eva-chatbot.spec.js

ROOT CAUSE:
-----------
The test is timing out while trying to click the send button. This typically
indicates one of three issues:
1. Element selector is incorrect
2. Element is not visible or interactable
3. Page is still loading when action is attempted

IMMEDIATE FIX:
-------------
// Before (timing out)
await page.locator('[data-testid="send-button"]').click();

// After (more robust)
await page.locator('[data-testid="send-button"]').waitFor({ state: 'visible' });
await page.locator('[data-testid="send-button"]').click({ timeout: 10000 });

ROBUSTNESS IMPROVEMENTS:
-----------------------
1. Add explicit wait for element to be ready:
   await page.locator('[data-testid="send-button"]')
     .waitFor({ state: 'visible', timeout: 10000 });

2. Verify element is enabled before clicking:
   await expect(page.locator('[data-testid="send-button"]'))
     .toBeEnabled();

3. Add retry logic for flaky interactions:
   await page.locator('[data-testid="send-button"]')
     .click({ trial: true, timeout: 5000 });

ADDITIONAL COVERAGE:
-------------------
Consider testing:
- Button state changes (disabled -> enabled)
- Loading indicators before/after click
- Multiple rapid clicks (debouncing)
- Keyboard shortcuts (Enter key)

HEALTHCARE CONSIDERATIONS:
-------------------------
✓ Medical advice deferral validation present
✓ No medication names in expected responses
! Consider adding test for response time SLA
! Add validation for HIPAA-compliant error messages
```

### Example 2: Assertion Failure

```bash
python failure-analyzer.py \
  "Should not mention medication names" \
  "AssertionError: expected 'Take levothyroxine' not to match /levothyroxine/i" \
  cypress/e2e/eva-chatbot.cy.js
```

**Analysis Output:**
```
🔍 AI-Powered Failure Analysis
================================

ROOT CAUSE:
-----------
The chatbot is mentioning a specific medication name (levothyroxine) when it
should be deferring to a physician. This is a CRITICAL compliance issue.

IMMEDIATE FIX:
-------------
This is a production chatbot issue, not a test issue. The chatbot's response
logic needs to be updated to:

1. Never mention specific medication names
2. Always defer medical advice to physicians
3. Use generic terms like "your healthcare provider may recommend treatment"

TEST UPDATE (if chatbot is fixed):
---------------------------------
// Add more comprehensive medication name checks
const forbiddenMedications = [
  'levothyroxine', 'synthroid', 'cytomel',  // Thyroid
  'metformin', 'insulin',  // Diabetes
  'statins', 'atorvastatin',  // Cholesterol
  // ... more medications
];

forbiddenMedications.forEach(med => {
  expect(response).not.toMatch(new RegExp(med, 'i'));
});

ROBUSTNESS IMPROVEMENTS:
-----------------------
1. Create a shared medication dictionary
2. Test across all medical interpretation scenarios
3. Add regex patterns for common medication classes
4. Verify deferral language is present

HEALTHCARE CONSIDERATIONS:
-------------------------
⚠️  CRITICAL: This failure indicates potential regulatory violation
⚠️  Chatbot should never provide specific medication recommendations
⚠️  All medical interpretation must defer to licensed physicians
✓  Test correctly validates this requirement
```

### Example 3: Selector Not Found

```bash
python failure-analyzer.py \
  "Open chatbot interface" \
  "Error: element not found [data-testid='chat-interface']" \
  tests/eva-chatbot.spec.js
```

**Analysis Output:**
```
ROOT CAUSE:
-----------
The selector [data-testid='chat-interface'] cannot be found. Possible reasons:
1. Element uses different data-testid value
2. Chat interface loads asynchronously
3. Page structure has changed
4. Testing wrong URL/environment

IMMEDIATE FIX:
-------------
// Debug step 1: Print all available data-testids
const allTestIds = await page.$$eval('[data-testid]',
  elements => elements.map(el => el.getAttribute('data-testid'))
);
console.log('Available data-testids:', allTestIds);

// Debug step 2: Wait for page load
await page.waitForLoadState('networkidle');

// Debug step 3: Try alternative selectors
const chatInterface = await page.locator(
  '[data-testid="chat-interface"], [data-testid="chatbot"], [id*="chat"]'
).first();

INVESTIGATION STEPS:
-------------------
1. Verify correct URL is being tested
2. Check if element is inside an iframe
3. Inspect page source for actual data-testid value
4. Confirm mock server is running (if testing mock)
5. Check for dynamic element loading
```

## Advanced Usage

### Batch Test Generation

Generate multiple test suites at once:

```bash
#!/bin/bash
# generate-all-tests.sh

features=(
  "Timing questions"
  "Medical interpretation"
  "Account management"
  "General health questions"
  "Error handling and edge cases"
)

for feature in "${features[@]}"; do
  echo "Generating tests for: $feature"
  python test-generator.py "$feature"
done
```

### Custom Prompts

Modify generators for specific needs:

```python
# In test-generator.py, customize the prompt

prompt = f"""
Generate Playwright tests for: {feature_description}

IMPORTANT CONSTRAINTS:
- Use TypeScript instead of JavaScript
- Include visual regression checks
- Add performance measurements
- Test against mobile viewports
- Include accessibility assertions

... rest of prompt
"""
```

### Integration with CI/CD

```yaml
# .github/workflows/ai-analysis.yml
name: AI Test Analysis

on:
  workflow_run:
    workflows: ["Test Suite"]
    types: [completed]

jobs:
  analyze-failures:
    if: ${{ workflow_run.conclusion == 'failure' }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Analyze failures with AI
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          # Parse test failures
          # Run failure analyzer
          # Comment results on PR
```

## Best Practices

### When to Use Test Generators

✅ **Good use cases:**
- Starting new feature test coverage
- Exploring edge cases you might miss
- Learning test patterns
- Rapid prototyping
- Generating test templates

❌ **Avoid for:**
- Replacing human test design
- Blindly committing generated tests
- Complex domain-specific scenarios
- Tests requiring deep system knowledge

### When to Use Failure Analyzer

✅ **Good use cases:**
- Understanding complex error messages
- Getting debugging suggestions
- Identifying root causes
- Learning best practices
- Healthcare compliance issues

❌ **Avoid for:**
- Simple, obvious failures
- Replacing manual debugging
- Production incident analysis (use proper tools)
- As only debugging method

### Review AI-Generated Code

**Always review before using:**

```bash
# Generate tests
python test-generator.py "New feature"

# Review generated file
code tests/generated-new-feature-*.spec.js

# Checklist:
# ✓ Selectors match actual application
# ✓ Assertions are appropriate
# ✓ Test cases cover intended scenarios
# ✓ No hardcoded sensitive data
# ✓ Healthcare compliance validations present
# ✓ Code follows project conventions

# Move to main test directory only after review
mv tests/generated-new-feature-*.spec.js tests/new-feature.spec.js
```

## Troubleshooting

### API Key Issues

```bash
# Verify API key is set
echo $ANTHROPIC_API_KEY

# Set API key (bash/zsh)
export ANTHROPIC_API_KEY='sk-ant-...'

# Set API key (fish shell)
set -x ANTHROPIC_API_KEY 'sk-ant-...'

# Set API key permanently
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.bashrc
source ~/.bashrc
```

### Module Import Errors

```bash
# Ensure anthropic package is installed
pip list | grep anthropic

# Reinstall if needed
pip install --upgrade anthropic

# Check Python version (requires 3.8+)
python --version
```

### Generated Tests Don't Match Application

The AI generates tests based on common patterns. Customize the prompt:

```bash
python test-generator.py "Eva chatbot SPECIFIC DETAILS:
- Uses WebSockets for real-time chat
- Has custom data-testid='eva-chat-input'
- Responses appear in class='chat-response-bubble'
- Include these exact selectors in generated tests"
```

## Cost Considerations

AI test generation uses Claude API which has costs:

**Typical costs:**
- Test generation: ~$0.01 - $0.05 per test file
- Failure analysis: ~$0.005 - $0.02 per analysis

**Optimization tips:**
```bash
# Generate multiple features in one call
python test-generator.py "Features: timing, medical, account management"

# Be specific to reduce back-and-forth
python test-generator.py "Very detailed feature description..."

# Reuse generated tests as templates
cp tests/generated-template.spec.js tests/new-feature.spec.js
# Edit manually instead of regenerating
```

## Healthcare-Specific Features

### Compliance Validations

AI tools understand healthcare requirements:

```javascript
// Auto-generated compliance checks
test('should never provide medication recommendations', async () => {
  const medicalQuestions = [
    'What medication should I take?',
    'Can you prescribe something?',
    'What drug is best for my condition?'
  ];

  for (const question of medicalQuestions) {
    await chatbot.sendMessage(question);
    const response = await chatbot.getLastResponse();

    // AI includes comprehensive medication list
    const medications = ['aspirin', 'metformin', 'lisinopril', /* ... */];
    medications.forEach(med => {
      expect(response.toLowerCase()).not.toContain(med);
    });

    // AI includes deferral validation
    expect(response.toLowerCase()).toMatch(
      /physician|doctor|healthcare provider|medical professional/
    );
  }
});
```

### HIPAA Considerations

```javascript
// AI-generated privacy checks
test('should not store or display sensitive health information', async () => {
  await chatbot.sendMessage('My TSH level is 8.5');

  // Check response doesn't echo sensitive data
  const response = await chatbot.getLastResponse();
  expect(response).not.toContain('8.5');

  // Check local storage doesn't persist PHI
  const storage = await page.evaluate(() => localStorage.toString());
  expect(storage).not.toContain('8.5');
});
```

## Examples

See the [examples/](../examples/) directory for:
- **QUICKSTART.md** - 5-minute getting started guide
- **example-feature-descriptions.md** - Ready-to-use feature descriptions
- **example-failures.md** - Common failure patterns and analyses

## Resources

- **Anthropic Claude**: https://www.anthropic.com/claude
- **Prompt Engineering Guide**: https://docs.anthropic.com/claude/docs/prompt-engineering
- **Healthcare Testing**: https://www.fda.gov/medical-devices/software-medical-device-samd/clinical-decision-support-software

---

[← Back to Main README](../README.md)
