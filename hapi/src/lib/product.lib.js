const { getModel } = require('../database')

const getProductsWithQuantity = async () => {
  const products = await getModel('product').findAll({
    where: {}
  })

  return products.map((product) => ({
    ...product.dataValues,
    quantity: Math.floor(Math.random() * 10 + 1)
  }))
}

module.exports = {
  getProductsWithQuantity
}
