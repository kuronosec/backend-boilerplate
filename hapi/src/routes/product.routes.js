const { productLib } = require('../lib')

module.exports = {
  method: 'POST',
  path: '/products',
  handler: async () => {
    try {
      const products = await productLib.getProductsWithQuantity()

      return products
    } catch (error) {
      console.error(error)
    }
  }
}
