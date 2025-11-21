// ============================================================
// CYPRESS TEST CONFIGURATION
// ============================================================
// Set TEST_MODE to switch between mock and real chatbot
//
// TEST_MODE = 'mock'  : Uses local mock chatbot (localhost:3000)
// TEST_MODE = 'real'  : Uses real Eva chatbot
// ============================================================

const TEST_MODE = process.env.TEST_MODE || 'mock';

const config = {
  mock: {
    url: 'http://localhost:3000/mock-eva-page.html',
    // Mock chatbot runs directly without iframe complexity
    // but we created an iframe wrapper to match the real setup
    useIframe: true
  },
  real: {
    url: 'https://www.everlywell.com/support/eva',
    useIframe: true
  }
};

// Export the current configuration
const currentConfig = config[TEST_MODE];

module.exports = {
  TEST_MODE,
  CHATBOT_URL: currentConfig.url,
  USE_IFRAME: currentConfig.useIframe,
  config
};
