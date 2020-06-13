import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Brand from '../components/utilComponents/Brand'
import SearchBar from '../components/dashboardComponents/Searchbar'
import {Switch,Link,Route} from 'react-router-dom'

const getSearchbar = (screen,account_type)=>{
    if(account_type === 'staff'){
        switch(screen){
            case 0 : return <StaffLeadsRouter account_type={account_type} />
            case 1 : return <SearchBar type='staff-c' account_type={account_type}/>
            case 2 : return <AddLeadsRouter />
            default: return <></>
        }
    }else{
        switch(screen){
            case 0 : return <AdminDashboardRouter account_type={account_type} />
            case 2 : return <AdminStaffRouter account_type={account_type} />
            case 4 : return <SearchBar type='admin-p' account_type={account_type} />
            case 3 : return <AddStaffRouter />
            default: return <></>
        }
    }
}

const StaffLeadsRouter =(props)=>{
    return (
        <Switch>
            <Route exact path = '/dashboard' component={()=><></>} />
            <Route exact path = '/dashboard/leads' component={()=><SearchBar type='staff-l' account_type={props.account_type}/>} />
        </Switch>
    )
}

const AdminStaffRouter = (props)=>{
            return(<Switch>
                    <Route exact path = '/sellers' component={()=><SearchBar type='admin-s' account_type={props.account_type} /> }/>
                    <Route exact path = '/sellers/top5' component={()=><></>}  />
                    <Route exact path = '/sellers/bottom5' component={()=><></>}  />
                </Switch>)
}

const AdminDashboardRouter = (props)=>{
            return(<Switch>
                    <Route exact path = '/dashboard' component={()=><SearchBar type='admin-c' account_type={props.account_type} /> }/>
                    <Route exact path = '/dashboard/top5' component={()=><></>}  />
                    <Route exact path = '/dashboard/bottom5' component={()=><></>}  />
                </Switch>)
}

const AddStaffRouter = ()=>{
        return(<Switch>
                    <Route exact path = '/addstaff' component={()=><AddStaffButtonBar screen={0} />} />
                    <Route exact path = '/addstaff/multiple' component={()=><AddStaffButtonBar screen={1} />}  />
                </Switch>)
}

const AddLeadsRouter = ()=>{
        return(<Switch>
                    <Route exact path = '/addleads' component={()=><AddLeadsButtonBar screen={0} />} />
                    <Route exact path = '/addleads/single' component={()=><AddLeadsButtonBar screen={1} />}  />
                </Switch>)
}

const AddLeadsButtonBar = (props)=>{
    
    return (
        <div  className='d-flex align-items-center'>
            <Link to='/addleads' className={(props.screen === 0)?'btn btn-3 fsm mr-3':'btn btn-outline-3 fsm mr-3'} >Multiple Leads (xls)</Link>
            <Link to='/addleads/single' className={(props.screen === 1)?'btn btn-3  fsm':'btn btn-outline-3 fsm'} >Single Lead</Link>
        </div>
    )
}

const AddStaffButtonBar = (props)=>{
    
    return (
        <div  className='d-flex align-items-center'>
            <Link to='/addstaff' className={(props.screen === 0)?'btn btn-3 mr-3 fsm':'btn btn-outline-3 mr-3 fsm'} >Single</Link>
            <Link to='/addstaff/multiple' className={(props.screen === 1)?'btn btn-3 fsm':'btn btn-outline-3 fsm'} >Multiple</Link>
        </div>
    )
}


function Navbar (props) {
return (
        <div className='d-flex align-items-center flex-wrap-reverse text-dark'>
          <div className='col-12 col-md-6 col-lg-6 my-1 '>
              {getSearchbar(props.screen,props.account_type)}
          </div>
          <div className='d-flex align-items-center my-1 justify-content-between col-12 col-lg-6 '>
                <IconButton
                    edge="start"
                    size='small'
                    color='inherit'
                    onClick={props.handleDrawerToggle}
                    className={props.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <div className='pc' />
                <div className='my-1 flg'>
                    <Brand color='dark'/>
                </div>
          </div>
        </div>
)
}

export default Navbar