class ProductPage {

    getBigButtonBuyOrAddToCart() {
        return cy.get('.f6m4Qe.umRjud .Nv5u7c .transaction.qgwtFf')
    }

    getFieldPrice() {
        return cy.get('.X4eHfd .JO0Atc [data-test="financing"] .TUGUrd span')
    }

}

export default new ProductPage