describe('HomeScreen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should show welcome text', async () => {
    await expect(element(by.text('Welcome to Hospital Manager'))).toBeVisible();
  });
});
