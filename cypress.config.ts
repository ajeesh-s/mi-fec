import { defineConfig } from 'cypress'

export default defineConfig({
  screenshotOnRunFailure: false,
  numTestsKeptInMemory: 0,
  video: false,
  viewportWidth: 1024,
  viewportHeight: 768,
  retries: {
    runMode: 2,
    openMode: 2,
  },
  defaultCommandTimeout: 10000,
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
})