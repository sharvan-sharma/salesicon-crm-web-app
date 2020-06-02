import React from 'react';
import Brand from '../utilComponents/Brand'
import Stepper from './SignupComponent/Stepper'
import Fade from '@material-ui/core/Fade'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function Signup(props){
return (    <Fade in={true} >
                <div className='px-4'>
                    <label className='my-3 ff-mst text-nowrap p-0 fmd col-12 d-flex justify-content-center'>
                            <Link to='/' className='mr-2 text-3 text-decoration-none ' >
                                <FontAwesomeIcon icon={faChevronLeft}/>
                            </Link> 
                            <span >
                                Don't Have an Account?
                            </span>
                    </label>
                    <Stepper/>
                    <div className='mt-5 mb-2 fsm text-nowrap ff-mst d-flex justify-content-center'>
                        <span>Already have an Account?<Link to='/login' className='text-decoration-none'>Signin here</Link></span>
                    </div>
                </div>
            </Fade>)
}

export default Signup