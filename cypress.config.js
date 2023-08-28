const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demo.nopcommerce.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
 
});
