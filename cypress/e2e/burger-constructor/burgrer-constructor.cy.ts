describe('test reachability', () =>{
    it('access by localhost:4000', () =>{
        cy.visit('http://localhost:4000')
    })
})
