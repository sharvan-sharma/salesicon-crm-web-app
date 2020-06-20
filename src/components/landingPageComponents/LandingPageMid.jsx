import React from 'react'
import Zoom from '@material-ui/core/Fade'
import {Link} from 'react-router-dom'


export default function LandingPageMid(){

    return (<>
        <div className='px-lg-4 px-md-4 '>
            <div className='bg-gradient col-12 rounded-lg d-flex justify-content-center align-items-center' style={{minHeight:'75vh'}}> 
                <Zoom in={true} timeout={{appear:1000,exit:1000,enter:1000}}>
                    <div className='col-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center align-items-center'>
                        <span className='ff-mst fxl text-white text-center'>Sell, Market and Grow</span>
                        <Zoom in={true} timeout={{appear:3000,exit:1000,enter:2000}}>
                            <p className='ff-mst text-white text-center my-2'>Take control of your bussiness. Let your software work for you 
                                <span className='text-10 ml-2'>tailored to your industry and stage.</span>
                            </p>
                        </Zoom>
                        <Zoom in={true} timeout={{appear:5000,exit:1000,enter:3000}}>
                            <Link to='/login/admin' className='btn btn-warning text-white ff-mst my-2'>GET STARTED NOW</Link>
                        </Zoom>
                    </div>
                </Zoom>
            </div>
        </div>
        </>
    )

}
