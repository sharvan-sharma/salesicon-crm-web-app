import React from 'react'
import {Switch,Route}  from 'react-router-dom'
import CampaignsTable from './Admincampaigns/CampaignsTable'
import {Link} from 'react-router-dom'

function AdminCampaigns(props){
        let activeClass = 'btn btn-3 mx-1 fsm'
        let InactiveClass = 'btn  btn-light mx-1 text-1 fsm'
        return (
                <>
            <div className='mbl' style={{marginTop:'10vh'}}/>
            <div className='my-2 ff-mst text-1'>
                <Link to='/dashboard' className={(props.screen === 0)?activeClass:InactiveClass} >Campaigns</Link>
                <Link to='/dashboard/top5' className={(props.screen === 1)?activeClass:InactiveClass} >Top 5 Campaigns</Link>
                <Link to='/dashboard/bottom5' className={(props.screen === 2)?activeClass:InactiveClass} >Least 5 Campaigns</Link>
            </div>
            <div className='hr-3' />
            <CampaignsTable screen={props.screen}/>
            </>
        )
}


function AdminCampaignsRouter(){
return (<Switch>
                <Route exact path='/dashboard' component={()=><AdminCampaigns screen={0} />}/>
                <Route exact path='/dashboard/top5' component={()=><AdminCampaigns screen={1} />}/>
                <Route exact path='/dashboard/bottom5' component={()=><AdminCampaigns screen={2} />}/>
        </Switch>)
}

export default AdminCampaignsRouter