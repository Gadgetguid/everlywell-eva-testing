const { test, expect } = require('@playwright/test');
const { CHATBOT_URL, USE_IFRAME, TEST_MODE } = require('../test-config');

console.log(`Running tests in ${TEST_MODE.toUpperCase()} mode against: ${CHATBOT_URL}`);

/**
 * Test scenarios for Eva Support Chatbot
 *
 * Each test scenario includes:
 * - User input message
 * - Expected response type (answer directly, defer to physician, account support)
 * - Key phrases that should/shouldn't appear in response
 */

const TEST_SCENARIOS = [
  // ========== TIMING QUESTIONS ==========
  {
    name: 'Timing - When will results be ready?',
    userInput: 'When will my test results be ready?',
    expectedResponseType: 'answer directly',
    shouldContain: ['days', 'business days', 'results', 'email', 'notify', 'complete'],
    shouldNotContain: ['physician', 'doctor', 'medication', 'prescription']
  },
  {
    name: 'Timing - How long does shipping take?',
    userInput: 'How long does shipping take for my test kit?',
    expectedResponseType: 'answer directly',
    shouldContain: ['shipping', 'delivery', 'days', 'business days', 'tracking'],
    shouldNotContain: ['physician', 'doctor', 'medication', 'medical advice']
  },
  {
    name: 'Timing - When should I expect my kit?',
    userInput: 'When should I expect my test kit to arrive?',
    expectedResponseType: 'answer directly',
    shouldContain: ['arrive', 'delivery', 'shipping', 'tracking', 'order'],
    shouldNotContain: ['physician', 'doctor', 'medication']
  },

  // ========== MEDICAL INTERPRETATION QUESTIONS ==========
  {
    name: 'Medical Interpretation - TSH level meaning',
    userInput: 'What does my TSH of 5.2 mean?',
    expectedResponseType: 'defer to physician',
    shouldContain: ['thyroid', 'elevated', 'high', 'physician', 'doctor', 'healthcare provider'],
    shouldNotContain: ['levothyroxine', 'synthroid', 'medication', 'prescription', 'diagnosis']
  },
  {
    name: 'Medical Interpretation - High cortisol level',
    userInput: 'What does a high cortisol level of 25 indicate?',
    expectedResponseType: 'defer to physician',
    shouldContain: ['cortisol', 'stress', 'physician', 'doctor', 'healthcare provider', 'consult'],
    shouldNotContain: ['medication', 'prescription', 'treat', 'diagnosis', 'condition']
  },
  {
    name: 'Medical Interpretation - Low vitamin D',
    userInput: 'What does my vitamin D level of 15 mean?',
    expectedResponseType: 'defer to physician',
    shouldContain: ['vitamin d', 'low', 'deficient', 'physician', 'doctor', 'healthcare provider'],
    shouldNotContain: ['prescription', 'specific medication', 'diagnosis']
  },
  {
    name: 'Medical Interpretation - HbA1c level',
    userInput: 'What does my HbA1c of 6.8 mean?',
    expectedResponseType: 'defer to physician',
    shouldContain: ['hba1c', 'blood sugar', 'diabetes', 'glucose', 'physician', 'doctor'],
    shouldNotContain: ['metformin', 'insulin', 'medication', 'prescription', 'diagnosis']
  },
  {
    name: 'Medical Interpretation - Testosterone level',
    userInput: 'What does my testosterone level of 300 mean?',
    expectedResponseType: 'defer to physician',
    shouldContain: ['testosterone', 'hormone', 'physician', 'doctor', 'healthcare provider'],
    shouldNotContain: ['testosterone replacement', 'trt', 'medication', 'prescription']
  },

  // ========== MEDICAL ADVICE QUESTIONS ==========
  {
    name: 'Medical Advice - Should I take medication for high cholesterol?',
    userInput: 'Should I take medication for my high cholesterol?',
    expectedResponseType: 'defer to physician',
    shouldContain: ['physician', 'doctor', 'healthcare provider', 'consult', 'medical professional'],
    shouldNotContain: ['yes', 'statin', 'medication name', 'prescription']
  },
  {
    name: 'Medical Advice - What medication for thyroid?',
    userInput: 'What medication should I take for my thyroid?',
    expectedResponseType: 'defer to physician',
    shouldContain: ['physician', 'doctor', 'healthcare provider', 'consult', 'cannot prescribe'],
    shouldNotContain: ['levothyroxine', 'synthroid', 'medication name', 'prescription', 'should take']
  },
  {
    name: 'Medical Advice - Can I treat low vitamin D with supplements?',
    userInput: 'Can I treat my low vitamin D with supplements?',
    expectedResponseType: 'defer to physician',
    shouldContain: ['physician', 'doctor', 'healthcare provider', 'consult', 'medical professional'],
    shouldNotContain: ['yes', 'you should take', 'specific dosage', 'prescription']
  },
  {
    name: 'Medical Advice - Should I be concerned about my results?',
    userInput: 'Should I be concerned about my test results?',
    expectedResponseType: 'defer to physician',
    shouldContain: ['physician', 'doctor', 'healthcare provider', 'consult', 'discuss'],
    shouldNotContain: ['yes', 'no', 'should be concerned', 'diagnosis', 'condition']
  },

  // ========== ACCOUNT MANAGEMENT ==========
  {
    name: 'Account Management - How to cancel test',
    userInput: 'How do I cancel my test?',
    expectedResponseType: 'account support',
    shouldContain: ['cancel', 'refund', 'account', 'order', 'support', 'customer service'],
    shouldNotContain: ['physician', 'doctor', 'medical advice']
  },
  {
    name: 'Account Management - Update shipping address',
    userInput: 'How do I update my shipping address?',
    expectedResponseType: 'account support',
    shouldContain: ['address', 'shipping', 'update', 'account', 'profile', 'settings'],
    shouldNotContain: ['physician', 'doctor', 'medical advice']
  },
  {
    name: 'Account Management - View test results',
    userInput: 'How do I view my test results?',
    expectedResponseType: 'account support',
    shouldContain: ['results', 'account', 'dashboard', 'login', 'view', 'access'],
    shouldNotContain: ['physician', 'doctor', 'medical advice']
  },
  {
    name: 'Account Management - Return test kit',
    userInput: 'How do I return my test kit?',
    expectedResponseType: 'account support',
    shouldContain: ['return', 'kit', 'shipping', 'label', 'instructions', 'support'],
    shouldNotContain: ['physician', 'doctor', 'medical advice']
  },

  // ========== GENERAL HEALTH QUESTIONS ==========
  {
    name: 'General Health - What tests do you offer?',
    userInput: 'What tests do you offer?',
    expectedResponseType: 'answer directly',
    shouldContain: ['tests', 'offer', 'available', 'categories', 'health'],
    shouldNotContain: ['physician', 'doctor', 'prescription', 'medication']
  },
  {
    name: 'General Health - How accurate are your tests?',
    userInput: 'How accurate are your tests?',
    expectedResponseType: 'answer directly',
    shouldContain: ['accurate', 'accuracy', 'laboratory', 'certified', 'clia'],
    shouldNotContain: ['physician', 'doctor', 'prescription', 'medication']
  },
  {
    name: 'General Health - What should I do before taking a test?',
    userInput: 'What should I do before taking a test?',
    expectedResponseType: 'answer directly',
    shouldContain: ['instructions', 'fasting', 'preparation', 'before', 'read'],
    shouldNotContain: ['physician', 'doctor', 'prescription', 'medication']
  },
  {
    name: 'General Health - Can I share results with my doctor?',
    userInput: 'Can I share my results with my doctor?',
    expectedResponseType: 'answer directly',
    shouldContain: ['share', 'doctor', 'physician', 'download', 'pdf', 'print'],
    shouldNotContain: ['prescription', 'medication', 'medical advice']
  }
];

