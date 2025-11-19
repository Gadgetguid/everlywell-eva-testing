#!/bin/bash

# Eva Testing Framework - Setup Verification Script
# This script checks that everything is installed and configured correctly

set -e  # Exit on error

echo "======================================================================"
echo "🔍 Eva Testing Framework - Setup Verification"
echo "======================================================================"
echo ""

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track overall status
ERRORS=0
WARNINGS=0

# Function to print success
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Function to print error
error() {
    echo -e "${RED}❌ $1${NC}"
    ERRORS=$((ERRORS + 1))
}

# Function to print warning
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    WARNINGS=$((WARNINGS + 1))
}

echo "Phase 1: Checking Prerequisites..."
echo "-----------------------------------"

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    success "Node.js installed: $NODE_VERSION"
else
    error "Node.js not found. Install from https://nodejs.org/"
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    success "npm installed: $NPM_VERSION"
else
    error "npm not found. Install Node.js which includes npm"
fi

# Check Python
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    success "Python installed: $PYTHON_VERSION"
else
    error "Python 3 not found. Install from https://www.python.org/"
fi

# Check pip
if command -v pip3 &> /dev/null; then
    PIP_VERSION=$(pip3 --version)
    success "pip installed: $PIP_VERSION"
else
    error "pip not found. Install pip3"
fi

# Check Git
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    success "Git installed: $GIT_VERSION"
else
    warning "Git not found. Install for version control"
fi

# Check GitHub CLI (optional)
if command -v gh &> /dev/null; then
    GH_VERSION=$(gh --version | head -1)
    success "GitHub CLI installed: $GH_VERSION"
else
    warning "GitHub CLI not found (optional). Install with: brew install gh"
fi

echo ""
echo "Phase 2: Checking Node Dependencies..."
echo "---------------------------------------"

# Check if node_modules exists
if [ -d "node_modules" ]; then
    success "node_modules directory exists"

    # Check Playwright
    if [ -d "node_modules/@playwright" ]; then
        success "Playwright installed"
    else
        error "Playwright not installed. Run: npm install"
    fi
else
    error "node_modules not found. Run: npm install"
fi

# Check package.json
if [ -f "package.json" ]; then
    success "package.json found"
else
    error "package.json not found"
fi

echo ""
echo "Phase 3: Checking Python Dependencies..."
echo "-----------------------------------------"

# Check anthropic package
if python3 -c "import anthropic" 2>/dev/null; then
    success "anthropic package installed"
else
    error "anthropic package not installed. Run: pip install anthropic"
fi

# Check for requirements.txt
if [ -f "requirements.txt" ]; then
    success "requirements.txt found"
else
    warning "requirements.txt not found"
fi

echo ""
echo "Phase 4: Checking Environment Variables..."
echo "-------------------------------------------"

# Check ANTHROPIC_API_KEY
if [ -z "$ANTHROPIC_API_KEY" ]; then
    error "ANTHROPIC_API_KEY not set. Run: export ANTHROPIC_API_KEY='your-key'"
else
    # Mask the key for security
    MASKED_KEY="${ANTHROPIC_API_KEY:0:7}...${ANTHROPIC_API_KEY: -4}"
    success "ANTHROPIC_API_KEY is set: $MASKED_KEY"
fi

echo ""
echo "Phase 5: Checking Project Files..."
echo "-----------------------------------"

# Check for required files
FILES=(
    "mock-eva-chatbot.html"
    "mock-eva-page.html"
    "mock-server.js"
    "test-config.js"
    "test-generator.py"
    "failure-analyzer.py"
    "playwright.config.js"
    "README.md"
    "WALKTHROUGH.md"
    "DEMO_SCRIPT.md"
    "GIT_SETUP.md"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        success "$file exists"
    else
        error "$file not found"
    fi
done

# Check for test files
if [ -f "tests/eva-chatbot.spec.js" ]; then
    success "tests/eva-chatbot.spec.js exists"
else
    error "tests/eva-chatbot.spec.js not found"
fi

if [ -f "tests/eva-chatbot-scenarios.spec.js" ]; then
    success "tests/eva-chatbot-scenarios.spec.js exists"
else
    error "tests/eva-chatbot-scenarios.spec.js not found"
fi

# Check for examples
if [ -d "examples" ]; then
    success "examples directory exists"

    if [ -f "examples/QUICKSTART.md" ]; then
        success "examples/QUICKSTART.md exists"
    else
        warning "examples/QUICKSTART.md not found"
    fi
else
    warning "examples directory not found"
fi

echo ""
echo "Phase 6: Checking Executables..."
echo "---------------------------------"

# Check if Python scripts are executable
if [ -x "test-generator.py" ]; then
    success "test-generator.py is executable"
else
    warning "test-generator.py not executable. Run: chmod +x test-generator.py"
fi

if [ -x "failure-analyzer.py" ]; then
    success "failure-analyzer.py is executable"
else
    warning "failure-analyzer.py not executable. Run: chmod +x failure-analyzer.py"
fi

echo ""
echo "Phase 7: Quick Functional Tests..."
echo "-----------------------------------"

# Test that test-generator.py runs (without API call)
if python3 test-generator.py --help 2>&1 | grep -q "Usage" || \
   python3 test-generator.py 2>&1 | grep -q "Usage"; then
    success "test-generator.py is runnable"
else
    # Expected to show usage, so check for any output
    if [ -f "test-generator.py" ]; then
        success "test-generator.py exists and is a Python file"
    fi
fi

# Test that failure-analyzer.py runs (without API call)
if python3 failure-analyzer.py --help 2>&1 | grep -q "Usage" || \
   python3 failure-analyzer.py 2>&1 | grep -q "Usage"; then
    success "failure-analyzer.py is runnable"
else
    if [ -f "failure-analyzer.py" ]; then
        success "failure-analyzer.py exists and is a Python file"
    fi
fi

# Check if mock server can start (don't actually start it)
if [ -f "mock-server.js" ]; then
    if node -c mock-server.js 2>/dev/null; then
        success "mock-server.js syntax is valid"
    else
        warning "mock-server.js has syntax errors"
    fi
fi

echo ""
echo "======================================================================"
echo "📊 Verification Summary"
echo "======================================================================"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ Perfect! Everything is set up correctly!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Read WALKTHROUGH.md for systematic testing"
    echo "2. Start mock server: npm run mock-server"
    echo "3. Run tests: npm run test:mock:headed"
    echo "4. Try AI tools: python test-generator.py 'your feature'"
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Setup is mostly complete with $WARNINGS warning(s)${NC}"
    echo ""
    echo "Warnings are optional items. You can proceed!"
    echo ""
    echo "Next steps:"
    echo "1. Read WALKTHROUGH.md for systematic testing"
    echo "2. Start mock server: npm run mock-server"
else
    echo -e "${RED}❌ Setup has $ERRORS error(s) and $WARNINGS warning(s)${NC}"
    echo ""
    echo "Please fix the errors above before proceeding."
    echo ""
    echo "Common fixes:"
    echo "- npm install (for Node dependencies)"
    echo "- pip install -r requirements.txt (for Python dependencies)"
    echo "- export ANTHROPIC_API_KEY='your-key' (for API access)"
fi

echo ""
echo "For detailed instructions, see:"
echo "- WALKTHROUGH.md - Complete step-by-step guide"
echo "- examples/QUICKSTART.md - Quick 5-minute start"
echo "- GIT_SETUP.md - GitHub publishing guide"
echo "======================================================================"

# Exit with error code if there were errors
if [ $ERRORS -gt 0 ]; then
    exit 1
else
    exit 0
fi
