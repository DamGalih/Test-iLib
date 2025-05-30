Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('ResizeObserver loop completed')) {
    return false // abaikan error ini agar test tetap jalan
  }
})

// Import commands.js using ES2015 syntax:
import './commands'