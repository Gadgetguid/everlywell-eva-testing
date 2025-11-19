# Git Setup and GitHub Publishing Guide

Step-by-step guide to publish your Eva testing framework to GitHub.

---

## Prerequisites

- Git installed: `git --version`
- GitHub account created
- GitHub CLI installed (optional but recommended): `gh --version`

---

## Option 1: Using GitHub CLI (Recommended - Fastest)

### Step 1: Install GitHub CLI (if not installed)

```bash
# macOS
brew install gh

# Verify installation
gh --version
```

### Step 2: Authenticate with GitHub

```bash
gh auth login

# Follow the prompts:
# - What account? > GitHub.com
# - Protocol? > HTTPS
# - Authenticate? > Login with web browser
# - Copy the one-time code and press Enter
# - Browser will open, paste code, authorize
```

### Step 3: Initialize Git (if not already)

```bash
cd /Users/wesguidry/Downloads/Coding-Playground/everlywell

# Check if git repo
git status

# If "not a git repository", initialize:
git init
```

### Step 4: Create .gitignore

```bash
cat > .gitignore << 'EOF'
# Node modules
node_modules/

# Test results
test-results/
playwright-report/
playwright/.cache/

# Python
__pycache__/
*.pyc
.Python
env/
venv/
*.egg-info/

# Generated test files (optional - you might want to keep these)
tests/generated-*.spec.js
analysis/

# Environment variables - NEVER commit API keys
.env
.env.local
*.key

# OS files
.DS_Store
Thumbs.db
.AppleDouble
.LSOverride

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
*.log
npm-debug.log*
EOF
```

### Step 5: Initial Commit

```bash
# Add all files
git add .

# Check what will be committed
git status

# Create commit
git commit -m "Initial commit: Eva Support Chatbot Testing Framework

Complete AI-powered testing framework for healthcare chatbot including:

Features:
- Mock Eva chatbot with 23 healthcare-aware test scenarios
- Playwright test suite with mock/real environment switching
- AI-powered test generator using Claude API
- AI-powered failure analyzer for debugging
- Mock server for local development
- Comprehensive documentation and examples

Technologies:
- Playwright for E2E testing
- Python + Anthropic Claude API
- Node.js for mock server
- JavaScript/TypeScript for tests

Built with AI-first approach demonstrating modern QA practices.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Step 6: Create GitHub Repo and Push

```bash
# Create repo and push in one command
gh repo create everlywell-eva-testing \
  --public \
  --source=. \
  --remote=origin \
  --push \
  --description "AI-powered Playwright testing framework for Eva Support chatbot with mock environment, test generator, and failure analyzer"

# This will:
# ✅ Create the GitHub repository
# ✅ Set up the remote
# ✅ Push your code
# ✅ Open the repo in your browser
```

### Step 7: Verify on GitHub

```bash
# Open your repo in browser
gh repo view --web

# Or manually go to:
# https://github.com/YOUR-USERNAME/everlywell-eva-testing
```

### Step 8: Add Topics and Polish

**On GitHub website:**

1. Click "About" ⚙️ (gear icon)
2. Add topics (press Enter after each):
   - playwright
   - testing
   - ai
   - claude-ai
   - healthcare
   - qa-automation
   - chatbot
   - python
   - javascript
   - test-automation
   - everlywell

3. Update description if needed
4. Check "Website" if you want to add demo URL

**Done!** ✅ Your repo is live!

---

## Option 2: Using GitHub Website (Manual)

### Step 1: Initialize Git Locally

```bash
cd /Users/wesguidry/Downloads/Coding-Playground/everlywell

# Initialize git
git init

# Create .gitignore (same as Option 1 Step 4)
# ... create .gitignore file ...

# Add and commit
git add .
git commit -m "Initial commit: Eva Support Chatbot Testing Framework

Complete AI-powered testing framework for healthcare chatbot.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Step 2: Create Repository on GitHub

1. Go to https://github.com/new
2. Fill in:
   - **Repository name:** `everlywell-eva-testing`
   - **Description:** `AI-powered Playwright testing framework for Eva Support chatbot`
   - **Visibility:** Public
   - **Initialize:** ❌ Do NOT initialize with README (you already have one)
3. Click "Create repository"

### Step 3: Connect and Push

GitHub will show you commands. Copy and run them:

```bash
# Add remote
git remote add origin https://github.com/YOUR-USERNAME/everlywell-eva-testing.git

# Rename branch to main
git branch -M main

# Push
git push -u origin main
```

### Step 4: Add Topics (same as Option 1 Step 8)

---

## Option 3: Using SSH (For Advanced Users)

### If you prefer SSH over HTTPS:

```bash
# Generate SSH key if you don't have one
ssh-keygen -t ed25519 -C "your-email@example.com"

# Add to SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub:
# 1. Go to https://github.com/settings/keys
# 2. Click "New SSH key"
# 3. Paste the public key
# 4. Click "Add SSH key"

# Then create repo with SSH
gh repo create everlywell-eva-testing \
  --public \
  --source=. \
  --remote=origin \
  --push
```

