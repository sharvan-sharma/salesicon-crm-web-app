import React from 'react'
import {connect} from 'react-redux'

function ProfileType (props){

    let adminClass= 'rounded-pill px-3 py-2 ff-mst fsm m-0 bg-black text-white'
    let staffClass= 'rounded-pill px-3 py-2 ff-mst fsm m-0 bg-1 text-white'

    return (
        <label className={(props.account_type === 'admin')?adminClass:staffClass}>
            {(props.account_type === 'admin')?'Admin Account':'Staff Account'}
        </label>
    )

}

const mapStateToProps = state=>({
    account_type:state.user.account_type
})

export default connect(mapStateToProps)(ProfileType)