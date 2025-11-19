# Example Feature Descriptions for Test Generator

These are example feature descriptions you can use with `test-generator.py` to create comprehensive Playwright test suites.

## Healthcare/Eva Examples

### 1. Eva Chat Timing Questions
```bash
python test-generator.py "Eva Support chatbot that answers timing questions about when test results will be ready, shipping times, and kit delivery estimates"
```

### 2. Eva Medical Advice Deferral
```bash
python test-generator.py "Eva Support chatbot that defers medical interpretation questions to physicians, never mentions specific medications, and appropriately handles TSH, cortisol, and vitamin D questions"
```

### 3. Test Results Display
```bash
python test-generator.py "Test results dashboard that displays biomarker values, reference ranges, and health status indicators with color coding for normal/elevated/low values"
```

### 4. Care Provider Matching
```bash
python test-generator.py "Eva Care provider matching system that recommends appropriate healthcare providers based on test results, filters by specialty, and allows booking appointments"
```

### 5. Biomarker Education
```bash
python test-generator.py "Educational content for biomarkers including TSH, HbA1c, cholesterol, vitamin D with explanations appropriate for patients but deferring specific interpretation to physicians"
```

## General Web App Examples

### 6. User Authentication
```bash
python test-generator.py "User login system with email/password authentication, password reset functionality, and 2-factor authentication option"
```

### 7. Shopping Cart
```bash
python test-generator.py "E-commerce shopping cart that allows adding items, updating quantities, applying promo codes, and calculating totals with tax and shipping"
```

### 8. Search Functionality
```bash
python test-generator.py "Product search with autocomplete, filters by category and price, sorting options, and pagination of results"
```

### 9. Profile Management
```bash
python test-generator.py "User profile page allowing users to update personal information, shipping address, payment methods, and notification preferences"
```

### 10. Content Publishing
```bash
python test-generator.py "Blog post creation interface with rich text editor, image upload, draft saving, preview mode, and publish/schedule functionality"
```

## Healthcare Compliance Examples

### 11. HIPAA-Compliant File Upload
```bash
python test-generator.py "Secure document upload for medical records with encryption, file type validation, size limits, and audit logging for HIPAA compliance"
```

### 12. Consent Management
```bash
python test-generator.py "Patient consent form system for medical procedures and data sharing with versioning, electronic signature, and legal compliance tracking"
```

### 13. Prescription Ordering
```bash
python test-generator.py "Prescription refill request system with physician verification, insurance validation, pharmacy selection, and controlled substance restrictions"
```

## Complex Interaction Examples

### 14. Multi-Step Form
```bash
python test-generator.py "Multi-step health questionnaire with conditional questions based on previous answers, progress saving, validation at each step, and summary review"
```

### 15. Real-time Chat
```bash
python test-generator.py "Live chat support interface with typing indicators, message history, file sharing, connection recovery, and offline message queuing"
```

## Tips for Writing Good Feature Descriptions

1. **Be Specific**: Include key functionality, not just the feature name
2. **Include Constraints**: Mention validation rules, limits, or restrictions
3. **Specify User Actions**: Describe what users can do
4. **Mention Special Cases**: Note error conditions or edge cases
5. **Healthcare Context**: For medical features, mention compliance or safety requirements

## Running the Generated Tests

After generating tests, always:

1. **Review the code**: Check that it matches your expectations
2. **Update selectors**: Ensure data-testid attributes match your app
3. **Adjust URLs**: Update page.goto() to match your application
4. **Run once**: Test on a single browser first
5. **Iterate**: Refine based on results
