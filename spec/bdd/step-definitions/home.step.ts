import { Given, When, Then, BeforeAll, AfterAll, setDefaultTimeout, Before, After } from '@cucumber/cucumber'
import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver'
import { HomePage } from '../pages/home.page'

let driver: WebDriver
let page: HomePage

BeforeAll(async () => {
  setDefaultTimeout(100000)
  driver = await new Builder().forBrowser('firefox').build();
  await driver.manage().window().setRect({ x: 0, y: 0, width: 800, height: 700 });

  page = new HomePage(driver);
})

After(async () => {
  await driver.manage().deleteAllCookies();
})

AfterAll(async () => {
  await driver.quit()
})

Given('que estoy en la vista Home', async function() {
  
  await page.irA('http://localhost:8888/paper-ts/dist/')
  // await page.irA('https://silicona.github.io')

  await page.check_title();

  await page.takeScreenshot('home')
})

When(/escribo el usuario (\w+)/, async (user: string) => {
  await page.identify(user)

  await page.takeScreenshot("home_login")
})

When('pulso el boton de login', async () => {
  await page.clickLogin()
})

Then(/veo error ([\w\s]+)/, async (error_msg: string) => {
  await page.checkError(error_msg);
})

Then(/veo el usuario (\w+) en la vista Board/, async (user) => {
  await page.check_board_name(user);
  await page.takeScreenshot("home_board")

  await page.check_current_cookie(driver, user)
})

