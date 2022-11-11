import { Builder, By, until, WebDriver, WebElement } from "selenium-webdriver"
import fs from "fs";

export enum IdentificationType {
  Xpath,
  Css,
  Id,
  Js,
  Name,
  PartialLinkText,
  ClassName,
  LinkText
}

export enum Navegadores {
  Chrome = 'chrome',
  Firefox = 'firefox',
  Safari = 'safari'
}

export class BasePage {

  protected driver: WebDriver;
  public constructor(driver: WebDriver) {
    this.driver = driver
  }

  protected getElementLocator = (obj: any): WebElement => {
    switch (obj.type) {
      case IdentificationType[IdentificationType.Xpath]:
        return this.driver.findElement(By.xpath(obj.value))
      case IdentificationType[IdentificationType.ClassName]:
        return this.driver.findElement(By.className(obj.value))
      case IdentificationType[IdentificationType.Js]:
        return this.driver.findElement(By.js(obj.value))
      case IdentificationType[IdentificationType.Css]:
        return this.driver.findElement(By.css(obj.value))
      case IdentificationType[IdentificationType.LinkText]:
        return this.driver.findElement(By.linkText(obj.value))
      case IdentificationType[IdentificationType.Name]:
        return this.driver.findElement(By.name(obj.value))
      case IdentificationType[IdentificationType.Id]:
      default:
        return this.driver.findElement(By.id(obj.value))
        break;
    }
  }

  protected iniciarPausa(pausaMs: number = 5000) {
    this.driver.wait(() => { }, pausaMs)
  }

  protected esperaElemento(elemento: WebElement) {
    this.driver.wait(until.stalenessOf(elemento))
  }

  public async irA(url: string) {
    await this.driver.get(url)
  }

  public esperaElementoHastaResultado(elemento: WebElement, resultado: string) {
    this.driver.wait(until.elementTextIs(elemento, resultado))
  }

  public async getCookies() {
    await this.driver.manage().getCookies()
  }

  public async takeScreenshot(name: string) {
    let encodedString = await this.driver.takeScreenshot()
    fs.writeFileSync('./spec/bdd/screens/' + name + '.png', encodedString, 'base64')
  }
}