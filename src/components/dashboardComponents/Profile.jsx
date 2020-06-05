import React,{useEffect,useState} from 'react'
import IconButton from '@material-ui/core/IconButton'
import BackIcon from '@material-ui/icons/ArrowBack'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckIcon from '@material-ui/icons/Check'
import ProfileImage  from './profile/ProfileImage'
import {connect} from 'react-redux'

function Profile(props){

    const [mode,setmode] = useState('unedit')
        

    return (<>
            <div className='d-flex flex-wrap'>
                <ProfileImage />
                <div className='col-12 col-md-8 p-0 col-lg-9'>
                    <div className='col-12 my-2 px-4 py-2 shadow'>
                        <div className='text-dark fmd'>Name</div>
                        <div className='d-flex my-2 flex-wrap align-items-center justify-content-between'>
                            
                            {(mode !== 'edit')?
                            <>
                            <div className='text-1 ff-mst'>{props.user.name.firstname} {props.user.name.middlename} {props.user.name.lastname}</div>
                            <IconButton size='small' onClick={()=>setmode('edit')}>
                                <EditIcon/>
                            </IconButton>
                            </>:
                            <>
                            <div className='col-12 p-0 col-lg-3'>
                                <input required type='text' defaultValue={props.user.name.firstname} className='form-control m-1'/>
                            </div>
                            <div className='col-12 p-0 col-lg-3'>
                                 <input required type='text' placeholder='middle name' defaultValue={props.user.name.middlename} className='form-control m-1'/>
                            </div>
                            <div className='col-12 p-0 col-lg-3'>
                                <input required type='text' defaultValue={props.user.name.lastname} className='form-control m-1'/>
                            </div>
                            <div>
                                <IconButton size='small' onClick={()=>setmode('unedit')}>
                                    <CheckIcon/>
                                </IconButton>
                                <IconButton size='small' onClick={()=>setmode('unedit')}>
                                    <CancelIcon />
                                </IconButton>
                            </div>
                            
                              </>  }
                        </div>
                    </div>
                    <div className='hr-3' />
                     <div className='col-12 my-2  px-4 py-2 shadow'>
                        <div className='text-dark fmd'>Email</div>
                        <div className='d-flex my-2 align-items-center justify-content-between'>
                            <div className='text-1 ff-mst'>{props.user.email}</div>
                        </div>
                    </div>
                    <div className='hr-3' />
                     <div className='col-12 my-2  px-4 py-2 shadow' >
                        <div className='text-dark fmd'>Phone Number</div>
                        <div className='d-flex my-2 align-items-center justify-content-between'>
                            <div className='text-1 ff-mst'>{props.user.phone}</div>
                        </div>
                    </div>
                    <div className='hr-3' />
                </div>
            </div>
        </>)
}

const mapStateToProps = state=>({
    user:state.user
})

export default connect(mapStateToProps)(Profile)