import { expect, test } from '@playwright/test';
import { ConversationsPage } from './conversations-page';


const conversationsTest = test.extend<{
  conversationsPage: ConversationsPage
}>({
  conversationsPage: async ({ page }, use) => {
    const conversationsPage = new ConversationsPage(page);
    await conversationsPage.goto();
    await use(conversationsPage);
  }
});

conversationsTest.describe('Tests on the conversations page', () => {
  conversationsTest('should show the toolbox when a row is checked', async ({ conversationsPage }) => {
    // is not shown initially
    await expect(conversationsPage.toolbox).not.toBeVisible();
    // check a row
    await conversationsPage.checkRow();
    await expect(conversationsPage.toolbox).toBeVisible();
  });
});

