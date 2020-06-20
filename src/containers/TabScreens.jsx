import React from 'react'
import Campaigns from '../components/dashboardComponents/staff/Campaigns'
import CreateLeads from '../components/dashboardComponents/staff/CreateLeads'
import LeadsDashboard from '../components/dashboardComponents/staff/LeadsDashboard'
import Profile from '../components/dashboardComponents/Profile'
import Sellers from '../components/dashboardComponents/admin/Sellers'
import AdminCampaigns from '../components/dashboardComponents/admin/AdminCampaigns'
import AdminConversions from '../components/dashboardComponents/admin/AdminConversions'
import AddStaff from '../components/dashboardComponents/admin/AddStaff'
import AddProducts from '../components/dashboardComponents/admin/AddProducts'
import {Redirect} from 'react-router-dom'

const TabScreens = (props)=>{
    if(props.account_type === 'staff'){
        switch(props.screen){
            case -1: return <Profile/>
            case 0: return <LeadsDashboard />
            case 1: return <Campaigns/> 
            case 2: return <CreateLeads/>
            default: return <Redirect to ='/404' />
        }
    }else{
        switch(props.screen){
            case -1: return <Profile/>
            case 0: return <AdminCampaigns />
            case 1: return <AdminConversions/> 
            case 2: return <Sellers/>
            case 3: return <AddStaff/>
            case 4: return <AddProducts/>
            default: return <Redirect to ='/404' />
        }
    }
}

export default TabScreens