import React from 'react'
import {Link,Route,Switch} from 'react-router-dom'
import SingleStaff from './addstaff/SingleStaff'
import MultipleStaff from './addstaff/MultipleStaff'

const TabScreen = (props)=>{
    switch(props.screen){
        case 0:return <SingleStaff/>
        case 1:return <MultipleStaff/>
        default: return <SingleStaff/>
    }
}


function AddStaff(props){

        let activeClass = 'btn btn-3 mr-2 fsm'
        let inActiveClass = 'btn btn-outline-3 mr-2 fsm'
 
        return (<>
                    <div  className='d-flex align-items-center py-4'>
                        <Link to='/addstaff' className={(props.screen === 0)?'btn btn-3 mr-3':'btn btn-outline-3 mr-3'} >Single</Link>
                        <Link to='/addstaff/multiple' className={(props.screen === 1)?'btn btn-3':'btn btn-outline-3'} >Multiple</Link>
                    </div>
                    <div className='hr-3'/>
                    <TabScreen screen={props.screen} />
                </>)
}

const AddStaffRouter=(props)=>{
    return (
        <Switch>
                <Route exact path = '/addstaff' component={()=><AddStaff screen={0}/>} />
                <Route exact path = '/addstaff/multiple' component={()=><AddStaff screen={1}/>} />
        </Switch>
    )
}


export default AddStaffRouter