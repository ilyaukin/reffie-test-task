import { expect, Locator, Page } from '@playwright/test';
import { LoginPage } from './login-page';

const loginData = require('./login-data.json');

export class ConversationsPage {
  row: Locator;
  toolbox: Locator;
  constructor(public readonly page: Page) {
    this.row = page.locator('.MuiTableRow-root');
    this.toolbox = page.locator('.MuiPaper-root.MuiPaper-elevation1:nth-child(1)');
  }

  public async goto() {
    // login with correct credentials
    const loginPage = new LoginPage(this.page);
    await loginPage.goto();
    await loginPage.loginWithEmailAndPassword(loginData.email, loginData.password);
    await loginPage.page.waitForURL('/landlord/inner/messages');
  }

  public async checkRow(rowNumber = 0) {
    await expect(this.row.first()).toBeVisible();
    let row = (await this.row.all())[rowNumber];
    await row.hover();
    let checkbox = row.locator('input[type="checkbox"]');
    await expect(checkbox).toBeVisible();
    await checkbox.click();
  }
}