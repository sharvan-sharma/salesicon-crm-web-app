import React,{useState} from 'react'
import Fileupload from '../../../utilComponents/FileUpload'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import Fade from '@material-ui/core/Fade'
import MessageSnackbar from '../../../utilComponents/MessageSnackbar'
import CircularProgress from '../../../utilComponents/CircularProgress'
import UploadComponent from '../../../utilComponents/UploadComponent'

function SingleStaff(){

    return (
        <>
        <div className='mbl' style={{marginTop:'10vh'}} />
        <div className='my-2'>
            Send Registeration link to <span className='text-1' >Multiple</span> Email Accounts
        </div>
        <div className='hr-3'/>
        <div className='col-12 p-0 my-2'>
            <div className='flg ff-mst my-2 d-flex justify-content-between align-items-center flex-wrap'>
                <label className='m-1'>Upload Staff Emails <span className='text-1'>(.xls)</span> File</label>
                <button className='btn btn-outline-3 fsm' >Download template (.xls) File</button>
            </div>
            <UploadComponent fileType='xls' maxSize={50000} url='/adminapi/send/registerlink/multiple'/>
        </div>
        </>
    )
}

export default SingleStaff