const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to https://www.everlywell.com/support/eva...');
    await page.goto('https://www.everlywell.com/support/eva', {
      waitUntil: 'load',
      timeout: 60000
    });
    
    // Wait a bit for any dynamic content to load
    await page.waitForTimeout(3000);
    
    // Get the current URL
    console.log('\n=== Current URL ===');
    console.log(page.url());
    
    // Check for iframes (chatbots are often in iframes)
    console.log('\n=== Iframes Found ===');
    const iframes = await page.$$eval('iframe', iframes => 
      iframes.map(iframe => ({
        src: iframe.src,
        id: iframe.id,
        title: iframe.title,
        name: iframe.name
      }))
    );
    console.log(JSON.stringify(iframes, null, 2));
    
    // Check for data-testid attributes
    console.log('\n=== Elements with data-testid ===');
    const testIds = await page.$$eval('[data-testid]', elements =>
      elements.map(el => ({
        testid: el.getAttribute('data-testid'),
        tag: el.tagName,
        id: el.id,
        class: el.className
      }))
    );
    console.log(JSON.stringify(testIds.slice(0, 20), null, 2)); // First 20
    
    // Check for common chatbot selectors
    console.log('\n=== Chatbot-related Elements ===');
    const chatbotSelectors = [
      '[data-testid="chat-interface"]',
      '[data-testid="open-chat-button"]',
      '.chat', '.chatbot', '.chat-widget', '.chat-container',
      '[class*="chat"]', '[id*="chat"]'
    ];
    
    for (const selector of chatbotSelectors) {
      try {
        const count = await page.$$(selector).then(elements => elements.length);
        if (count > 0) {
          console.log(`Found ${count} element(s) matching: ${selector}`);
        }
      } catch (e) {
        // Selector not found, continue
      }
    }
    
    // Get page title
    console.log('\n=== Page Title ===');
    console.log(await page.title());
    
    // Check for script tags that might load the chatbot
    console.log('\n=== Script Sources (first 10) ===');
    const scripts = await page.$$eval('script[src]', scripts =>
      scripts.slice(0, 10).map(script => script.src)
    );
    scripts.forEach(src => console.log(src));
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    console.log('\n=== Keeping browser open for 10 seconds for manual inspection ===');
    await page.waitForTimeout(10000);
    await browser.close();
  }
})();

