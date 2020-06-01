import React from 'react'
import {Link} from 'react-router-dom'

export default (props)=>{
    return (<Link to='/' className={(props.color === 'dark')?'text-decoration-none text-dark':'text-decoration-none text-white'}>
                <span><b className='text-10'>S</b>ales</span>
                <span><b className='text-10'>I</b>con</span>
            </Link>)
}