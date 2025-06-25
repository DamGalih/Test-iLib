describe('Loop Baca Buku - UNIPA Digital Library', () => {
  before(() => {
    cy.visit('https://web-unipadigitallibrary.moco.co.id/login', { failOnStatusCode: false });

    // Login
    cy.get('input[name="email"]').type('rektor@unipa.ac.id');
    cy.get('input[name="password"]').type('12345678');
    cy.get('button[type="submit"]').click();

    cy.url().should('not.include', '/login');
  });

  it('Loop klik buku > masuk > baca & screenshot', () => {
    // Kunjungi halaman search 1x untuk dapatkan total buku
    cy.visit('https://web-unipadigitallibrary.moco.co.id/search', { failOnStatusCode: false });

    // Tutup modal jika muncul
    cy.get('body').then($body => {
      if ($body.find('.ant-modal-wrap:visible').length > 0) {
        cy.get('.btn-popup-modal').click();
      }
    });

    // Isi pencarian awal
    cy.get('input[placeholder="Telusuri Koleksi Universitas Papua"]')
      .should('be.visible')
      .type('ekonomi');

    cy.get('.ant-input-suffix .anticon-search').click();

    // Hitung jumlah kartu buku
    cy.get('.ant-card', { timeout: 10000 }).then($cards => {
      const total = Math.min($cards.length, 3); // loop maksimal 3

      for (let i = 0; i < total; i++) {
        // Buka ulang halaman search untuk tiap iterasi
        cy.visit('https://web-unipadigitallibrary.moco.co.id/search', { failOnStatusCode: false });

        cy.get('body').then($body => {
          if ($body.find('.ant-modal-wrap:visible').length > 0) {
            cy.get('.btn-popup-modal').click();
          }
        });

        cy.get('input[placeholder="Telusuri Koleksi Universitas Papua"]').type('ilmu');
        cy.get('.ant-input-suffix .anticon-search').click();

        // Klik buku ke-i
        cy.get('.ant-card').eq(i).scrollIntoView().click();

        //* pinjam buku
cy.contains('button','Pinjam')
      .should('be.visible')
      .first()
      .click()
cy.get('button.btn-popup-modal')
  .contains('Pinjam')
  .click({ force: true })

        // Setelah masuk ke detail, klik tombol "Baca"
       cy.get('button.button-read').first().click(); // 👈 paling aman


        // Validasi halaman baca terbuka
        cy.url().should('include', '/read-book');
        cy.wait(20000);

        // Screenshot halaman baca
        cy.screenshot(`buku-ke-${i + 1}`);
      }
    });
  });
});
