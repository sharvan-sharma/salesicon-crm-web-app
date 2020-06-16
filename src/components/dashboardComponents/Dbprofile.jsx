import React from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'


function DBProfile(props){
return (<>
        
        <div className='p-3'>
            <div className='d-flex align-items-center'>
                <img src={(props.user.photo === null)?'/avatar.jpg':props.user.photo} className='img-fluid mr-2' style={{width:'30px',height:'30px'}} /> 
                <ul className='list-unstyled m-0'>
                    <li className='ff-mst fsm'>
                        <Tooltip placement='bottom' arrow title={
                            props.user.name.firstname+
                            ((props.user.name.middlename.length === 0)?'':' '+props.user.name.middlename)
                            +' '+props.user.name.lastname
                        }>
                            <span>
                                {(props.user.name.firstname.length < 20)?props.user.name.firstname:props.user.name.firstname.substring(0,20)+'...'} 
                            </span>
                        </Tooltip>
                    </li>
                </ul>
            </div>
            <ul className='list-unstyled my-1'>
                    <li className='ff-mst fsm text-white-50'>{props.user.email}</li>
                    <li><Link to='/profile' className='fsm ff-mst text-decoration-none'>View Profile</Link></li>
            </ul>
        </div>
        </>)
}

const mapStatetoProps = state=>({
    user:state.user
})

export default connect(mapStatetoProps)(DBProfile)