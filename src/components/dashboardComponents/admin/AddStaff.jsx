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
            return (<>
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