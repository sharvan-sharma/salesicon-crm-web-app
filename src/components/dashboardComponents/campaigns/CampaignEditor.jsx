import React from 'react'
import TextField from '@material-ui/core/TextField'

function NewCampaign(props){
    return (
        <div className='shield d-flex justify-content-center align-items-center'>
            <div className='col-12 col-md-8 col-lg-6 col-xl-6 bg-white rounded py-4 d-flex flex-column justify-content-between' 
                style={{minHeight:'60vh'}}>
                <div>
                    <label className='ff-mst text-1'>{(props.mode === 'edit')?'Edit Campaign':'Create New Campaign'}</label>
                    <div className='form-group'>
                        <TextField
                            id="name"
                            label="Campaign Name"
                            rows={4}
                            placeholder="Enter a Campaign Name"
                            variant="outlined"
                            defaultValue={(props.mode === 'edit')?props.name:''}
                            fullWidth
                            required
                            /> 
                    </div>
                    <div className='form-group'>
                         <TextField
                            id="desc"
                            label="Description"
                            multiline
                            rows={4}
                            placeholder="Write something about Campaign"
                            variant="outlined"
                            defaultValue={(props.mode === 'edit')?props.description:''}
                            fullWidth
                            required
                            /> 
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-outline-3 mr-2' onClick={()=>props.openEditor({open:false,mode:null,id:null})}>Cancel</button>
                    <button className='btn btn-3'>{(props.mode === 'edit')?'Update':'Add'}</button>
                </div>
            </div>
        </div>
    )
}

export default NewCampaign