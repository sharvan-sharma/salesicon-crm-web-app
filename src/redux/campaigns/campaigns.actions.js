import campaignsActionTypes from './campaigns.types'

const setCampaignsObject = (array)=>({
       type:campaignsActionTypes.SET_CAMPAIGNS_OBJECT,
       payload:array
})

const addCampaign = (campaign)=>({
       type:campaignsActionTypes.ADD_CAMPAIGN,
       payload:campaign
})

const editCampaign = (campaign)=>({
       type:campaignsActionTypes.EDIT_CAMPAIGN,
       payload:campaign
})

const deleteCampaign = (id)=>({
       type:campaignsActionTypes.DELETE_CAMPAIGN,
       payload:id
})


export {setCampaignsObject,addCampaign,editCampaign,deleteCampaign}