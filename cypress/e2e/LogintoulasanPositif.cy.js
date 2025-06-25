describe('iLibUNIPA', () => {
  const email = Cypress.env('email')
  const password = Cypress.env('password')

  it('should login, search, borrow, read, and review a book', () => {
    cy.visit('https://web-unipadigitallibrary.moco.co.id/login', {
      failOnStatusCode: false
    })

    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('form').submit()


    cy.visit('https://web-unipadigitallibrary.moco.co.id/search', {
      failOnStatusCode: false
    })

    cy.get('body').then($body => {
      if ($body.find('.ant-modal-wrap').length > 0) {
        cy.get('.btn-popup-modal').click()
      }
    })

    cy.get('input[placeholder="Telusuri Koleksi Universitas Papua"]')
      .should('be.visible')
      .type('ekonomi')

    cy.get('.ant-input-suffix .anticon-search').click()
    cy.get('.ant-card').eq(2).click()

    cy.contains('button', 'Pinjam')
      .should('be.visible')
      .first()
      .click()

    cy.get('button.btn-popup-modal')
      .contains('Pinjam')
      .click({ force: true })

    cy.contains('button', 'Baca')
      .should('be.visible')
      .first()
      .click()

    cy.url().should('include', '/read-book')
    cy.wait(30000)

    cy.contains('Kembali').click({ force: true })

    cy.contains('button', 'Berikan Ulasan')
      .should('be.visible')
      .first()
      .click()

    cy.get('.ant-modal-content', { timeout: 10000 }).should('be.visible')
    cy.wait(500)

    cy.get('.ant-rate-star')
      .eq(4)
      .find('.ant-rate-star-second')
      .should('exist')
      .click({ force: true })

    cy.get('input[placeholder="Tuliskan ulasan..."]')
      .should('be.visible')
      .type('Buku ini sangat membantu dalam memahami dasar-dasar manajemen.')

    cy.contains('button', 'Ubah')
      .should('be.visible')
      .click()

    cy.contains('Ulasan tersimpan.').should('exist')
  })
})
