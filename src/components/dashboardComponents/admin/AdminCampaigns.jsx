import React from 'react'
import {Switch,Route}  from 'react-router-dom'
import CampaignsTable from './Admincampaigns/CampaignsTable'


function AdminCampaigns(){
return (<Switch>
                <Route path='/' component={CampaignsTable}/>
        </Switch>)
}

export default AdminCampaigns