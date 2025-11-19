# Quick Start Guide for Python AI Tools

This guide will get you up and running with the AI-powered testing tools in 5 minutes.

## Prerequisites

1. **Python 3.7+** installed
2. **Anthropic API Key** - Get one at https://console.anthropic.com/

## Setup (2 minutes)

### Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 2: Set API Key

**macOS/Linux:**
```bash
export ANTHROPIC_API_KEY='your-api-key-here'
```

**Windows (PowerShell):**
```powershell
$env:ANTHROPIC_API_KEY='your-api-key-here'
```

**Windows (CMD):**
```cmd
set ANTHROPIC_API_KEY=your-api-key-here
```

### Step 3: Make Scripts Executable (macOS/Linux)

```bash
chmod +x test-generator.py failure-analyzer.py
```

## Using the Test Generator (1 minute)

### Basic Usage

```bash
python test-generator.py "Eva chatbot that handles timing questions"
```

### What Happens

1. 🤖 AI analyzes your feature description
2. 📝 Generates comprehensive Playwright tests
3. 💾 Saves to `tests/generated-[timestamp].spec.js`
4. ✅ Ready to run!

### Run the Generated Tests

```bash
npx playwright test tests/generated-*.spec.js --headed
```

### Real Example

```bash
# Generate tests for login feature
python test-generator.py "User login with email and password, including forgot password flow"

# Output:
# ✅ Tests generated successfully!
# 📁 Saved to: tests/generated-user-login-20250118_143022.spec.js
#
# Next steps:
#   1. Review the generated tests
#   2. Run: npx playwright test tests/generated-user-login-20250118_143022.spec.js
```

## Using the Failure Analyzer (1 minute)

### Basic Usage

```bash
python failure-analyzer.py \
  "Test name that failed" \
  "Error message from the failure"
```

### What Happens

1. 🔍 AI analyzes the error
2. 💡 Identifies root cause
3. 🔧 Suggests specific fix
4. 📋 Provides improvement recommendations
5. 💾 Saves analysis to `analysis/` directory

### Run with Test File (Better Results)

```bash
python failure-analyzer.py \
  "Eva responds to TSH question" \
  "TimeoutError: Timeout 30000ms exceeded" \
  tests/eva-chatbot.spec.js
```

### Real Example

```bash
# You have a failing test
npx playwright test
# Error: TimeoutError: locator.click: Timeout 30000ms exceeded

# Analyze it
python failure-analyzer.py \
  "Eva chat interface loads" \
  "TimeoutError: locator.click: Timeout 30000ms exceeded waiting for '[data-testid=\"chat-input\"]'" \
  tests/eva-chatbot.spec.js

# Output:
# 🔍 TEST FAILURE ANALYSIS
# ====================================
#
# Root Cause Analysis:
# The timeout error suggests the element with data-testid="chat-input"
# is not appearing within 30 seconds...
#
# Immediate Fix:
# [Specific code changes]
#
# Robustness Improvements:
# [Suggestions to make test better]
```

## Complete Workflow Example (3 minutes)

### Scenario: Building Tests for New Feature

```bash
# 1. Generate initial tests
python test-generator.py "Shopping cart with add/remove items and checkout"

# 2. Review and run tests
npx playwright test tests/generated-shopping-cart-*.spec.js --headed

# 3. Test fails? Analyze it!
python failure-analyzer.py \
  "User can add items to cart" \
  "Error: Element not found [data-testid='add-to-cart-button']" \
  tests/generated-shopping-cart-*.spec.js

# 4. Apply suggested fix, run again
npx playwright test tests/generated-shopping-cart-*.spec.js --headed

# 5. All green? Ship it! ✅
```

## Tips for Best Results

### For Test Generator

✅ **Do:**
- Be specific about functionality
- Mention validation rules
- Include error cases
- Note healthcare/compliance requirements

❌ **Don't:**
- Be too vague ("build a chatbot")
- Skip important details
- Assume AI knows your app structure

### For Failure Analyzer

✅ **Do:**
- Include the full error message
- Provide the test file path
- Copy stack traces
- Run multiple times for complex issues

❌ **Don't:**
- Truncate error messages
- Skip context
- Expect one-shot fixes for complex problems

## Common Issues

### "ANTHROPIC_API_KEY not set"

**Solution:** Export the environment variable (see Step 2 above)

### "anthropic package not installed"

**Solution:**
```bash
pip install anthropic
```

### "Permission denied"

**Solution:**
```bash
chmod +x test-generator.py failure-analyzer.py
```

### Generated tests don't match my app

**Solution:** The AI generates generic tests. You need to:
1. Update selectors to match your app
2. Adjust URLs
3. Modify assertions for your data
4. Add app-specific setup

This is expected! The AI provides a starting point, not production-ready tests.

## Next Steps

1. ✅ Read `example-feature-descriptions.md` for more generator examples
2. ✅ Read `example-failures.md` for more analyzer examples
3. ✅ Experiment with your own features
4. ✅ Iterate on generated tests
5. ✅ Build your test suite!

## Getting Help

- 📚 Check the main README.md
- 💡 Look at examples/ directory
- 🐛 Test with simple features first
- 🔄 Iterate based on results

Happy testing! 🚀
