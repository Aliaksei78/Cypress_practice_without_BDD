///<reference types="Cypress" />
import Chance from 'chance';
import AccessoriesPage from '../pageObjects/AccessoriesPage';
import ProductPage from '../pageObjects/ProductPage';
import ConfigurationPage from '../pageObjects/ConfigurationPage';
import CartPage from '../pageObjects/CartPage'


describe('User is able to add single and multiple color product to the card', () => {

  before(function () {                               // it is Hook
    cy.fixture('products').then((products) => {      // take data from 'product.json' in the folder cypress/fixtures
      this.products = Chance().pickone(products)     // now this.data visible for tests BUT ARROW FUNCTIONS DO NOT
    })                                               // BE EXIST IN before() AND it() IN THIS CASE  https://docs.cypress.io/api/commands/fixture#this-context
  })


  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })

  let productPrice;
  let productName;
  let productColor = "No variant color";


  it('User add product to the card', function () {
    cy.visit('')
    AccessoriesPage.getAllProducts().each(function (element) {
      if (element.text() === this.products.name) {
        productName = element.text()
        cy.log('Selected product: ' + productName)
        cy.wrap(element).click()
        cy.wait(1000)                                             // because page updates too slowly
      }
    })

    ProductPage.getFieldPrice().then(price => {
      productPrice = price.text()
      cy.log('Product price: ' + productPrice)
    })

    ProductPage.getBigButtonBuyOrAddToCart().then(button => {
      let buttonText = button.text()
      if (buttonText === 'Add to cart') {
        cy.log(`The product "${productName}" does not have color options`)
        cy.wrap(button).click({ force: true })
      }
      else {
        cy.wrap(button).click({ force: true })
        cy.wait(1000)
        ConfigurationPage.getColorOptions().each((element, index, list) => {
          let randomColor = Chance().pickone(list)
          cy.wrap(randomColor).click()
          return false                                             // interrupts cycle 'each' after first iteration
        })

        cy.wait(2000)                                              // because field with the color name updates too slowly
        ConfigurationPage.getFieldColorName().then(color => {
          let text = color.text()
          productColor = text.split(': ')[1]
          cy.log('Selected color: ' + productColor)
        })
        ConfigurationPage.getButtonAddToCart().click()
      }
    })

    cy.log('Data product is presented in the cart')
    CartPage.getProductName().then(nameInCart => {
      let productNameInCart = nameInCart.text()
      if (productColor === "No variant color") {
        expect(productNameInCart).to.equal(productName)
      } else {
        productNameInCart = productNameInCart.split(' ')
        productNameInCart.pop()
        productNameInCart = productNameInCart.join(' ')
        expect(productNameInCart).to.equal(productName)
      }
    })
  })


  it('The color of product is equal to the selected one', () => {
    CartPage.getProductName().then(nameInCart => {
      let productNameInCart = nameInCart.text()
      if (productColor === "No variant color") {
        expect("No variant color").to.equal(productColor)
      } else {
        let temp = productNameInCart.split(' ')
        let productColorInCart = temp.pop()
        expect(productColorInCart).to.equal(productColor)
      }
    })
  })


  it('The quantity of product is equal to the selected one', () => {
    CartPage.getSelectorQuantity().should('have.value', 1)
  })


  it('The price of product is equal to the selected one', () => {
    CartPage.getProductPrice().then(priceInCart => {
      let productPriceInCart = priceInCart.text()
      expect(productPriceInCart).to.equal(productPrice)
    })
  })


  it('The total price for one product is equal to the price of product', () => {
    CartPage.getTotalPrice().then(totalPriceInCart => {
      let productsTotalPriceInCart = totalPriceInCart.text()
      expect(productsTotalPriceInCart).to.equal(productPrice)
    })
  })


  it('There is only one chosen product in the cart', () => {
    CartPage.getAllProducts().then(list => {
      let quantity = list.length
      expect(quantity).to.equal(1)
    })
  })

})
