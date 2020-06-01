import React from 'react'
import Login from '../components/authenticateComponents/Login'
import Signup from '../components/authenticateComponents/Signup'
import ForgotPassword from '../components/authenticateComponents/ForgotPassword'
import Copyright from '../components/utilComponents/Copyright'
import Page404 from './Page404'
import Brand from '../components/utilComponents/Brand'
import PasswordChangeComponent from '../components/authenticateComponents/PasswordChangeComponent'

const componentGenerator = (props)=>{
    switch(props.page){
        case 1 : return <Login />
        case 2 : return <Signup/>
        case 3 : return <ForgotPassword/>
        case 4 : return <PasswordChangeComponent email={props.email}/>
        default : return  <Page404/>
    }
}

function Authenticate(props){
    return (<>
                <div className='col-md-6 col-lg-8 col-xl-8 py-4 rounded bg-3 shadow-lg auth-r' >

                </div>
                <div className='bg-3 full-screen d-flex justify-content-end'>
                        <div className='col-12 col-md-6 col-lg-4 col-xl-4 p4 rounded bg-white shadow-lg d-flex flex-column justify-content-around' >
                            <div className='h4 d-flex justify-content-center align-items-center' style={{height:'20vh'}}>
                                <Brand color='dark' />
                            </div>
                            {componentGenerator(props)}
                            <div className='d-flex justify-content-between mt-2 border-dark border-top py-4'>
                                <Copyright/>
                            </div>
                        </div>
                </div>
        </>
        )
}

export default Authenticate