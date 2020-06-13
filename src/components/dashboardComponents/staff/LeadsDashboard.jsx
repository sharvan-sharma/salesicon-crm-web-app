import React from 'react'
import LeadsTable from './leadsdashboard/LeadsTable'
import Lead from './leadsdashboard/Lead' 
import {Switch,Link,Route} from  'react-router-dom'



const LeadsDashboardStructure = (props)=>{

    let activeClass = 'btn btn-3 mr-2 fsm'
    let inactiveClass = 'btn bg-light text-1 mr-2 fsm'

    return (
         <>
            <div className='mbl' style={{marginTop:'10vh'}} /> 
            <div className='col-12 my-1 p-0 d-flex '>
                    <Link to='/dashboard' className={(props.screen === 0)?activeClass:inactiveClass} >TodayCalls</Link>
                    <Link to='/dashboard/leads' className={(props.screen === 1)?activeClass:inactiveClass} >Leads</Link>
            </div>
            <div className='hr-3' />
            {(props.screen === 0)?<LeadsTable type='t-calls'/>:<></>}
            {(props.screen === 1)?<LeadsTable type='leads' />:<></>}
        </>
    )
}

const LeadsDashboardRouter = ()=>{
    return (
       
        <Switch>
                <Route exact path='/dashboard' component={()=><LeadsDashboardStructure screen={0}/>} />
                <Route exact path = '/dashboard/leads' component={()=><LeadsDashboardStructure screen={1}/>} />
                <Route exact path = '/dashboard/leads/open/:lead_id' component={(prop)=>{
                    const lead_id = prop.match.params.lead_id
                    return <Lead lead_id={lead_id} type='leads'/>
                }} />
                <Route exact path = '/dashboard/open/:lead_id' component={(prop)=>{
                    const lead_id = prop.match.params.lead_id
                    return <Lead lead_id={lead_id} type='t-calls'/>
                }} />
        </Switch>
    )
}

export default LeadsDashboardRouter