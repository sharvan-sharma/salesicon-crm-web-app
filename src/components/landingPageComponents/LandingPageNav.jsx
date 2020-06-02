import React from 'react';
import Brand  from '../utilComponents/Brand'
import NavLinkList from './nav/NavLinkList'
import NavAuthlinks from './nav/NavAuthlinks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Fade from '@material-ui/core/Fade'

export default function LandingPageNav(){
    return (
      <Fade in={true}  timeout={{appear:1000,exit:1000,enter:1000}}>
        <nav className="navbar navbar-expand-lg p-lg-4 p-md-4">
            <div className='fxl'>
                <Brand color='dark'/>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <FontAwesomeIcon icon={faBars} />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <NavLinkList/>
                <NavAuthlinks/>
            </div>
        </nav>
    </Fade>)
}