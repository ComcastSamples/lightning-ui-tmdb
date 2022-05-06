describe('Lightning TMDB app', () => {
  describe('Browse', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/')
      cy.get('#BrowsePage [type="Row"]').should('have.length', 5)
    })

    it('displays a page with rows', () => {
      cy.get('#BrowsePage [type="Row"]').first().find('[type="Tile"]').should('have.length', 7)
    })

    it('loads additional rows', () => {
      cy.get('body').type('{downArrow}');
      cy.get('#BrowsePage [type="Row"]').should('have.length', 8)
    })

    it('navigates to an entity page', () => {
      cy.get('body').type('{enter}');
      cy.get('#EntityPage').should('be.visible')
    })
  })

  describe('Movie EntityPage', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/#movie/414906')
      cy.get('#EntityPage').find('[texture-text="The Batman"]')
    })

    it('displays The Batman', () => {
      cy.get('#EntityPage').find('[texture-text="The Batman"]')
    })

    it('displays cast and crew', () => {
      cy.get('body').type('{downArrow}');
      cy.get('#EntityPage').find('[ref="CastAndCrew"]').should('be.visible')
      cy.get('#EntityPage').find('[ref="CastAndCrew"]').find('[type="Tile"]').should('have.length', 10)
    })
  })
})
