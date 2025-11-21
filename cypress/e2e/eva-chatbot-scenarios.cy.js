const { CHATBOT_URL, USE_IFRAME, TEST_MODE } = require('../../cypress-config');

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

describe('Eva Support Chatbot - Comprehensive Test Scenarios', () => {
  const IFRAME_SELECTOR = 'iframe[id="_jst_frame"], iframe[src*="justone.ai"], iframe[src*="jst.ai"]';

  before(() => {
    cy.log(`Running tests in ${TEST_MODE.toUpperCase()} mode against: ${CHATBOT_URL}`);
  });

  // Helper function to get iframe body
  function getIframeBody() {
    // Wait for iframe to exist and be loaded
    return cy.get(IFRAME_SELECTOR, { timeout: 15000 })
      .should('exist')
      .its('0.contentDocument.body', { timeout: 15000 })
      .should('not.be.undefined')
      .then(cy.wrap);
  }

  // Helper function to wait for iframe and access its content
  function accessIframeContent(callback) {
    getIframeBody().within(callback);
  }

  // Helper function to interact with chat and run assertions
  function sendMessageAndVerify(userInput, scenario) {
    accessIframeContent(() => {
      // Wait for the chat interface to be visible and ready
      cy.get('[data-testid="chat-interface"]', { timeout: 10000 })
        .should('be.visible')
        .should('exist');

      // Wait for the input field to be ready and enabled
      cy.get('[data-testid="message-input"]', { timeout: 10000 })
        .should('be.visible')
        .should('not.be.disabled');

      // Send the message
      cy.get('[data-testid="message-input"]').clear().type(userInput);
      cy.get('[data-testid="send-button"]').click();

      // Wait for the user message to appear
      cy.get('[data-testid="user-message"]', { timeout: 5000 }).should('exist');

      // Wait for Eva's response to appear
      cy.get('[data-testid="eva-response"]', { timeout: 15000 }).should('exist');

      // Verify the latest response has content
      cy.get('[data-testid="eva-response"]').last().should(($response) => {
        expect($response.text().trim().length).to.be.greaterThan(0);
      });

      // Get the latest response text and run assertions
      cy.get('[data-testid="eva-response"]').last().invoke('text').then((responseText) => {
        const lowerResponseText = responseText.toLowerCase();

        // Verify response contains expected phrases
        if (scenario.shouldContain && scenario.shouldContain.length > 0) {
          const foundPhrases = scenario.shouldContain.filter(phrase =>
            lowerResponseText.includes(phrase.toLowerCase())
          );

          expect(
            foundPhrases.length,
            `Response should contain at least one of: ${scenario.shouldContain.join(', ')}. ` +
            `Found: ${foundPhrases.join(', ')}. Response: ${responseText.substring(0, 300)}`
          ).to.be.greaterThan(0);
        }

        // Verify response does NOT contain excluded phrases
        if (scenario.shouldNotContain && scenario.shouldNotContain.length > 0) {
          for (const phrase of scenario.shouldNotContain) {
            expect(
              lowerResponseText,
              `Response should not contain "${phrase}". Response: ${responseText.substring(0, 300)}`
            ).to.not.include(phrase.toLowerCase());
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
            ).to.be.true;
            break;

          case 'account support':
            const supportTerms = ['account', 'support', 'customer service', 'help', 'assist'];
            const hasSupportMention = supportTerms.some(term =>
              lowerResponseText.includes(term)
            );
            expect(
              hasSupportMention,
              `Response should provide account support. Response: ${responseText.substring(0, 300)}`
            ).to.be.true;
            break;

          case 'answer directly':
            // For direct answers, we mainly verify it doesn't defer unnecessarily
            // The shouldContain/shouldNotContain checks handle the specifics
            expect(responseText.length, 'Response should not be empty').to.be.greaterThan(0);
            break;
        }
      });
    });
  }

  // Generate individual tests for each scenario
  TEST_SCENARIOS.forEach((scenario) => {
    it(`Scenario: ${scenario.name}`, () => {
      // Navigate to the chat interface
      cy.visit(CHATBOT_URL, {
        timeout: 60000
      });

      // Wait for page to be fully loaded
      cy.get('body').should('be.visible');

      // Wait for iframe to be present and loaded
      cy.get(IFRAME_SELECTOR, { timeout: 15000 }).should('exist');

      // Wait a moment for iframe content to initialize
      cy.wait(1000);

      // Send message and verify response (this will handle iframe access)
      sendMessageAndVerify(scenario.userInput, scenario);
    });
  });
});