---

## Future Updates

### Making Changes and Pushing

```bash
# After making changes
git status

# Add specific files
git add file1.js file2.py

# Or add all changes
git add .

# Commit with descriptive message
git commit -m "Add feature X: description of what changed"

# Push to GitHub
git push
```

### Example Update Workflow

```bash
# You add more test scenarios
git add tests/eva-chatbot-scenarios.spec.js
git commit -m "Add 5 new test scenarios for prescription ordering

- Test valid prescription requests
- Test controlled substance restrictions
- Test insurance validation
- Test pharmacy selection
- Test refill limits

All tests passing ✅"
git push
```

---

## Best Practices

### Commit Messages

**Good:**
```bash
git commit -m "Fix timeout issue in chat interface tests

- Increase wait time for slow responses
- Add better error handling
- Update selectors to match new UI

Fixes #12"
```

**Bad:**
```bash
git commit -m "fixed stuff"
```

### What NOT to Commit

Never commit:
- ❌ API keys or secrets
- ❌ node_modules/ directory
- ❌ .env files
- ❌ Personal information
- ❌ Large binary files

### Checking Before Commit

```bash
# See what changed
git diff

# See what will be committed
git status

# See commit history
git log --oneline -10
```

---

## Troubleshooting

### "Permission denied (publickey)"

**Solution:**
```bash
# Use HTTPS instead
git remote set-url origin https://github.com/USERNAME/everlywell-eva-testing.git
```

### "Repository already exists"

**Solution:**
```bash
# Delete the repo on GitHub first, or choose a different name
gh repo create everlywell-eva-testing-v2 --public --source=. --push
```

### "Failed to push"

**Solution:**
```bash
# Pull first, then push
git pull origin main --rebase
git push
```

### "Large files warning"

**Solution:**
```bash
# Remove large files from tracking
git rm --cached large-file.zip
echo "large-file.zip" >> .gitignore
git commit -m "Remove large file"
```

---

## Making Your Repo Stand Out

### Add README Badges

At the top of README.md:

```markdown
![Tests](https://img.shields.io/badge/tests-23%20passing-brightgreen)
![AI-Powered](https://img.shields.io/badge/AI-Claude%20Powered-blue)
![Framework](https://img.shields.io/badge/framework-Playwright-orange)
![Python](https://img.shields.io/badge/python-3.7+-blue)
![License](https://img.shields.io/badge/license-MIT-green)
```

### Add LICENSE File

```bash
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2025 Wes Guidry

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
EOF

git add LICENSE
git commit -m "Add MIT license"
git push
```

### Pin Repository

On your GitHub profile:
1. Go to your profile
2. Click "Customize your pins"
3. Select this repo
4. It will show prominently on your profile

---

## Sharing Your Work

### Direct Links to Share

```
📦 Repository:
https://github.com/YOUR-USERNAME/everlywell-eva-testing

📝 README:
https://github.com/YOUR-USERNAME/everlywell-eva-testing#readme

🤖 Test Generator:
https://github.com/YOUR-USERNAME/everlywell-eva-testing/blob/main/test-generator.py

🔍 Failure Analyzer:
https://github.com/YOUR-USERNAME/everlywell-eva-testing/blob/main/failure-analyzer.py

📚 Demo Script:
https://github.com/YOUR-USERNAME/everlywell-eva-testing/blob/main/DEMO_SCRIPT.md
```

### In Your Resume

```
Projects:
- Eva Support Chatbot Testing Framework
  Built comprehensive AI-powered testing framework with Playwright
  GitHub: github.com/YOUR-USERNAME/everlywell-eva-testing
  • 23 healthcare-aware test scenarios
  • Custom AI tools using Claude API
  • Mock environment for local testing
```

### In LinkedIn

```
Just published my Eva Support Chatbot testing framework! 🚀

Built with AI-first approach using:
✅ Playwright for E2E testing
✅ Claude AI for test generation
✅ Mock environment for safe testing
✅ 23 comprehensive scenarios

Check it out: [YOUR-GITHUB-URL]

#QA #Testing #AI #Playwright
```

---

## ✅ Verification Checklist

After pushing to GitHub:

- [ ] Repository is public
- [ ] README displays correctly with formatting
- [ ] All files are present (check on GitHub)
- [ ] No sensitive information committed
- [ ] Topics are added
- [ ] Description is clear
- [ ] Can clone and run: `git clone https://github.com/YOU/everlywell-eva-testing`

**All checked?** ✅ **Your portfolio is live!** 🎉

---

## Quick Reference

```bash
# Check status
git status

# Add files
git add .

# Commit
git commit -m "message"

# Push
git push

# Pull latest
git pull

# View commits
git log --oneline

# View remote
git remote -v

# Open on GitHub (with gh CLI)
gh repo view --web
```

**You're all set!** 🚀
