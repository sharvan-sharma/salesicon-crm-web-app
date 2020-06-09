import React from 'react'
import {Link,Route,Switch} from 'react-router-dom'
import StaffTable from './staffs/StaffTable'
import SingleStaff from './staffs/SingleStaff'
import MultipleStaff from './staffs/MultipleStaff'

const TabScreen = (props)=>{
    switch(props.screen){
        case 0:return <StaffTable/>
        case 1:return <SingleStaff/>
        case 2:return <MultipleStaff/>
        default: return <StaffTable/>
    }
}


function Staff(props){

        let activeClass = 'btn btn-3 mr-2 fsm'
        let inActiveClass = 'btn btn-outline-3 mr-2 fsm'
 
        return (<>
            <div  className='d-flex align-items-center py-4'>
                <Link to='/staff' className={(props.screen === 0)?'btn btn-3 mr-2 fsm':'btn btn-outline-3 mr-2 fsm'} >Staff Members</Link>
                <div className="nav-item dropdown ">
                    <a className={
                        (props.screen === 0)?
                        "text-decoration-none dropdown-toggle btn btn-outline-3 fsm"
                        :"text-decoration-none dropdown-toggle btn btn-3 fsm"  
                    }
                    href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                     Send Regsitration Link
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link to='/staff/single' className={(props.screen === 1)?'dropdown-item bg-3':'dropdown-item'} >Single</Link>
                        <Link to='/staff/multiple' className={(props.screen === 2)?'dropdown-item bg-3':'dropdown-item'} >Multiple</Link>
                    </div>
                </div>
            </div>
            <div className='hr-3'/>
            <TabScreen screen={props.screen} />
        </>)
}

const StaffRouter=(props)=>{
    return (
        <Switch>
                <Route exact path = '/staff' component={()=><Staff screen={0}/>}/>
                <Route exact path = '/staff/single' component={()=><Staff screen={1}/>} />
                <Route exact path = '/staff/multiple' component={()=><Staff screen={2}/>} />
        </Switch>
    )
}


export default StaffRouter