describe('Home Screen', () => {
  it('should show welcome text', async () => {
    const welcomeText = await $('~welcomeText'); // testID in your RN app
    await expect(welcomeText).toBeDisplayed();
  });
});
