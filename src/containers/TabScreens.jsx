import React from 'react'
import Campaigns from '../components/dashboardComponents/staff/Campaigns'
import CreateLeads from '../components/dashboardComponents/staff/CreateLeads'
import LeadsDashboard from '../components/dashboardComponents/staff/LeadsDashboard'
import Profile from '../components/dashboardComponents/Profile'
import Sellers from '../components/dashboardComponents/admin/Sellers'
import AdminCampaigns from '../components/dashboardComponents/admin/AdminCamapigns'
import AdminConversions from '../components/dashboardComponents/admin/AdminConversions'
import Staff from '../components/dashboardComponents/admin/Staff'
import Products from '../components/dashboardComponents/admin/Products'

const TabScreens = (props)=>{
    if(props.account_type === 'staff'){
        switch(props.screen){
            case -1: return <Profile/>
            case 0: return <LeadsDashboard />
            case 1: return <Campaigns/> 
            case 2: return <CreateLeads/>
            default: return <LeadsDashboard/>
        }
    }else{
        switch(props.screen){
            case -1: return <Profile/>
            case 0: return <AdminCampaigns />
            case 1: return <AdminConversions/> 
            case 2: return <Sellers/>
            case 3: return <Staff/>
            case 4: return <Products/>
            default: return <AdminCampaigns/>
        }
    }
}

export default TabScreens