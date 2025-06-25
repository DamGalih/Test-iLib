describe('iLibUNIPA', () => {
  it('should login with valid credentials', () => {
    cy.visit('https://web-unipadigitallibrary.moco.co.id/login', {
      failOnStatusCode: false

    }) // Link
    

    // Isi username dan password
    cy.get('input[name="email"]').type('id') // ganti dengan user asli
    cy.get('input[name="password"]').type('') // ganti dengan password
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

// Lanjutkan search
cy.get('input[placeholder="Telusuri Koleksi Universitas Papua"]')
  .should('be.visible')
  .type('ekonomi')

//klik buku yang dicari
cy.get('.ant-input-suffix .anticon-search').click()
cy.get('.ant-card').eq(2).click()

//* pinjam buku
cy.contains('button','Pinjam')
      .should('be.visible')
      .first()
      .click()
cy.get('button.btn-popup-modal')
  .contains('Pinjam')
  .click({ force: true })

  
// baca buku
cy.contains('button','Baca')
      .should('be.visible')
      .first()
      .click()

// baca buku
cy.url().should('include', '/read-book') // pastikan sudah masuk ke halaman baca
cy.wait(30000) // opsional untuk render penuh
cy.contains('Kembali').click({ force: true })
 // tidak harus visible dulu

 // beri ulasan
cy.contains('button','Berikan Ulasan')
      .should('be.visible')
      .first()
      .click()
// isi ulasan (rating dan komentar)
// asumsi ada radio/checkbox untuk rating dan textarea untuk komentar



// Pastikan modal terbuka
cy.get('.ant-modal-content', { timeout: 10000 }).should('be.visible')

   cy.wait(500)
   

// Klik bintang ke-5
cy.get('.ant-rate-star')
      .eq(8) // bintang ke-5
      .find('.ant-rate-star-second')
      .should('exist')
      .click({ force: true }) // ← ini penting!

      cy.get('.ant-rate-star').each(($el, index) => {
  cy.wrap($el).invoke('attr', 'class').then(cls => {
    cy.log(`Star ${index + 1}: ${cls}`)
  })


  
cy.get('input[placeholder="Tuliskan ulasan..."]')
  .should('be.visible')
  .type('Buku ini sangat membantu dalam memahami dasar-dasar manajemen.')



// klik tombol submit ulasan
cy.contains('button', 'Ubah')
  .should('be.visible')
  .click()

// validasi sukses
cy.contains('Ulasan tersimpan.')
  .should('exist') // sesuaikan dengan pesan sukses nyata

})
})
})
