import React from 'react'
import LandingPageNav from '../components/landingPageComponents/LandingPageNav'
import Fade from '@material-ui/core/Fade'

export default function LandingPage(){
    return (
    <Fade in={true}>
        <div className='container-fluid'>
                <LandingPageNav/>
        </div>
    </Fade>
    )
}