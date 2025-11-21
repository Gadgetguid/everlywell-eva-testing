# Performance Benchmarking Guide

> Compare Playwright and Cypress execution speed with automated benchmarking

## Overview

The benchmarking tool allows you to run both Playwright and Cypress test suites simultaneously and compare their performance. This helps you make informed decisions about which framework to use for different scenarios.

## Quick Start

```bash
# Run the benchmark
npm run benchmark
```

The script will:
1. Run Playwright and Cypress tests in parallel
2. Measure execution time for each framework
3. Display a comparison with percentage difference
4. Show pass/fail status for both frameworks
5. Provide links to detailed logs

## Example Output

```
========================================
Test Framework Performance Comparison
========================================

Starting both test suites in parallel...

[Playwright] Starting tests...
[Cypress] Starting tests...
[Playwright] Tests completed successfully
[Cypress] Tests completed successfully

========================================
Performance Results
========================================

Playwright:          12.45 seconds
Cypress:             18.23 seconds

✓ Playwright is faster by 5.78s (31.71% faster)

Test Status:
  Playwright: PASSED
  Cypress:    PASSED

Detailed logs:
  Playwright: /tmp/tmpXXXXXX/playwright.log
  Cypress:    /tmp/tmpXXXXXX/cypress.log

Note: Logs are in a temporary directory and will be deleted on system restart
========================================
```

## What Gets Benchmarked

By default, the benchmark runs:
- **Playwright:** `npm run test:mock` (all mock tests)
- **Cypress:** `npm run cypress:run:mock` (all mock tests)

Both frameworks run the same 23 test scenarios covering:
- Timing questions (3 tests)
- Medical interpretation (5 tests)
- Medical advice (4 tests)
- Account management (4 tests)
- General health questions (4 tests)

## Customizing the Benchmark

### Edit benchmark-tests.sh

You can modify which tests to run by editing the script:

```bash
#!/bin/bash

# Change these functions to run different test commands
run_playwright() {
    # Default: npm run test:mock
    # Custom: npx playwright test tests/eva-chatbot.spec.js
    npm run test:mock > "$PLAYWRIGHT_LOG" 2>&1
}

run_cypress() {
    # Default: npm run cypress:run:mock
    # Custom: npx cypress run --spec cypress/e2e/eva-chatbot.cy.js
    npm run cypress:run:mock > "$CYPRESS_LOG" 2>&1
}
```

### Benchmark Specific Tests

```bash
# Edit the script to run only basic tests
run_playwright() {
    npx playwright test tests/eva-chatbot.spec.js > "$PLAYWRIGHT_LOG" 2>&1
}

run_cypress() {
    npx cypress run --spec cypress/e2e/eva-chatbot.cy.js > "$CYPRESS_LOG" 2>&1
}
```

### Benchmark Production Environment

```bash
# Edit the script to use real chatbot
run_playwright() {
    npm run test:real > "$PLAYWRIGHT_LOG" 2>&1
}

run_cypress() {
    npm run cypress:run:real > "$CYPRESS_LOG" 2>&1
}
```

## Interpreting Results

### Execution Time

- **Faster doesn't always mean better**
  - Consider test reliability and debugging experience
  - Headless mode (Playwright) is typically faster than headed mode
  - Network conditions can affect results

### Typical Performance Patterns

**Playwright tends to be faster when:**
- Running in true headless mode
- Executing many tests in parallel
- Testing across multiple browsers
- Network interception is involved

**Cypress may be comparable when:**
- Tests involve heavy DOM manipulation
- Running in Electron browser
- Test suite is small (< 10 tests)
- Visual validation is required

### Pass/Fail Status

The benchmark tracks whether tests passed or failed:

```
Test Status:
  Playwright: PASSED    # All tests passed
  Cypress:    FAILED    # One or more tests failed
```

**Why might one framework fail while the other passes?**
- Different timing/wait strategies
- Framework-specific selector issues
- Iframe handling differences
- Race conditions in test code

## Performance Optimization Tips

### For Playwright

**1. Increase parallelization:**
```javascript
// playwright.config.js
workers: process.env.CI ? 2 : 4,  // More parallel workers
```

**2. Reduce trace collection:**
```javascript
// playwright.config.js
use: {
  trace: 'on-first-retry',  // Only on failures
  screenshot: 'only-on-failure',
}
```

**3. Disable video recording:**
```javascript
// playwright.config.js
use: {
  video: 'off',  // Saves time
}
```

### For Cypress

**1. Disable video in headless:**
```javascript
// cypress.config.js
e2e: {
  video: false,  // Faster execution
}
```

**2. Reduce screenshot overhead:**
```javascript
// cypress.config.js
e2e: {
  screenshotOnRunFailure: false,  // Only for benchmarks
}
```

