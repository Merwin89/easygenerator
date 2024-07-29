const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');


module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    setupNodeEvents(on, config) {
      on('task', {
        readAlertFile() {
          return fs.readFileSync(path.join(__dirname, 'alert-text.txt'), 'utf8');
        },
      });
    },
  },
});
