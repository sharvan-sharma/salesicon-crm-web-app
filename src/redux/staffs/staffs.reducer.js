import staffsActionTypes from './staffs.types'

const INITIAL_STATE = {
    staffsObject:{}
}

const staffsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case staffsActionTypes.SET_STAFFS_OBJECT: {
            let obj = {}
            action.payload.forEach((staff)=>{
                    obj[staff._id] = staff
            })
            return ({...state,staffsObject:obj})
        }
         case staffsActionTypes.EDIT_STAFF:{
            let obj = state.staffsObject
            obj[action.payload._id] = action.payload
            return ({...state,staffsObject:{...obj}})
        }
        default:
            return state
    }
}

export default staffsReducer