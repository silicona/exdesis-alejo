import { Key, until, WebDriver, WebElement, WebElementPromise } from "selenium-webdriver";
import { BasePage, IdentificationType } from "./Base.page";
import { assert, expect } from 'chai';
import  fs  from 'fs'


export const Locators = {
  titulo: {
    type: IdentificationType[IdentificationType.Id],
    value: "login_title"
  },

  login_name: {
    type: IdentificationType[IdentificationType.Id],
    value: "login_name"
  },

  login_btn: {
    type: IdentificationType[IdentificationType.Id],
    value: "login_btn"
  },

  logout_btn: {
    type: IdentificationType[IdentificationType.Id],
    value: "logout_btn"
  },

  login_error: {
    type: IdentificationType[IdentificationType.Id],
    value: "login_resp"
  },

  nav_name: {
    type: IdentificationType[IdentificationType.Id],
    value: "nav_name"
  },



}

export class HomePage extends BasePage {

  public constructor(driver: WebDriver) {
    super(driver);
  }

  public async identify(user: string) {
    var campo = this.getElementLocator(Locators.login_name);
    await campo.clear();
    await campo.sendKeys(user);
  }


  public async check_board_name(user: string) {
    var campo = this.getElementLocator(Locators.nav_name);

    assert.equal(await campo.getText(), user[0].toUpperCase() + user.substring(1));
  }

  public async check_current_cookie(driver: WebDriver, user: string) {
    
    let cookie = JSON.parse((await driver.manage().getCookie("PaperCurrentCookie")).value)
    expect(cookie.name).to.equal(user)
  }

  public async checkError(error: string) {
    var campo = this.getElementLocator(Locators.login_error);
    var error_text = await campo.getText();

    assert.equal(error_text, error);
  }

  public async check_title() {
    var campo = this.getElementLocator(Locators.titulo);

    assert.equal(await campo.getText(), "Identify, human!");
  }

  public async clickLogin() {
    var login_btn = this.getElementLocator(Locators.login_btn);

    await login_btn.click()
  }






}