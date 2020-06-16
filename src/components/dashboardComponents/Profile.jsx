import React from 'react'
import ProfileImage  from './profile/ProfileImage'
import {connect} from 'react-redux'
import ProfilePhone from './profile/ProfilePhone'
import ProfileName from './profile/ProfileName'
import ProfileType  from './profile/ProfileType'

function Profile(props){
    return (<>
            <div className='d-flex flex-wrap'>
                <ProfileImage />
                <div className='col-12 col-md-8 p-0 col-lg-9 shadow'>
                    <div className='col-12 my-2'>
                        <ProfileType/>
                    </div>
                    <ProfileName />
                     <div className='col-12 my-2  px-4 py-2 '>
                        <div className='text-dark fmd'>Email</div>
                        <div className='d-flex my-2 align-items-center justify-content-between'>
                            <div className='text-1 ff-mst'>{props.user.email}</div>
                        </div>
                    </div>
                     <ProfilePhone />
                </div>
            </div>
        </>)
}

const mapStateToProps = state=>({
    user:state.user
})

export default connect(mapStateToProps)(Profile)