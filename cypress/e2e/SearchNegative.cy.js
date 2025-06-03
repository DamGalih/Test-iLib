describe('iLibUNIPA', () => {
  it('should login with valid credentials', () => {
    cy.visit('https://web-unipadigitallibrary.moco.co.id/login', {
      failOnStatusCode: false

    }) // Link
    

    // Isi username dan password
    cy.get('input[name="email"]').type('rektor@unipa.ac.id') // ganti dengan user asli
    cy.get('input[name="password"]').type('12345678') // ganti dengan password
    cy.get('form').submit()// sesuaikan jika bukan button biasa

   cy.url().should('not.include', '/login')
    
        // Baru visit halaman search (atau klik menu navigasi)
    cy.visit('https://web-unipadigitallibrary.moco.co.id/search', {
  failOnStatusCode: false
})
// Cek apakah modal muncul, jika iya klik tombol tutup modal
cy.get('body').then($body => {
  if ($body.find('.ant-modal-wrap').length > 0) {
    cy.get('.btn-popup-modal').click() // sesuaikan selector tombol close modal
  
  }
})

// Search tanpa isi
  cy.get('input[placeholder="Telusuri Koleksi Universitas Papua"]').should('be.visible')
  .clear('')

  cy.get('.ant-input-suffix .anticon-search').click()
  cy.get('ant-input-suffix').should('not.exist')



// Search pakai spasi
 cy.get('input[placeholder="Telusuri Koleksi Universitas Papua"]')
  .should('be.visible')
  .type(' ')

  cy.get('.ant-input-suffix .anticon-search').click()
  cy.get('ant-input-suffix').should('not.exist')

// Search pakai karakter
cy.get('input[placeholder="Telusuri Koleksi Universitas Papua"]')
  .should('be.visible')
  .type('!@#$%$$%^')

  cy.get('.ant-input-suffix .anticon-search').click()
  cy.get('ant-input-suffix').should('not.exist')

  // Search pakai Angka
cy.get('input[placeholder="Telusuri Koleksi Universitas Papua"]')
  .should('be.visible')
  .type('1234567890')

  cy.get('.ant-input-suffix .anticon-search').click()
  cy.get('ant-input-suffix').should('not.exist')

// Search pakai Short Keyword
cy.get('input[placeholder="Telusuri Koleksi Universitas Papua"]')
  .should('be.visible')
  .type('a')

  cy.get('.ant-input-suffix .anticon-search').click()
  cy.get('ant-input-suffix').should('not.exist')


  // Search pakai 1000+ karakter
  const longText = 'x'.repeat(1200)
cy.get('input[placeholder="Telusuri Koleksi Universitas Papua"]')
  .should('be.visible')
  .type(longText)

  cy.get('.ant-input-suffix .anticon-search').click()
  cy.get('ant-input-suffix').should('not.exist')

// Search pakai multiple times rapidly

cy.get('input[placeholder="Telusuri Koleksi Universitas Papua"]')
  .should('be.visible')
  .type('manajemen')

  for (let i = 0; i < 4; i++){ 

  cy.get('.ant-input-suffix .anticon-search').click()
  cy.get('ant-input-suffix').should('not.exist')
  }
// Search pakai karakter upcreas dan lowcrase

cy.get('input[placeholder="Telusuri Koleksi Universitas Papua"]')
  .should('be.visible')
  .type('MaNaJeMen')

  cy.get('.ant-input-suffix .anticon-search').click()
  cy.get('ant-input-suffix').should('not.exist')

  })
  })

