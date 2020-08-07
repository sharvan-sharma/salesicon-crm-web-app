import React,{Suspense} from 'react'
import Profile from '../components/dashboardComponents/Profile'
import {Redirect} from 'react-router-dom'
import Brand from '../components/utilComponents/Brand'
import LinearProgress from '../components/utilComponents/LinearProgress'

const LeadsDashboard = React.lazy(()=>import('../components/dashboardComponents/staff/LeadsDashboard'))
const Campaigns = React.lazy(()=>import('../components/dashboardComponents/staff/Campaigns'))
const CreateLeads =  React.lazy(()=>import('../components/dashboardComponents/staff/CreateLeads'))
const AdminCampaigns = React.lazy(()=>import( '../components/dashboardComponents/admin/AdminCampaigns'))
const Sellers = React.lazy(()=>import('../components/dashboardComponents/admin/Sellers'))
const AdminConversions =  React.lazy(()=>import('../components/dashboardComponents/admin/AdminConversions'))
const AddStaff = React.lazy(()=>import('../components/dashboardComponents/admin/AddStaff'))
const AddProducts =  React.lazy(()=>import('../components/dashboardComponents/admin/AddProducts'))

const Loader = ()=>(
    <div className ='d-flex justify-content-center align-items-center'>
        <Brand color='dark' />
        <LinearProgress/>
    </div>
)

const TabScreens = (props)=>{
    if(props.account_type === 'staff'){
        switch(props.screen){
            case -1: return <Profile/>
            case 0: return (<Suspense fallback={<Loader/>}><LeadsDashboard /></Suspense>)
            case 1: return (<Suspense fallback={<Loader/>}><Campaigns/></Suspense>)
            case 2: return (<Suspense fallback={<Loader/>}><CreateLeads/></Suspense>)
            default: return <Redirect to ='/404' />
        }
    }else{
        switch(props.screen){
            case -1: return <Profile/>
            case 0: return (<Suspense fallback={<Loader/>}><AdminCampaigns /></Suspense>)
            case 1: return (<Suspense fallback={<Loader/>}><AdminConversions/></Suspense>) 
            case 2: return (<Suspense fallback={<Loader/>}><Sellers/></Suspense>)
            case 3: return (<Suspense fallback={<Loader/>}><AddStaff/></Suspense>)
            case 4: return (<Suspense fallback={<Loader/>}><AddProducts/></Suspense>)
            default: return <Redirect to ='/404' />
        }
    }
}

export default TabScreens