**3. Run in Electron:**
```bash
npx cypress run --browser electron  # Fastest browser option
```

### General Optimizations

**1. Use mock environment:**
```bash
# Much faster than real environment
TEST_MODE=mock npm run benchmark
```

**2. Optimize wait times:**
```javascript
// Don't over-wait
cy.wait(500);  // Instead of cy.wait(5000)
```

**3. Reduce network delays:**
```javascript
// Mock slow API calls for testing
cy.intercept('/api/slow-endpoint', { fixture: 'fast-response.json' });
```

## Advanced Benchmarking

### Multiple Runs for Accuracy

```bash
# Run benchmark 5 times and average results
for i in {1..5}; do
  echo "Run $i of 5"
  npm run benchmark
  sleep 5
done
```

### CI/CD Integration

```yaml
# GitHub Actions example
- name: Run Performance Benchmark
  run: npm run benchmark

- name: Comment benchmark results
  uses: actions/github-script@v6
  with:
    script: |
      // Parse benchmark output and comment on PR
```

### Custom Metrics

Add additional metrics to `benchmark-tests.sh`:

```bash
# Track memory usage
run_playwright() {
    /usr/bin/time -v npm run test:mock > "$PLAYWRIGHT_LOG" 2>&1
}

# Track network requests
run_cypress() {
    # Add custom logging
    npm run cypress:run:mock > "$CYPRESS_LOG" 2>&1
}
```

## Viewing Detailed Logs

After running the benchmark, detailed logs are saved:

```bash
# View Playwright log
cat /tmp/tmpXXXXXX/playwright.log

# View Cypress log
cat /tmp/tmpXXXXXX/cypress.log

# Search for errors
grep -i error /tmp/tmpXXXXXX/*.log
```

## Troubleshooting

### Both Frameworks Take Too Long

**Problem:** Tests taking > 60 seconds
**Solutions:**
- Check if mock server is running
- Verify network connectivity
- Reduce unnecessary waits in tests
- Run fewer test files

### Inconsistent Results

**Problem:** Execution time varies widely
**Solutions:**
- Close other applications
- Run multiple times and average
- Check for background processes
- Use dedicated test environment

### One Framework Always Fails

**Problem:** Cypress always fails but Playwright passes
**Solutions:**
- Check Cypress-specific configuration
- Verify iframe handling
- Review Cypress logs for errors
- Run Cypress independently to debug

### Script Errors

**Problem:** Benchmark script fails to run
**Solutions:**
```bash
# Ensure script is executable
chmod +x benchmark-tests.sh

# Check for bc (calculator) dependency
brew install bc  # macOS
apt-get install bc  # Linux

# Run directly instead of via npm
./benchmark-tests.sh
```

## Best Practices

### When to Benchmark

✅ **Good times to benchmark:**
- After significant test changes
- Before committing to a framework
- When optimizing CI/CD pipeline
- During performance regression testing

❌ **Avoid benchmarking when:**
- System is under heavy load
- Network is unstable
- Other tests are running
- In production environment

### Comparison Guidelines

1. **Run multiple times** - Single runs can be misleading
2. **Use same environment** - Mock vs. real makes huge difference
3. **Consider total value** - Speed isn't everything
4. **Test on CI infrastructure** - Local results may differ from CI

### Making Decisions

**Choose Playwright if:**
- Benchmarks show 20%+ faster execution
- Running large test suites (50+ tests)
- CI/CD pipeline time is critical
- Cross-browser testing required

**Choose Cypress if:**
- Performance difference is < 20%
- Developer experience is priority
- Visual debugging is important
- Team prefers Cypress workflow

**Use both if:**
- Different teams have different preferences
- Want redundancy in test coverage
- Can afford the maintenance overhead
- Need framework-specific features

## Continuous Monitoring

### Track Performance Over Time

```bash
# Create performance log
echo "$(date),$(npm run benchmark 2>&1 | grep 'seconds')" >> performance.log

# Analyze trends
cat performance.log
```

### Set Performance Budgets

```bash
# Fail if tests take > 30 seconds
MAX_TIME=30
ACTUAL_TIME=$(npm run benchmark 2>&1 | grep -o '[0-9.]*' | head -1)

if (( $(echo "$ACTUAL_TIME > $MAX_TIME" | bc -l) )); then
  echo "❌ Tests exceeded time budget: ${ACTUAL_TIME}s > ${MAX_TIME}s"
  exit 1
fi
```

## Resources

- [Playwright Performance Best Practices](https://playwright.dev/docs/best-practices)
- [Cypress Best Practices - Performance](https://docs.cypress.io/guides/references/best-practices#Performance)
- [Test Automation Performance Patterns](https://martinfowler.com/articles/practical-test-pyramid.html)

---

[← Back to Main README](../README.md)
