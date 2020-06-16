import userActionTypes from './user.types'

const setCurrentUser = (userobject)=>({
       type:userActionTypes.SET_CURRENT_USER,
       payload:userobject
})

const setUserPhoto = photo=>({
       type:userActionTypes.SET_USER_PHOTO,
       payload:photo
})

const setUserName = name=>({
       type:userActionTypes.SET_USER_NAME,
       payload:name
})

const setUserPhone = phone=>({
       type:userActionTypes.SET_USER_PHONE,
       payload:phone
})


export {setCurrentUser,setUserPhoto,setUserPhone,setUserName}