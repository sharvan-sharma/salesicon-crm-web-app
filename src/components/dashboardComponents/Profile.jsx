import React,{useEffect,useState} from 'react'
import IconButton from '@material-ui/core/IconButton'
import BackIcon from '@material-ui/icons/ArrowBack'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckIcon from '@material-ui/icons/Check'

let profile= {
    name:{firstname:'Sharvan',middlename:'',lastname:'Sharma'},
    email:'sharvansharma518@gmail.com',
    phone:'8437898665'
}


function Profile(props){
    useEffect(() =>  props.setactive(), [])

    const [mode,setmode] = useState('unedit')

    return (<>
            <div className='d-flex flex-wrap'>
                <div className='col-12 col-md-3 col-lg-3 flex-column d-flex align-items-center'>
                    <img style={{width:'200px'}} src='/logo192.png' />
                    <button className='fsm btn btn-light my-2 shadow rounded ff-mst'>Change</button>
                </div>
                <div className='col-12 col-md-9 col-lg-9'>
                    <div className='col-12 my-2 px-4 py-2 shadow'>
                        <div className='text-dark fmd'>Name</div>
                        <div className='d-flex my-2 flex-wrap align-items-center justify-content-between'>
                            
                            {(mode !== 'edit')?
                            <>
                            <div className='text-1 ff-mst'>{profile.name.firstname} {profile.name.middlename} {profile.name.lastname}</div>
                            <IconButton size='small' onClick={()=>setmode('edit')}>
                                <EditIcon/>
                            </IconButton>
                            </>:
                            <>
                            <input required type='text' defaultValue={profile.name.firstname} className='form-control m-1'/>
                            <input required type='text' defaultValue={profile.name.middlename} className='form-control m-1'/>
                            <input required type='text' defaultValue={profile.name.lastname} className='form-control m-1'/>
                            <IconButton size='small' onClick={()=>setmode('unedit')}>
                                <CheckIcon/>
                            </IconButton>
                            <IconButton size='small' onClick={()=>setmode('unedit')}>
                                <CancelIcon />
                            </IconButton>
                              </>  }
                        </div>
                    </div>
                    <div className='hr-3' />
                     <div className='col-12 my-2  px-4 py-2 shadow'>
                        <div className='text-dark fmd'>Email</div>
                        <div className='d-flex my-2 align-items-center justify-content-between'>
                            <div className='text-1 ff-mst'>{profile.email}</div>
                            <IconButton size='small'>
                                <EditIcon/>
                            </IconButton>
                        </div>
                    </div>
                    <div className='hr-3' />
                     <div className='col-12 my-2  px-4 py-2 shadow' >
                        <div className='text-dark fmd'>Phone Number</div>
                        <div className='d-flex my-2 align-items-center justify-content-between'>
                            <div className='text-1 ff-mst'>{profile.phone}</div>
                            <IconButton size='small'>
                                    <EditIcon/>
                            </IconButton>
                        </div>
                    </div>
                    <div className='hr-3' />
                </div>
            </div>
        </>)
}

export default Profile