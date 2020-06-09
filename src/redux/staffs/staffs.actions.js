import staffsActionTypes from './staffs.types'

const setStaffsObject = (array)=>({
       type:staffsActionTypes.SET_STAFFS_OBJECT,
       payload:array
})

const editStaff = (staff)=>({
       type:staffsActionTypes.EDIT_STAFF,
       payload:staff
})

export {setStaffsObject,editStaff}