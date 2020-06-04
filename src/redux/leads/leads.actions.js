import leadsActionTypes from './leads.types'

const setLeadsObject = (array)=>({
       type:leadsActionTypes.SET_LEADS_OBJECT,
       payload:array
})

const addLead = lead=>({
       type:leadsActionTypes.ADD_LEAD,
       payload:lead
})

const editLead = lead=>({
       type:leadsActionTypes.EDIT_LEAD,
       payload:lead
})

const closeLead = (id)=>({
       type:leadsActionTypes.CLOSE_LEAD,
       payload:id
})


export {setLeadsObject,editLead,addLead,closeLead}