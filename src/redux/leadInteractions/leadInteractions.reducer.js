import leadInteractionsActionTypes from './leadInteractions.types'

const INITIAL_STATE = {
    leadInteractionsObject:{}
}

const leadsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case leadInteractionsActionTypes.SET_LEAD_INTERACTIONS_OBJECT: {
            let obj = {}
            action.payload.forEach((leadInteraction)=>{
                    obj[leadInteraction._id] = leadInteraction
            })
            return ({...state,leadInteractionsObject:obj})
        }
        case leadInteractionsActionTypes.ADD_LEAD_INTERACTION:{
            let obj = state.leadInteractionsObject
            obj[action.payload._id] = action.payload
            return ({...state,leadInteractionsObject:{...obj}})
        }
        case leadInteractionsActionTypes.EDIT_LEAD_INTERACTION:{
            let obj = state.leadInteractionsObject
            obj[action.payload._id] = action.payload
            return ({...state,leadInteractionsObject:{...obj}})
        }
        default:
            return state
    }
}

export default leadsReducer