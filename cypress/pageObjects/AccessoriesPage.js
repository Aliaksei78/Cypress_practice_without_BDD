class AccessoriesPage {

    getAllProducts() {
        return cy.get('.mqn2-aiv.ng-binding')
    }

}

export default new AccessoriesPage
