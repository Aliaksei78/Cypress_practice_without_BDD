const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/tests/*.js',
    baseUrl: "https://store.google.com/us/collection/accessories_wall?hl=en-US"
  },
});
