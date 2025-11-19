# Example Test Failures for Failure Analyzer

These are example test failures you can use with `failure-analyzer.py` to get AI-powered debugging assistance.

## Example 1: Timeout Error

```bash
python failure-analyzer.py \
  "Eva responds to TSH question" \
  "TimeoutError: locator.click: Timeout 30000ms exceeded waiting for selector '[data-testid=\"eva-response\"]'" \
  tests/eva-chatbot.spec.js
```

**Common Cause**: Element not appearing, wrong selector, or element in iframe

---

## Example 2: Element Not Found

```bash
python failure-analyzer.py \
  "User can view test results" \
  "Error: Element not found: [data-testid=\"results-table\"]"
```

**Common Cause**: Element doesn't exist, wrong selector, or page didn't load

---

## Example 3: Assertion Failure

```bash
python failure-analyzer.py \
  "Eva defers medical advice" \
  "expect(received).toContain(expected) - Expected response to contain 'physician' but got: 'Test response'"
```

**Common Cause**: Incorrect expected value, response changed, or test data issue

---

## Example 4: Network Error

```bash
python failure-analyzer.py \
  "Chat sends message to API" \
  "page.route: Failed to fetch - TypeError: NetworkError when attempting to fetch resource"
```

**Common Cause**: API endpoint down, CORS issue, or network interception problem

---

## Example 5: State Management Issue

```bash
python failure-analyzer.py \
  "Multiple messages in sequence" \
  "expect(received).toBe(expected) - Expected 3 messages but got 1"
```

**Common Cause**: State not updating, race condition, or async issue

---

## Example 6: Authentication Error

```bash
python failure-analyzer.py \
  "User can access protected page" \
  "page.goto: Navigation failed because page was closed! - Target page, context or browser has been closed"
```

**Common Cause**: Session expired, auth state not saved, or redirect loop

---

## Example 7: Flaky Test

```bash
python failure-analyzer.py \
  "Eva typing indicator appears" \
  "expect(locator).toBeVisible() - Failed: Element was visible for 100ms then disappeared"
```

**Common Cause**: Timing issue, animation too fast, or improper wait strategy

---

## Example 8: Iframe Issue

```bash
python failure-analyzer.py \
  "Chat interface loads in iframe" \
  "Error: Frame was detached - Cannot perform operation on a detached frame"
```

**Common Cause**: Iframe reloaded, wrong frame context, or navigation issue

---

## Example 9: Scroll/Visibility Issue

```bash
python failure-analyzer.py \
  "User clicks submit button" \
  "locator.click: Element is not visible - Element is outside of viewport"
```

**Common Cause**: Need to scroll, element covered by modal, or viewport too small

---

## Example 10: Data Validation Failure

```bash
python failure-analyzer.py \
  "Biomarker values display correctly" \
  "expect(received).toEqual(expected) - Expected TSH: 5.2, received: NaN"
```

**Common Cause**: Data parsing error, API returned wrong format, or type coercion issue

---

## Tips for Using Failure Analyzer

### Provide Good Context

1. **Include the test file**: The analyzer can give better suggestions with code context
2. **Copy the full error**: Include stack traces and line numbers
3. **Descriptive test name**: Helps the AI understand what the test is trying to do

### Example with Full Context

```bash
python failure-analyzer.py \
  "Eva Support chatbot responds to medical questions appropriately" \
  "TimeoutError: locator.click: Timeout 30000ms exceeded
    at tests/eva-chatbot.spec.js:45:12
    waiting for selector '[data-testid=\"eva-response\"]' to be visible
    selector resolved to hidden <div data-testid=\"eva-response\">...</div>" \
  tests/eva-chatbot.spec.js
```

### What the Analyzer Will Provide

1. ✅ **Root cause analysis** - Why the test failed
2. ✅ **Immediate fix** - Code to solve the problem
3. ✅ **Robustness tips** - How to make test more reliable
4. ✅ **Additional coverage** - Related tests to add
5. ✅ **Healthcare considerations** - Compliance/safety impacts

### Iterative Debugging

If the first fix doesn't work:

```bash
# Try the suggested fix, if it fails with a new error:
python failure-analyzer.py \
  "Same test name" \
  "New error message after applying first fix"
```

The AI can help you iteratively debug complex issues!

---

## Common Failure Patterns

### Pattern 1: Selector Issues
- Wrong data-testid
- Element in shadow DOM
- Element in iframe
- CSS selector too specific

### Pattern 2: Timing Issues
- Race conditions
- Animations not complete
- API calls not finished
- State updates pending

### Pattern 3: State Problems
- Component not mounted
- Redux/state not updated
- Local storage cleared
- Session expired

### Pattern 4: Environment Issues
- Wrong URL
- Test database empty
- API mocked incorrectly
- Browser compatibility

### Pattern 5: Test Logic Errors
- Wrong assertions
- Incorrect expected values
- Missing setup/teardown
- Test pollution (one test affects another)
