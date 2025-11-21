#!/usr/bin/env python3
"""
AI-Powered Cypress Test Generator

This tool uses Claude AI to generate comprehensive Cypress test suites
from natural language feature descriptions. It's particularly useful for
healthcare applications like Eva, where test scenarios need to consider
medical advice deferral, compliance requirements, and patient safety.

Usage:
    python cypress-test-generator.py "Feature description here"

Example:
    python cypress-test-generator.py "Eva Support chatbot that handles timing questions,
    medical advice questions, and account management"

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


def generate_cypress_tests(feature_description):
    """
    Generate comprehensive Cypress tests using Claude AI

    Args:
        feature_description: Natural language description of the feature to test

    Returns:
        Generated JavaScript test code as a string
    """

    api_key = os.environ.get('ANTHROPIC_API_KEY')
    if not api_key:
        print("❌ Error: ANTHROPIC_API_KEY environment variable not set")
        print("\nSet it with:")
        print("  export ANTHROPIC_API_KEY='your-api-key-here'")
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)

    prompt = f"""You are an expert QA engineer specializing in Cypress testing for healthcare applications.

Given this feature description:
{feature_description}

Generate a complete Cypress test suite that includes:

1. **Happy Path Tests**
   - Core functionality works as expected
   - User can complete primary workflows

2. **Edge Cases**
   - Boundary conditions
   - Unusual but valid inputs
   - Multiple items/rapid actions

3. **Error Handling**
   - Invalid inputs
   - Network failures
   - API errors
   - Timeout scenarios

4. **Healthcare-Specific Validations** (if applicable)
   - Medical advice deferral (recommends consulting physician)
   - No specific medication names mentioned
   - HIPAA compliance considerations
   - Patient safety checks
   - Appropriate tone (not alarming)

Requirements:
- **IMPORTANT**: Use cypress-config.js for URL configuration
  - Import: const {{ CHATBOT_URL, USE_IFRAME, TEST_MODE }} = require('../../cypress-config');
  - Use CHATBOT_URL variable instead of hardcoded URLs
  - Add console.log showing test mode in before() hook
- Use data-testid selectors (best practice)
- Include appropriate waits and assertions
- Add descriptive comments explaining critical test steps
- Follow Cypress best practices (cy.get(), cy.should(), etc.)
- Use describe blocks to organize tests
- Include before or beforeEach for common setup
- Consider accessibility (ARIA labels, keyboard navigation)
- Handle loading states appropriately
- Test both success and failure paths
- Use dynamic dates (new Date()) instead of hardcoded dates like "2024-01-15"
- Use Cypress commands instead of async/await (cy.get(), cy.should(), etc.)

Output ONLY valid, ready-to-run JavaScript code. Do not include explanations outside the code.
Use this EXACT structure:

```javascript
const {{ CHATBOT_URL, USE_IFRAME, TEST_MODE }} = require('../../cypress-config');

describe('Feature Name', () => {{
  before(() => {{
    cy.log(`Running tests in ${{TEST_MODE.toUpperCase()}} mode against: ${{CHATBOT_URL}}`);
  }});

  beforeEach(() => {{
    // Navigate to the feature page
    cy.visit(CHATBOT_URL, {{
      timeout: 60000
    }});
  }});

  it('happy path test name', () => {{
    // Test code with comments
  }});

  // More tests...
}});
```
"""

    print("🤖 Generating tests with Claude AI...")
    print(f"📝 Feature: {feature_description[:100]}...")
    print()

    try:
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4000,
            messages=[{"role": "user", "content": prompt}]
        )

        generated_code = response.content[0].text

        # Extract JavaScript code if wrapped in markdown code blocks
        if "```javascript" in generated_code:
            start = generated_code.find("```javascript") + len("```javascript")
            end = generated_code.find("```", start)
            generated_code = generated_code[start:end].strip()
        elif "```" in generated_code:
            start = generated_code.find("```") + 3
            end = generated_code.find("```", start)
            generated_code = generated_code[start:end].strip()

        return generated_code

    except anthropic.APIError as e:
        print(f"❌ API Error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")
        sys.exit(1)


def save_test_file(test_code, feature_description):
    """
    Save generated test code to a file

    Args:
        test_code: The generated JavaScript test code
        feature_description: Original feature description (for filename)

    Returns:
        The filename where tests were saved
    """

    # Create a safe filename from the feature description
    safe_name = "".join(c if c.isalnum() or c in (' ', '-') else ''
                       for c in feature_description[:50]).strip()
    safe_name = safe_name.replace(' ', '-').lower()
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

    filename = f"cypress/e2e/generated-{safe_name}-{timestamp}.cy.js"

    # Create directory if it doesn't exist
    os.makedirs(os.path.dirname(filename), exist_ok=True)

    with open(filename, 'w') as f:
        f.write(test_code)

    return filename


def main():
    """Main entry point for the test generator"""

    print("=" * 70)
    print("🧪 AI-Powered Cypress Test Generator")
    print("=" * 70)
    print()

    # Check for feature description argument
    if len(sys.argv) < 2:
        print("Usage: python cypress-test-generator.py 'feature description'")
        print()
        print("Examples:")
        print("  python cypress-test-generator.py 'Eva chatbot timing questions'")
        print("  python cypress-test-generator.py 'User login with 2FA'")
        print("  python cypress-test-generator.py 'Test results display with biomarkers'")
        print()
        sys.exit(1)

    feature_description = " ".join(sys.argv[1:])

    # Generate tests
    test_code = generate_cypress_tests(feature_description)

    # Save to file
    filename = save_test_file(test_code, feature_description)

    # Success output
    print("✅ Tests generated successfully!")
    print()
    print(f"📁 Saved to: {filename}")
    print()
    print("Next steps:")
    print(f"  1. Review the generated tests: cat {filename}")
    print(f"  2. Run the tests: npx cypress run --spec {filename}")
    print(f"  3. Debug if needed: npx cypress open")
    print()
    print("💡 Tip: Always review AI-generated tests before running in production!")
    print()


if __name__ == "__main__":
    main()
