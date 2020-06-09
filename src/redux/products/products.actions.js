import productsActionTypes from './products.types'

const setProductsObject = array=>({
    type:productsActionTypes.SET_PRODUCTS_OBJECT,
    payload:array
})

const addProduct = (product)=>({
       type:productsActionTypes.ADD_PRODUCT,
       payload:product
})

const editProduct = (product)=>({
       type:productsActionTypes.EDIT_PRODUCT,
       payload:product
})

const deleteProduct = (id)=>({
       type:productsActionTypes.DELETE_PRODUCT,
       payload:id
})


export {setProductsObject,addProduct,editProduct,deleteProduct}