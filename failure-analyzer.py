#!/usr/bin/env python3
"""
AI-Powered Test Failure Analyzer

This tool uses Claude AI to analyze Playwright test failures and provide
intelligent debugging suggestions. It's particularly useful for understanding
complex failures in healthcare applications where the root cause might not
be immediately obvious.

Usage:
    python failure-analyzer.py <test-name> <error-message> [test-file]

Example:
    python failure-analyzer.py "Eva responds to TSH question" \
        "TimeoutError: locator.click: Timeout 30000ms exceeded" \
        tests/eva-chatbot.spec.js

Requirements:
    - anthropic Python package
    - ANTHROPIC_API_KEY environment variable set
"""

import os
import sys
import json
from datetime import datetime

try:
    import anthropic
except ImportError:
    print("❌ Error: anthropic package not installed")
    print("Install it with: pip install anthropic")
    sys.exit(1)


def read_test_file(filepath):
    """
    Read test file contents

    Args:
        filepath: Path to the test file

    Returns:
        File contents as string, or None if file not found
    """
    try:
        with open(filepath, 'r') as f:
            return f.read()
    except FileNotFoundError:
        return None


def analyze_failure(test_name, error_message, test_code=None):
    """
    Use AI to analyze test failure and suggest fixes

    Args:
        test_name: Name of the failing test
        error_message: The error message from the test failure
        test_code: Optional test code for more context

    Returns:
        Analysis and recommendations as a string
    """

    api_key = os.environ.get('ANTHROPIC_API_KEY')
    if not api_key:
        print("❌ Error: ANTHROPIC_API_KEY environment variable not set")
        print("\nSet it with:")
        print("  export ANTHROPIC_API_KEY='your-api-key-here'")
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)

    # Build context-aware prompt
    code_section = ""
    if test_code:
        code_section = f"""

Test Code:
```javascript
{test_code}
```
"""

    prompt = f"""You are an expert QA debugging specialist for Playwright tests in healthcare applications.

A test has failed and needs analysis:

Test Name: {test_name}

Error Message:
{error_message}
{code_section}

Please provide a comprehensive analysis including:

1. **Root Cause Analysis**
   - What is the most likely cause of this failure?
   - Is this a test issue, application issue, or environmental issue?
   - Are there any red flags in the error message?

2. **Immediate Fix**
   - Specific code changes to fix this issue
   - Include the exact code with corrections
   - Explain why this fix works

3. **Robustness Improvements**
   - How to make this test more reliable
   - Better selectors or waiting strategies
   - Error handling improvements
   - Retry logic if appropriate

4. **Additional Test Coverage**
   - What related scenarios should also be tested?
   - Are there edge cases this failure revealed?
   - Suggestions for preventing similar issues

5. **Healthcare-Specific Considerations** (if applicable)
   - Does this affect patient data handling?
   - Could this impact medical advice accuracy?
   - Any compliance concerns (HIPAA, etc.)?

Be specific and actionable. Provide code examples where helpful.
"""

    print("🤖 Analyzing failure with Claude AI...")
    print()

    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=3000,
            messages=[{"role": "user", "content": prompt}]
        )

        return response.content[0].text

    except anthropic.APIError as e:
        print(f"❌ API Error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")
        sys.exit(1)


def save_analysis(analysis, test_name):
    """
    Save analysis to a file for future reference

    Args:
        analysis: The analysis text
        test_name: Name of the test (for filename)

    Returns:
        The filename where analysis was saved
    """

    # Create safe filename
    safe_name = "".join(c if c.isalnum() or c in (' ', '-') else ''
                       for c in test_name[:50]).strip()
    safe_name = safe_name.replace(' ', '-').lower()
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

    filename = f"analysis/failure-{safe_name}-{timestamp}.md"

    # Create directory if it doesn't exist
    os.makedirs('analysis', exist_ok=True)

    with open(filename, 'w') as f:
        f.write(f"# Test Failure Analysis\n\n")
        f.write(f"**Test:** {test_name}\n")
        f.write(f"**Date:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write("---\n\n")
        f.write(analysis)

    return filename


def format_output(analysis):
    """
    Format the analysis output for terminal display

    Args:
        analysis: The raw analysis text

    Returns:
        Formatted string for display
    """

    lines = []
    lines.append("=" * 70)
    lines.append("🔍 TEST FAILURE ANALYSIS")
    lines.append("=" * 70)
    lines.append("")
    lines.append(analysis)
    lines.append("")
    lines.append("=" * 70)

    return "\n".join(lines)


def main():
    """Main entry point for the failure analyzer"""

    print("=" * 70)
    print("🔍 AI-Powered Test Failure Analyzer")
    print("=" * 70)
    print()

    # Check arguments
    if len(sys.argv) < 3:
        print("Usage: python failure-analyzer.py <test-name> <error-message> [test-file]")
        print()
        print("Examples:")
        print("  python failure-analyzer.py \\")
        print("    'Eva responds to TSH question' \\")
        print("    'TimeoutError: locator.click: Timeout 30000ms exceeded'")
        print()
        print("  python failure-analyzer.py \\")
        print("    'User login test' \\")
        print("    'Error: Element not found' \\")
        print("    tests/login.spec.js")
        print()
        sys.exit(1)

    test_name = sys.argv[1]
    error_message = sys.argv[2]
    test_file = sys.argv[3] if len(sys.argv) > 3 else None

    # Read test file if provided
    test_code = None
    if test_file:
        print(f"📖 Reading test file: {test_file}")
        test_code = read_test_file(test_file)
        if test_code is None:
            print(f"⚠️  Warning: Could not read {test_file}, continuing without test code")
        print()

    # Analyze the failure
    analysis = analyze_failure(test_name, error_message, test_code)

    # Display results
    print(format_output(analysis))

    # Save analysis
    saved_file = save_analysis(analysis, test_name)
    print(f"💾 Analysis saved to: {saved_file}")
    print()
    print("💡 Tip: Review the suggestions and test them incrementally!")
    print()


if __name__ == "__main__":
    main()
