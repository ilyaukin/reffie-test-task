import { test, expect } from '@playwright/test';
import { LoginPage } from './login-page';

const loginTest = test.extend<{
  loginPage: LoginPage,
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
})

const loginData = require('./login-data.json');

loginTest.describe('Test login page', () => {
  loginTest('should login with correct email/password', async ({ loginPage }) => {
    await loginPage.loginWithEmailAndPassword(loginData.email, loginData.password);
    await loginPage.page.waitForURL((url) => url.toString().indexOf('/login') === -1);
  });

  loginTest('should show an error on the incorrect email/password', async ({ loginPage }) => {
    for (let [login, password] of [
      [loginData.email, "kajhkbjjkdsavbjksbvjk"],
      [loginData.email, ""],
      ["invalid.email@examle.com", "kjafhjk"]
    ]) {
      await loginPage.loginWithEmailAndPassword(login, password);
      await expect(loginPage.errorMessage).toBeVisible();
    }
  });
});
