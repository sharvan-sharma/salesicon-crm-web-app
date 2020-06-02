import React from 'react'
import LandingPageNav from '../components/landingPageComponents/LandingPageNav'
import LandingPageMid from '../components/landingPageComponents/LandingPageMid'
import LandingPageFoot from '../components/landingPageComponents/LandingPageFoot'
import Fade from '@material-ui/core/Fade'

export default function LandingPage(){
    return (
    <Fade in={true}>
        <div className='container-fluid'>
                <LandingPageNav/>
                <LandingPageMid/>
                <LandingPageFoot/>
        </div>
    </Fade>
    )
}