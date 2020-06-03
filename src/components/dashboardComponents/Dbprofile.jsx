import React from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'


function DBProfile(props){
return (<>
        
        <div className='p-3'>
            <div className='d-flex align-items-center'>
                <img src='/logo192.png' className='img-fluid mr-2' style={{width:'30px',height:'30px'}} /> 
                <ul className='list-unstyled m-0'>
                    <li className='ff-mst fsm'>{props.user.name.firstname} {props.user.name.lastname}</li>
                </ul>
            </div>
            <ul className='list-unstyled my-1'>
                    <li className='ff-mst fsm text-white-50'>{props.user.email}</li>
                    <li><Link to='/profile' onClick={()=>{props.setactive(-1)}} className='fsm ff-mst text-decoration-none'>View Profile</Link></li>
            </ul>
        </div>
        </>)
}

const mapStatetoProps = state=>({
    user:state.user
})

export default connect(mapStatetoProps)(DBProfile)