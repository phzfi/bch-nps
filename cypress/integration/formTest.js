
describe('test form', () => {
    beforeEach(() => {
      // Cypress starts out with a blank slate for each test
      // so we must tell it to visit our website with the `cy.visit()` command.
      // Since we want to visit the same URL at the start of all our tests,
      // we include it in our beforeEach function so that it runs before each test
      cy.visit('http://localhost:3000/')
    })
  
    it('title should exist', () => {
      cy.contains('How likely are you to recommend PHZ to a friend or colleague?')
    })      

    it('The words "star" or "stars" should not exist when score unselected', () => {
        cy.contains('star').should('not.exist')
        cy.contains('stars').should('not.exist')
    })

    it('no rating should be existing at loading', () => {
        cy.contains('No rating given')
    })

    it('no filled stars', () => {
        cy.get('.MuiRating-icon MuiRating-iconFilled').should('have.length', 0)
    })

    it('there should be 11 stars (labels) (1 hidden for no rate)', () => {
        cy.get(".css-dqr9h-MuiRating-label").should('have.length', 11)
    })

    it('title should exist', () => {
        cy.contains('How likely are you to recommend PHZ to a friend or colleague?')
      }) 

    it('there should be 2 buttons, first shoulb be disabled', () => {
        cy.get('.MuiButton-root').should('have.length', 2)

        cy.get('.MuiButton-root').first().should('be.disabled')
    })

    it('first button shoulb be disabled', () => {
        cy.get('.MuiButton-root').first().should('be.disabled')
    }) 

    it('clicking second button should close the form --> give a DOM with one child', () => {
        cy.get('.MuiButton-root').last().click()
        cy.get('#psForm').children().should('have.length', 1)
    }) 

    it('after clicking a star there should be a filled star', () => {
        cy.get(".MuiRating-visuallyHidden").first().click({force: true})
        cy.get('.MuiRating-icon.MuiRating-iconFilled').should('have.length', 1)
    })

    it('after clicking 10 stars and clicking in textarea there should be 10 filled star', () => {
        cy.get(".MuiRating-visuallyHidden").last().click({force: true })
        cy.get(".textarea:nth-child(3)").click()
        cy.get('.MuiRating-icon.MuiRating-iconFilled').should('have.length', 10)
    })

})