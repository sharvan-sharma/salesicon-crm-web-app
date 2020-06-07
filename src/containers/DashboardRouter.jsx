import React from 'react';
import {Switch,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import DashboardStructure from './DashboardStructure'

const DashboardRouter = (props)=>{

  if(props.account_type === 'staff'){
    return (
        <Switch>
            <Route exact path='/profile' component={()=><DashboardStructure screen={-1}/>} />
            <Route exact path='/' component={()=><DashboardStructure screen={0}/> } />
            <Route exact path='/campaigns' component={()=><DashboardStructure screen={1}/>} />
            <Route exact path='/addleads' component={()=><DashboardStructure screen={2}/>} />
        </Switch>
      )
  }else {//for admin
    return (
        <Switch>
            <Route exact path='/profile' component={()=><DashboardStructure screen={-1}/>} />
            <Route exact path='/' component={()=><DashboardStructure screen={0}/> } />
            <Route exact path='/conversions' component={()=><DashboardStructure screen={1}/>} />
            <Route exact path='/pendingconv' component={()=><DashboardStructure screen={2}/>} />
            <Route exact path='/rejectedconv' component={()=><DashboardStructure screen={3}/>} />
            <Route exact path='/topsalesicons' component={()=><DashboardStructure screen={4}/>} />
            <Route exact path='/leastsalesicon' component={()=><DashboardStructure screen={5}/>} />
        </Switch>
      )
  }
}

const mapStateToProps = state=>({
account_type:state.user.account_type
})


export default connect(mapStateToProps)(DashboardRouter);
