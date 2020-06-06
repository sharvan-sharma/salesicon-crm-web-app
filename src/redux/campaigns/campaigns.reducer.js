import campaignsActionTypes from './campaigns.types'
import axios from 'axios'

const INITIAL_STATE = {
    campaignsObject:{}
}

let c = 0
const readAllProducts = async ()=>{
    c += 1
    console.log('read campaigns call',c)
    try{
        let result = await axios.get('http://localhost:5000/staffapi/campaign/readallcampaigns',{withCredentials:true})
        let obj = {}
        await result.data.campaignsArray.forEach((campaign)=>{
                obj[campaign._id] = campaign
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
    INITIAL_STATE.campaignsObject = obj
})

const campaignsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case campaignsActionTypes.SET_CAMPAIGNS_OBJECT: {
            let obj = {}
            action.payload.forEach((campaign)=>{
                    obj[campaign._id] = campaign
            })
            return ({...state,campaignsObject:obj})
        }
        case campaignsActionTypes.ADD_CAMPAIGN:{
            let obj = state.campaignsObject
            obj[action.payload._id] = action.payload
            return ({...state,campaignsObject:{...obj}})
        }
        case campaignsActionTypes.EDIT_CAMPAIGN:{
            let obj = state.campaignsObject
            obj[action.payload._id] = action.payload
            return ({...state,campaignsObject:{...obj}})
        }
        case campaignsActionTypes.DELETE_CAMPAIGN:{
            let obj = state.campaignsObject
            delete obj[action.payload]
            return ({...state,campaignsObject:{...obj}})
        }
        default:
            return state
    }
}

export default campaignsReducer