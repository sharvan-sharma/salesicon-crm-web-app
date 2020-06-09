import productsActionTypes from './products.types'


const INITIAL_STATE = {
    productsObject:{}
}


const productsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case productsActionTypes.SET_PRODUCTS_OBJECT : {
            let obj = {}
            action.payload.forEach((product)=>{
                    obj[product._id] = product
            })
            return ({...state,productsObject:obj})
        }
        case productsActionTypes.ADD_PRODUCT:{
            let obj = state.productsObject
            obj[action.payload._id] = action.payload
            return ({...state,productsObject:{...obj}})
        }
        case productsActionTypes.EDIT_PRODUCT:{
            let obj = state.productsObject
            obj[action.payload._id] = action.payload
            return ({...state,productsObject:{...obj}})
        }
        case productsActionTypes.DELETE_PRODUCT:{
            let obj = state.productsObject
            delete obj[action.payload]
            return ({...state,productsObject:{...obj}})
        }
        default : return state
    }
}

export default productsReducer