import React from 'react'
import Campaigns from '../components/dashboardComponents/Campaigns'
import CreateLeads from '../components/dashboardComponents/CreateLeads'
import LeadsDashboard from '../components/dashboardComponents/LeadsDashboard'
import Profile from '../components/dashboardComponents/Profile'

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
            case 0: return <LeadsDashboard />
            case 1: return <Campaigns/> 
            case 2: return <CreateLeads/>
            case 3: return <Campaigns/> 
            case 4: return <CreateLeads/>
            case 5: return <Campaigns/> 
            default: return <LeadsDashboard/>
        }
    }
}

export default TabScreens