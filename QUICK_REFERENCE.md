# Quick Reference Card

## 🚀 Essential Commands

### Running Tests

```bash
# Playwright (Mock)
npm run test:mock              # Headless
npm run test:mock:headed       # With browser
npm run test:mock:ui           # Interactive UI

# Cypress (Mock)
npm run cypress:run:mock       # Headless
npm run cypress:run:mock:headed # With browser
npm run cypress:open           # Test Runner

# Performance Comparison
npm run benchmark              # Compare both frameworks
```

### Development

```bash
# Start mock server (required for tests)
npm run mock-server

# Generate new tests
python test-generator.py "feature description"
python cypress-test-generator.py "feature description"

# Analyze test failures
python failure-analyzer.py "test name" "error" "file.spec.js"
```

### Repository Management

```bash
# View on GitHub
gh repo view --web

# Check CI status
gh run list
gh run watch

# Pull latest changes
git pull origin main
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `README.md` | Main documentation |
| `docs/CYPRESS.md` | Cypress guide |
| `docs/BENCHMARK.md` | Performance guide |
| `docs/AI_TOOLS.md` | AI tools guide |
| `PROJECT_SUMMARY.md` | Executive summary |
| `benchmark-tests.sh` | Compare frameworks |

## 🔗 Important Links

- **Repository**: https://github.com/Gadgetguid/everlywell-eva-testing
- **Actions**: https://github.com/Gadgetguid/everlywell-eva-testing/actions
- **Playwright Docs**: https://playwright.dev
- **Cypress Docs**: https://www.cypress.io

## 🎯 Framework Decision Guide

**Use Playwright when:**
- Running in CI/CD (faster)
- Cross-browser testing needed
- API/network testing required

**Use Cypress when:**
- Developing new tests (better DX)
- Debugging failures (time-travel)
- Visual validation needed

**Run benchmark to decide!**
```bash
npm run benchmark
```

## ✅ Pre-Commit Checklist

```bash
# 1. Tests pass
npm run test:mock
npm run cypress:run:mock

# 2. Benchmark works
npm run benchmark

# 3. Stage and commit
git add .
git commit -m "feat: description"
git push origin main

# 4. Verify CI passes
gh run watch
```

## 🤖 AI Tools Quick Start

```bash
# Generate Playwright tests
python test-generator.py "Eva handles timing questions"

# Generate Cypress tests
python cypress-test-generator.py "Eva handles medical advice"

# Analyze failure
python failure-analyzer.py \
  "test name" \
  "TimeoutError: ..." \
  tests/file.spec.js
```

## 📊 Project Stats

- **Test Scenarios**: 23 (each framework)
- **Test Files**: 6 total (3 Playwright + 3 Cypress)
- **Documentation**: 1,500+ lines
- **Code Lines**: 7,000+ total
- **Frameworks**: 2 (Playwright + Cypress)

## 🏥 Healthcare Compliance

All tests validate:
- ✅ Medical advice deferral to physicians
- ✅ No medication names in responses
- ✅ Appropriate professional boundaries
- ✅ HIPAA considerations

## 🎓 Learning Resources

1. Start with [README.md](README.md)
2. Read [docs/CYPRESS.md](docs/CYPRESS.md) for Cypress
3. Try [examples/QUICKSTART.md](examples/QUICKSTART.md) for AI tools
4. Run `npm run benchmark` to compare frameworks

---

**Need Help?** Check the comprehensive documentation in the `docs/` directory or open an issue on GitHub.
