#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Test Framework Performance Comparison${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Create a temporary directory for results
TEMP_DIR=$(mktemp -d)
PLAYWRIGHT_LOG="$TEMP_DIR/playwright.log"
CYPRESS_LOG="$TEMP_DIR/cypress.log"

# Function to run Playwright tests
run_playwright() {
    echo -e "${YELLOW}[Playwright]${NC} Starting tests..."
    START_TIME=$(date +%s.%N)

    npm run test:mock > "$PLAYWRIGHT_LOG" 2>&1
    PLAYWRIGHT_EXIT=$?

    END_TIME=$(date +%s.%N)
    PLAYWRIGHT_DURATION=$(echo "$END_TIME - $START_TIME" | bc)

    echo "$PLAYWRIGHT_DURATION" > "$TEMP_DIR/playwright_time.txt"
    echo "$PLAYWRIGHT_EXIT" > "$TEMP_DIR/playwright_exit.txt"

    if [ $PLAYWRIGHT_EXIT -eq 0 ]; then
        echo -e "${GREEN}[Playwright]${NC} Tests completed successfully"
    else
        echo -e "${RED}[Playwright]${NC} Tests failed with exit code $PLAYWRIGHT_EXIT"
    fi
}

# Function to run Cypress tests
run_cypress() {
    echo -e "${YELLOW}[Cypress]${NC} Starting tests..."
    START_TIME=$(date +%s.%N)

    npm run cypress:run:mock > "$CYPRESS_LOG" 2>&1
    CYPRESS_EXIT=$?

    END_TIME=$(date +%s.%N)
    CYPRESS_DURATION=$(echo "$END_TIME - $START_TIME" | bc)

    echo "$CYPRESS_DURATION" > "$TEMP_DIR/cypress_time.txt"
    echo "$CYPRESS_EXIT" > "$TEMP_DIR/cypress_exit.txt"

    if [ $CYPRESS_EXIT -eq 0 ]; then
        echo -e "${GREEN}[Cypress]${NC} Tests completed successfully"
    else
        echo -e "${RED}[Cypress]${NC} Tests failed with exit code $CYPRESS_EXIT"
    fi
}

# Run both test suites in parallel
echo -e "Starting both test suites in parallel...\n"

run_playwright &
PLAYWRIGHT_PID=$!

run_cypress &
CYPRESS_PID=$!

# Wait for both to complete
wait $PLAYWRIGHT_PID
wait $CYPRESS_PID

echo -e "\n${BLUE}========================================${NC}"
echo -e "${BLUE}Performance Results${NC}"
echo -e "${BLUE}========================================${NC}\n"

# Read results
PLAYWRIGHT_TIME=$(cat "$TEMP_DIR/playwright_time.txt")
CYPRESS_TIME=$(cat "$TEMP_DIR/cypress_time.txt")
PLAYWRIGHT_EXIT=$(cat "$TEMP_DIR/playwright_exit.txt")
CYPRESS_EXIT=$(cat "$TEMP_DIR/cypress_exit.txt")

# Display results
printf "%-20s %10.2f seconds\n" "Playwright:" "$PLAYWRIGHT_TIME"
printf "%-20s %10.2f seconds\n" "Cypress:" "$CYPRESS_TIME"

echo ""

# Calculate difference
DIFF=$(echo "$PLAYWRIGHT_TIME - $CYPRESS_TIME" | bc)
ABS_DIFF=$(echo "$DIFF" | tr -d '-')

if (( $(echo "$PLAYWRIGHT_TIME < $CYPRESS_TIME" | bc -l) )); then
    PERCENTAGE=$(echo "scale=2; ($ABS_DIFF / $CYPRESS_TIME) * 100" | bc)
    echo -e "${GREEN}Playwright is faster by ${ABS_DIFF}s (${PERCENTAGE}% faster)${NC}"
elif (( $(echo "$CYPRESS_TIME < $PLAYWRIGHT_TIME" | bc -l) )); then
    PERCENTAGE=$(echo "scale=2; ($ABS_DIFF / $PLAYWRIGHT_TIME) * 100" | bc)
    echo -e "${GREEN}Cypress is faster by ${ABS_DIFF}s (${PERCENTAGE}% faster)${NC}"
else
    echo "Both frameworks took the same time"
fi

echo -e "\n${BLUE}Test Status:${NC}"
if [ $PLAYWRIGHT_EXIT -eq 0 ]; then
    echo -e "  Playwright: ${GREEN}PASSED${NC}"
else
    echo -e "  Playwright: ${RED}FAILED${NC}"
fi

if [ $CYPRESS_EXIT -eq 0 ]; then
    echo -e "  Cypress:    ${GREEN}PASSED${NC}"
else
    echo -e "  Cypress:    ${RED}FAILED${NC}"
fi

echo -e "\n${BLUE}Detailed logs:${NC}"
echo -e "  Playwright: $PLAYWRIGHT_LOG"
echo -e "  Cypress:    $CYPRESS_LOG"

echo -e "\n${YELLOW}Note: Logs are in a temporary directory and will be deleted on system restart${NC}"

# Cleanup option
echo -e "\n${BLUE}========================================${NC}"
