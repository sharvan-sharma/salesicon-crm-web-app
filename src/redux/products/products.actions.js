import productsActionTypes from './products.types'

const setProductsObject = array=>({
    action:productsActionTypes.SET_PRODUCTS_OBJECT,
    payload:array
})

export default {setProductsObject}