test.describe('Eva Support Chatbot - Comprehensive Test Scenarios', () => {
  // Helper function to get the chatbot iframe
  async function getChatbotIframe(page) {
    // Wait for the chatbot iframe to load
    // The chatbot is embedded in an iframe from justone.ai
    const iframeSelector = 'iframe[id="_jst_frame"], iframe[src*="justone.ai"], iframe[src*="jst.ai"]';
    await page.waitForSelector(iframeSelector, { timeout: 15000 });
    
    // Get the iframe element and switch to its content
    const iframeElement = await page.$(iframeSelector);
    const iframe = await iframeElement.contentFrame();
    
    // Wait a bit for the iframe content to fully load
    await page.waitForTimeout(2000);
    
    return iframe;
  }

  // Helper function to interact with chat
  async function sendMessageAndGetResponse(iframe, userInput) {
    // Wait for the chat interface to be visible, or try to open it
    try {
      await iframe.waitForSelector('[data-testid="chat-interface"]', { timeout: 10000, state: 'visible' });
    } catch (e) {
      // If chat interface not visible, try to open it
      const chatButton = iframe.locator('[data-testid="open-chat-button"]');
      try {
        await chatButton.waitFor({ state: 'visible', timeout: 5000 });
        await chatButton.click();
        await iframe.waitForSelector('[data-testid="chat-interface"]', { state: 'visible', timeout: 10000 });
      } catch (buttonError) {
        // Button not found or not visible, continue anyway
      }
    }

    // Wait for the input field to be ready
    const messageInput = iframe.locator('[data-testid="message-input"]');
    await messageInput.waitFor({ state: 'visible' });

    // Count existing responses before sending message
    const initialResponseCount = await iframe.locator('[data-testid="eva-response"]').count();

    // Send the message
    await messageInput.fill(userInput);
    await iframe.locator('[data-testid="send-button"]').click();

    // Wait for the user message to appear
    await iframe.waitForSelector('[data-testid="user-message"]', { timeout: 5000 });

    // Wait for Eva's response (up to 10 seconds)
    await iframe.waitForFunction(
      ({ initialCount, selector }) => {
        const responses = document.querySelectorAll(selector);
        return responses.length > initialCount && 
               responses[responses.length - 1].textContent.trim().length > 0;
      },
      { initialCount: initialResponseCount, selector: '[data-testid="eva-response"]' },
      { timeout: 10000 }
    );

    // Get the latest response text
    const evaResponse = iframe.locator('[data-testid="eva-response"]').last();
    const responseText = await evaResponse.textContent();
    return responseText;
  }

  // Generate individual tests for each scenario
  TEST_SCENARIOS.forEach((scenario) => {
    test(`Scenario: ${scenario.name}`, async ({ page }) => {
      // Navigate to the chat interface
      // Using 'load' instead of 'networkidle' for more reliable page loading
      await page.goto(CHATBOT_URL, {
        waitUntil: 'load',
        timeout: 60000
      });

      // Get the chatbot iframe
      const iframe = await getChatbotIframe(page);

      // Send message and get response
      const responseText = await sendMessageAndGetResponse(iframe, scenario.userInput);
      const lowerResponseText = responseText.toLowerCase();

      // Verify response contains expected phrases
      if (scenario.shouldContain && scenario.shouldContain.length > 0) {
        const foundPhrases = scenario.shouldContain.filter(phrase => 
          lowerResponseText.includes(phrase.toLowerCase())
        );
        
        expect(
          foundPhrases.length > 0,
          `Response should contain at least one of: ${scenario.shouldContain.join(', ')}. ` +
          `Found: ${foundPhrases.join(', ')}. Response: ${responseText.substring(0, 300)}`
        ).toBeTruthy();
      }

      // Verify response does NOT contain excluded phrases
      if (scenario.shouldNotContain && scenario.shouldNotContain.length > 0) {
        for (const phrase of scenario.shouldNotContain) {
          expect(
            lowerResponseText,
            `Response should not contain "${phrase}". Response: ${responseText.substring(0, 300)}`
          ).not.toContain(phrase.toLowerCase());
        }
      }

      // Verify response type based on expected behavior
      switch (scenario.expectedResponseType) {
        case 'defer to physician':
          const physicianTerms = ['physician', 'doctor', 'healthcare provider', 'medical professional'];
          const hasPhysicianMention = physicianTerms.some(term => 
            lowerResponseText.includes(term)
          );
          expect(
            hasPhysicianMention,
            `Response should defer to physician. Response: ${responseText.substring(0, 300)}`
          ).toBeTruthy();
          break;

        case 'account support':
          const supportTerms = ['account', 'support', 'customer service', 'help', 'assist'];
          const hasSupportMention = supportTerms.some(term => 
            lowerResponseText.includes(term)
          );
          expect(
            hasSupportMention,
            `Response should provide account support. Response: ${responseText.substring(0, 300)}`
          ).toBeTruthy();
          break;

        case 'answer directly':
          // For direct answers, we mainly verify it doesn't defer unnecessarily
          // The shouldContain/shouldNotContain checks handle the specifics
          expect(responseText.length, 'Response should not be empty').toBeGreaterThan(0);
          break;
      }
    });
  });
});

