import React from 'react'
import Brand from '../components/utilComponents/Brand'
import {Link} from 'react-router-dom'

export default function Page404(){
    return (
        <div className='col-12 d-flex flex-column justify-content-center align-items-center bg-gradient full-screen '>
            <div className='col-lg-8 col-md-10 col-12 d-flex justify-content-center align-items-center flex-wrap-reverse'>
                <div className='col-10 col-lg-6 col-md-6 d-flex flex-column'>
                    <p className='fxl text-7 ff-mst mb-0'>
                        Dead End ?
                    </p>
                    <p className='flg text-white mt-0' >Look Like You're Lost</p>
                    <p className='fsm text-white-50 '>
                            The Page You're Looking for doesn't Exist.
                    </p>
                    <div>
                        <Link to='/' className='btn btn-light ff-mst rounded-pill fsm text-decoration-none text-dark'>
                            Let's Back to <b>S</b>ales<b>I</b>con
                        </Link>
                    </div>
                </div>
                <div className='col-10 col-lg-6 col-md-6 d-flex flex-column justify-content-center align-items-center'>
                    <img src='/404.jpg' className='img-fluid rounded'/>
                </div>
            </div>
        </div>
    )
}