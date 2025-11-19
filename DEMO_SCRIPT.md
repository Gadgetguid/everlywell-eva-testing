# Interview Demo Script
## 5-Minute Eva Testing Framework Demo

**Goal:** Demonstrate modern AI-first QA practices with a complete, working testing framework

**Estimated Time:** 3-5 minutes
**Audience:** Everlywell hiring managers, QA leads
**Tone:** Confident, technical, practical

---

## 🎬 Opening (30 seconds)

### What You Say:

> "I'd like to show you a testing framework I built specifically with Everlywell's Eva chatbot in mind. This demonstrates what I understand 'AI-first QA' to mean - using AI not just as a coding assistant, but to build tools that solve real testing challenges."

### What You Do:

- Have terminal and browser ready
- Show GitHub repo on screen
- Display README.md to show project structure

**Talking Points:**
- Built in one week using AI-assisted development
- Demonstrates Playwright, Python, modern testing practices
- Healthcare-aware test scenarios

---

## 📱 Part 1: Mock Chatbot Demo (1 minute)

### What You Say:

> "First, I built a complete mock Eva chatbot so I can test locally without hitting production. It simulates all the behaviors Eva should have - answering timing questions, deferring medical advice to physicians, and never mentioning specific medications."

### What You Do:

```bash
# Terminal 1
npm run mock-server
```

**In Browser:** Navigate to `http://localhost:3000/mock-eva-page.html`

**Type these questions to demonstrate:**

1. **"When will my test results be ready?"**
   - Point out: "Answers directly with business days"

2. **"What does my TSH of 5.2 mean?"**
   - Point out: "Mentions thyroid, elevated, but defers to physician"
   - Point out: "No specific medication names"

3. **"How do I cancel my test?"**
   - Point out: "Directs to customer support appropriately"

### What You Say:

> "This mock lets me validate test logic before running against the real system. It has all the same data-testid attributes my tests expect."

---

## 🧪 Part 2: Playwright Tests (1 minute)

### What You Say:

> "I built a comprehensive Playwright test suite with 23 scenarios covering timing questions, medical interpretation, medical advice deferral, and account management. These tests can run against the mock or the real Eva."

### What You Do:

```bash
# Terminal 2 (keep mock server running)
npm run test:mock:headed
```

**While tests run:**

### What You Say:

> "Watch how it tests multiple scenarios automatically - timing questions, medical interpretations, account management. Each test verifies Eva responds appropriately and follows healthcare best practices."

**Point out specific tests as they run:**
- "Here it's checking Eva defers medical advice..."
- "Here it verifies no medication names are mentioned..."
- "This one tests account management flows..."

**Show results:**
> "23 tests passing. These same tests can run against the real Eva with one config change."

---

## 🤖 Part 3: AI Test Generator (1 minute)

### What You Say:

> "Beyond using AI coding assistants, I built custom tools with Claude's API. This test generator creates comprehensive Playwright tests from natural language descriptions."

### What You Do:

```bash
# Terminal (can stop the tests now)
python test-generator.py "User can filter test results by date range and biomarker type"
```

**While it generates:**

### What You Say:

> "I give it a feature description, and it generates a complete test suite with happy paths, edge cases, error handling, and healthcare-specific validations. This accelerates test creation while I still review everything."

**Show the output:**

```bash
# Show the generated file
cat tests/generated-user-can-filter-*.spec.js | head -50
```

**Point out:**
- "data-testid selectors - best practice"
- "Multiple test cases covering different scenarios"
- "Comments explaining critical steps"
- "Proper async/await and assertions"

### What You Say:

> "This doesn't replace QA judgment - I review everything. But it gives me a solid starting point and often suggests edge cases I might not have considered."

---

## 🔍 Part 4: AI Failure Analyzer (1 minute)

### What You Say:

> "When tests fail, this analyzer helps debug them. It uses AI to analyze the error, suggest root causes, and provide specific fixes."

### What You Do:

```bash
python failure-analyzer.py \
  "Eva responds to TSH question" \
  "TimeoutError: locator.click: Timeout 30000ms exceeded waiting for [data-testid='eva-response']" \
  tests/eva-chatbot.spec.js
```

**Show the output (scroll through it):**

### What You Say:

> "It provides root cause analysis, specific code fixes, suggestions for making tests more robust, and even healthcare compliance considerations. This turns debugging from hours to minutes."

**Point to analysis file:**

```bash
ls analysis/
```

> "Each analysis is saved so the team can reference them later."

---

## 🎯 Closing: The Value Proposition (30 seconds)

### What You Say:

> "This framework demonstrates three things: First, I understand modern testing tools like Playwright and can build comprehensive test suites. Second, I know how to use AI not just as Copilot, but to build custom tools that solve real problems. Third, I understand healthcare-specific requirements - Eva shouldn't give medical advice or mention medications, and my tests verify that."
>
> "I built this in a week using AI-assisted development, which is exactly what 'AI-first' means to me - combining deep testing fundamentals with rapid tool adoption."

### What You Show:

**Quick GitHub tour:**
- Point to README.md: "Complete documentation"
- Point to test files: "23 comprehensive scenarios"
- Point to Python tools: "Custom AI integration"
- Point to examples/: "Ready for the team to use"

