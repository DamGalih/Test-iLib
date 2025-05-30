describe('Negative Login Test', () => {
    const baseURl = 'https://web-unipadigitallibrary.moco.co.id/login'
      beforeEach(() => {
    cy.visit (baseURl, { failOnStatusCode: false })
    })

    //Password tidak sesuai
 it('Tes pasword tidak sesuai', () => {
    cy.get('input[name="email"]').type('rektor@unipa.ac.id')
    cy.get('input[name="password"]').type('salahpassword')
    cy.get('form').submit()

    //respons
cy.contains('Password tidak sesuai.', { timeout: 10000 }).should('be.visible')
    cy.url().should('include', '/login')
  })

    //Password tidak sesuai
 it('Tes email tidak sesuai', () => {
    cy.get('input[name="email"]').type('salah@unipa.ac.id')
    cy.get('input[name="password"]').type('12345678')
    cy.get('form').submit()

    //respons
cy.contains('Pengguna tidak ditemukan.', { timeout: 10000 }).should('be.visible')
    cy.url().should('include', '/login')
  })


it('login form tidak diisi', () => {
    cy.get('form').within(() => {
    cy.get('button[type="submit"]').click()

    // Validasi bahwa field wajib harus diisi (validasi HTML5)
   cy.get('input[name="email"]')

  cy.get('input[name="password"]')
    })

      })
      it('Email dan password salah', () => {
    cy.get('input[name="email"]').type('salah@unipa.ac.id')
    cy.get('input[name="password"]').type('salahpassword')
    cy.get('form').submit()

    cy.contains('Pengguna tidak ditemukan.').should('be.visible')
    cy.url().should('include', '/login')
  })
})
