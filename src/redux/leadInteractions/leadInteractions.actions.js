import leadInteractionsActionTypes from './leadInteractions.types'

const setLeadInteractionsObject = (array)=>({
       type:leadInteractionsActionTypes.SET_LEAD_INTERACTIONS_OBJECT,
       payload:array
})

const addLeadInteraction = leadInteraction=>({
       type:leadInteractionsActionTypes.ADD_LEAD_INTERACTION,
       payload:leadInteraction
})

const editLeadInteraction = leadInteraction=>({
       type:leadInteractionsActionTypes.EDIT_LEAD_INTERACTION,
       payload:leadInteraction
})



export {setLeadInteractionsObject,editLeadInteraction,addLeadInteraction}