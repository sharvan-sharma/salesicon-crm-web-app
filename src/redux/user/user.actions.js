import userActionTypes from './user.types'

const setCurrentUser = (userobject)=>({
       type:userActionTypes.SET_CURRENT_USER,
       payload:userobject
})

const setUserPhoto = photo=>({
       type:userActionTypes.SET_USER_PHOTO,
       payload:photo
})


export {setCurrentUser,setUserPhoto}