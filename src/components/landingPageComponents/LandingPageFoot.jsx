import React from 'react'
import Copyright from '../utilComponents/Copyright'
import Fade from '@material-ui/core/Fade'

export default function LandingPageFoot(){
    return (
        <Fade in={true}  timeout={{appear:1000,exit:1000,enter:1000}}>
            <div className='p-lg-3 p-md-3'>
                <div className='d-flex justify-content-between'>
                    <Copyright/>
                </div>
            </div>
        </Fade>)
}