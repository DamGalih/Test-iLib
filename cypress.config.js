const { defineConfig } = require("cypress");

module.exports = defineConfig({
    reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
  },

  e2e: {
    setupNodeEvents(on, config) {
      return config
      // implement node event listeners here
    },
  },
})