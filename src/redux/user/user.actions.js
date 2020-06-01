import userActionTypes from './user.types'

const setCurrentUser = (userobject)=>({
       type:userActionTypes.SET_CURRENT_USER,
       payload:userobject
})



export {setCurrentUser}