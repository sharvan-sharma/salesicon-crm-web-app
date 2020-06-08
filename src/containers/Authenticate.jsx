import React from 'react'
import Login from '../components/authenticateComponents/Login'
import Signup from '../components/authenticateComponents/Signup'
import ForgotPassword from '../components/authenticateComponents/ForgotPassword'
import Copyright from '../components/utilComponents/Copyright'
import Page404 from './Page404'
import Brand from '../components/utilComponents/Brand'
import PasswordChangeComponent from '../components/authenticateComponents/PasswordChangeComponent'
import Grow from '@material-ui/core/Grow'
import Fade from '@material-ui/core/Fade'
import {Switch,Route} from 'react-router-dom'

const TabScreens = (props)=>{
    switch(props.page){
        case 1 : return <Login type={props.type} />
        case 2 : return <Signup type={props.type} token={props.token} />
        case 3 : return <ForgotPassword type={props.type} />
        case 4 : return <PasswordChangeComponent email={props.email} type={props.type}/>
        default : return  <Page404/>
    }
}

function Authenticate(props){
    return (<>
                <div className='pc col-md-6 col-lg-8 col-xl-8 p-4 rounded bg-gradient shadow-lg auth-r d-flex flex-column justify-content-center align-items-start' >
                     <Grow in={true} timeout={{appear:1000,exit:1000,enter:1000}}>
                        <div className='col-6'> 
                            <div className='display-3'>
                                <Brand color='light' />
                            </div>
                            <Grow in={true} timeout={{appear:3000,exit:1000,enter:2000}}>
                                <span className='ff-mst text-white fxl'>Platform For your Sales</span>
                            </Grow>
                            <Grow in={true} timeout={{appear:5000,exit:1000,enter:3000}}>
                                <p className='ff-ngt text-white my-2'>
                                    With all your sales communication in one place. <Brand color='light'/> help you boost
                                    your sales multifold.
                                </p>
                            </Grow>
                        </div>
                    </Grow>
                </div>
                <div className='bg-3 full-screen d-flex justify-content-end'>
                    <Fade in={true} timeout={{appear:1000,exit:1000,enter:1000}}>
                        <div className='col-12 col-md-6 col-lg-4 col-xl-4 p4 rounded bg-white shadow-lg d-flex flex-column justify-content-around' >
                           <Fade in={true} timeout={{appear:3000,exit:1000,enter:3000}}>
                            <div className='h4 d-flex justify-content-center align-items-center' style={{height:'20vh'}}>
                                <Brand color='dark' />
                            </div>
                            </Fade>
                            <TabScreens page={props.page} type={props.type} token={props.token || ''} />
                            <Fade in={true} timeout={{appear:3000,exit:1000,enter:3000}}>
                                <div className='d-flex justify-content-between mt-2 border-dark border-top py-4'>
                                    <Copyright/>
                                </div>
                            </Fade>
                        </div>
                    </Fade>
                </div>
        </>
        )
}




export default Authenticate