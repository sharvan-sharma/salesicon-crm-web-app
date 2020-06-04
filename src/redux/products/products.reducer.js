import productsActionTypes from './products.types'
import axios from 'axios'


const INITIAL_STATE = {
    productsObject:{}
}
let c = 0
const readAllProducts = async ()=>{
    c += 1
    console.log('read products call',c)
    try{
        let result = await axios.get('http://localhost:5000/readproducts',{withCredentials:true})
        let obj = {}
        await result.data.productsArray.forEach((product)=>{
                obj[product._id] = product
        })
        return obj
    }catch(e){
        return ({
            error:true
        })
    }
}

const promise = readAllProducts()
promise.then(obj=>{
    INITIAL_STATE.productsObject = obj
})



const productsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case productsActionTypes.SET_PRODUCTS_OBJECT : return ({...state,productsObject:action.payload})
        default : return state
    }
}

export default productsReducer