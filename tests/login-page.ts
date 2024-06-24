import { Locator, Page } from '@playwright/test';

export class LoginPage {
  inputEmail: Locator;
  inputPassword: Locator;
  submitButton: Locator;
  errorMessage: Locator;
  constructor(public readonly page: Page) {
    this.inputEmail = page.locator('[name="email"]');
    this.inputPassword = page.locator('[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.MuiAlert-message');
  }

  public async goto() {
    await this.page.goto('/');
  }

  public async loginWithEmailAndPassword(email: string, password: string) {
    await this.inputEmail.fill(email);
    await this.inputPassword.fill(password);
    await this.submitButton.click();
  }
}