import React from 'react';
import Brand from '../utilComponents/Brand'
import Stepper from './SignupComponent/Stepper'
import Fade from '@material-ui/core/Fade'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function Signup(props){
return (    <Fade in={true} >
                <>
                    <label className='fmd py-3 px-4'>
                       <Link to='/' className='text-decoration-none text-dark' >
                           <FontAwesomeIcon icon={faChevronLeft}/>
                        </Link> 
                        <span> Don't have an Account ? Register
                        </span>
                    </label>
                    <Stepper/>
                    <div className='mt-5 mb-2 d-flex justify-content-center'>
                        Already have an Account?<Link to='/login' className='text-decoration-none'>Signin here</Link>
                    </div>
                </>
            </Fade>)
}

export default Signup