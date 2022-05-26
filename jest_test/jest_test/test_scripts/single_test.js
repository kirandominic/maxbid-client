/**
 * @jest-environment jest-environment-webdriver
 */
 const webdriver = require('selenium-webdriver');
 const {until} = require('selenium-webdriver');
 const {By} = require('selenium-webdriver');
  
 username= process.env.LT_USERNAME || "irohitgoyal", // Lambda Test User name
 accessKey=  process.env.LT_ACCESS_KEY || "12345678987653456754" // Lambda Test Access key
  
 const capabilities = {
   'build': 'Jest Automation Selenium Webdriver Test Script', // Build Name to be display in the test logs in the user interface
   'browserName': 'chrome', // Name of the browser to use in our test
   'version':'74.0', // browser version to be used
   'platform': 'WIN10', //  Name of the Operating System to be used
   'video': true, // flag that provides us an option to capture video.
   'network': true, // flag that provides us an option  whether to capture network logs
   'console': true, // flag that provides us an option whether to capture console logs
   'visual': true // flag that provides us an option whether to capture visual
 };
  
  
 const getElementXpath = async (driver, xpath, timeout = 3000) => {
   const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
   return await driver.wait(until.elementIsVisible(el), timeout);
 };
  
 const getElementId = async (driver, id, timeout = 3000) => {
   const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
   return await driver.wait(until.elementIsVisible(el), timeout);
 };
  
 const getElementName = async (driver, name, timeout = 3000) => {
   const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
   return await driver.wait(until.elementIsVisible(el), timeout);
 };
  
  
 const url = 'https://www.lambdatest.com/'
  
 // declaring the test group
 describe('www.lambdatest.com/#index', () => {
     
     let driver;
 // Build the web driver that we will be using in Lambda Test
   beforeAll(async () => {
     driver = new webdriver.Builder()
       .usingServer('https://'+ username +':'+ accessKey  +'@hub.lambdatest.com/wd/hub')
       .withCapabilities(capabilities)
       .build();
  
     // func to get the cloud driver eslint-disable-next-line no-undef
     await driver.get(
       `https://www.lambdatest.com`,
     );
   }, 10000);
  
   afterAll(async () => {
     await driver.quit();
   }, 15000);
   
   test('check for the rendering of the home page', async () => {
     await browser.get(url)
     const title = await browser.findElement(by.tagName('h1')).getText()
     expect(title).toContain('Perform Automated and Live Interactive Cross Browser Testing')
   })
  
   test('check whether the user email attribute is present', async () => {
     const foundAndLoadedCheck = async () => {
       await until.elementLocated(by.id('useremail'))
       const value = await browser.findElement(by.id('useremail')).getText()
       return value !== '~'
     }
  
     await browser.wait(foundAndLoadedCheck, 3000)
     const useremail = await browser.findElement(by.id('useremail')).getText()
     expect(useremail).toEqual('')
   })
  
 // declaring the test group
  
   describe('take a screenshot of the web page from the browser', () => {
     test('save a picture by taking the screenshot', async () => {
       // files saved in ./reports/screenshots by default
       await browser.get(url)
       await browser.takeScreenshot()
     })
   })
 })