import React from 'react'
import LinearProgress from './LinearProgress'

export default function PreLoader(){
    return (
    <div className='full-screen-2 d-flex justify-content-center align-items-center bg-3'>
                <div className='col-12 col-md-4 col-lg-4 col-xl-3 d-flex flex-column align-items-center'>
                    <p className='text-center text-white fxl'>
                        <b className='text-10'>S</b>ales
                        <b className='text-10'>I</b>con
                    </p>
                    <LinearProgress />
                </div>
            </div>)
}