### What You Say:

> "Everything is on GitHub, fully documented, ready to run. Happy to dive deeper into any part."

---

## 💬 Anticipated Questions & Answers

### Q: "How do you handle AI hallucinations or incorrect generated code?"

**A:** "Great question. I never use AI-generated code without review. For healthcare especially, I validate every assertion, every test scenario. AI gives me a starting point, but I apply QA judgment. For example, when the generator creates a test for medical advice, I verify it checks for physician deferral and no medication names - things AI might not emphasize."

### Q: "What if the real Eva chatbot has different selectors?"

**A:** "That's why I use data-testid attributes - they're stable and semantic. In a real scenario, I'd work with the dev team to ensure consistent test IDs. If selectors change, my tests are structured so I can update them in one place through page object patterns."

### Q: "How would you integrate this into CI/CD?"

**A:** "These are standard Playwright tests, so they integrate with any CI/CD. I'd add them to GitHub Actions or Jenkins, run them on every PR, and generate reports. For the mock tests, they'd run on every commit. For real Eva tests, I'd run them on a schedule or before deployments. I've done similar integration at Roku with our Python test framework."

### Q: "What about test data management?"

**A:** "Right now the mock has hardcoded responses, which is fine for testing test logic. For the real system, I'd use fixtures for biomarker data, mock API responses where appropriate, and possibly the AI test generator to create diverse test data sets. The key is having reproducible test scenarios."

### Q: "How do you ensure these tests don't slow down development?"

**A:** "Test execution time matters. These mock tests run in under 2 minutes for all 23 scenarios. I'd structure the suite with tags - smoke tests for quick feedback, comprehensive tests for nightly runs. Playwright's parallelization helps. And the test generator means developers can quickly add tests for new features."

### Q: "What would you test differently for production Eva?"

**A:** "Three additions: First, test with real API responses to verify parsing and error handling. Second, add performance tests - response times matter for chat. Third, add tests for bias and consistency - does Eva give the same guidance for the same biomarker values? That's where AI testing gets critical in healthcare."

---

## 🎥 Demo Variations

### If You Have 10 Minutes:

**Add:**
- Show running tests against mock in UI mode: `npm run test:mock:ui`
- Demonstrate test configuration switching
- Show failure analyzer with a real test file
- Walk through the mock chatbot response patterns

### If You Have 3 Minutes:

**Focus on:**
1. Mock chatbot (1 min) - show it works
2. Tests running (1 min) - show 23 passing
3. AI tools (30 sec each) - quick demo of each

### If Screenshare Isn't Available:

**Prepare:**
- Screenshots of each step
- Pre-recorded video (use QuickTime)
- Walk through GitHub repo directly

---

## 🎤 Practice Tips

### Run Through It 3 Times:

1. **First time:** Read from this script
2. **Second time:** Use bullet points only
3. **Third time:** From memory with natural flow

### Record Yourself:

- Use QuickTime Screen Recording
- Watch it back - are you:
  - Speaking clearly?
  - Moving too fast/slow?
  - Explaining the value, not just features?

### Time Yourself:

- Should be 3-5 minutes
- If longer, cut the verbose explanations
- If shorter, add more context

### Key Success Metrics:

- [ ] Demo runs without errors
- [ ] You sound confident, not reading
- [ ] You explain WHY, not just WHAT
- [ ] You connect it to Everlywell's needs
- [ ] You finish with clear value proposition

---

## 🔧 Pre-Demo Setup Checklist

**30 Minutes Before:**

- [ ] Close all unnecessary browser tabs
- [ ] Close unnecessary applications
- [ ] Set display to 1080p (for sharing)
- [ ] Hide desktop clutter
- [ ] Terminal font size readable (16-18pt)
- [ ] Test internet connection
- [ ] Verify mic and camera (if video call)

**5 Minutes Before:**

- [ ] Navigate to project directory
- [ ] Open 2 terminal windows
- [ ] Have GitHub repo open in browser
- [ ] Test `npm run mock-server` starts
- [ ] Test `python test-generator.py "test"` works
- [ ] Have this script open for reference

**During Demo:**

- [ ] Speak clearly and not too fast
- [ ] Pause for questions
- [ ] Be ready to improvise if something fails
- [ ] Show enthusiasm but stay professional
- [ ] Watch your time

---

## 🎯 The One-Sentence Pitch

If you only get 30 seconds:

> "I built an AI-powered Playwright testing framework for Eva that includes a mock chatbot for local testing, 23 healthcare-aware test scenarios, and custom AI tools for generating tests and debugging failures - all in one week using AI-assisted development."

---

## ✅ Final Checklist

Before the interview:

- [ ] Demo runs smoothly start to finish
- [ ] Can explain every part confidently
- [ ] Know your talking points
- [ ] Have answers to anticipated questions
- [ ] GitHub repo is public and polished
- [ ] Practiced at least 3 times
- [ ] Timed at 3-5 minutes
- [ ] Setup checklist completed

**You're ready! Go show them what AI-first QA looks like!** 🚀
