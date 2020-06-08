import React,{useState,useRef} from 'react'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import {connect} from 'react-redux'
import {addCampaign,editCampaign} from '../../../../redux/campaigns/campaigns.actions'
import Fade from '@material-ui/core/Fade'
import axios from 'axios'
import CircularProgress from '../../../utilComponents/CircularProgress'

function CampaignEditor(props){

    const name = useRef()
    const description = useRef()


    const [progress,setprogress]=useState({on:false,button:null})
    const [data,setdata] = useState({
        name:{val:props.name,rem:50-props.name.length},
        description:{val:props.description,rem:500-props.description.length}
    })
 
    const [err,seterr] = useState({exist:false,msg:''})

    const handleDescriptionChange = ()=>{
        let desc = description.current.value
        if(desc.length <= 500){
            setdata({...data,description:{val:desc,rem:500-desc.length}})
        }else{
            setdata({...data,description:{val:data.description.val,rem:0}})
        }
    }

    const handleNameChange = ()=>{
        let n = name.current.value
        if(n.length <= 50){
            setdata({...data,name:{val:n,rem:50-n.length}})
        }else{
            setdata({...data,name:{val:data.name.val,rem:0}})
        }
    }

    const url = (props.mode === 'edit')?'/staffapi/campaign/edit':'/staffapi/campaign/create'

    const dataObject = ()=>{ if(props.mode === 'edit'){
                             
                                return ({campaign_name:name.current.value,
                                        description:description.current.value,
                                        campaign_id:props.campaign_id})
                            }else{
                                 return ({campaign_name:name.current.value,
                                        description:description.current.value})
                            }
                        }

    const submitForm = (e)=>{
        setprogress({on:true,button:'submit'})
        e.preventDefault()
          axios.post(url,dataObject(),{withCredentials:true})
                    .then(result=>{
                        setprogress({on:false,button:null})
                        switch(result.data.status){
                            case 200: {
                                (props.mode === 'edit')?props.editCampaign(result.data.campaign):props.addCampaign(result.data.campaign);
                                props.openEditor({open:false,mode:null,id:null})
                                break;}
                            case 500: seterr({exist:true,msg:'something went wrong while creating camapign,Try Again'});break;
                            case 401: seterr({exist:true,msg:'Not Authorize to create Campaign'});break;
                            case 422: seterr({exist:true,msg:'Cannot Perform Edit on camapign that doesnot exist'});break;
                            case 423: seterr({exist:true,msg:`Validation Error : type:${result.data.type}`});break;
                            default: console.log('default exec');
                        }
                    })
                    .catch(err=>{
                        setprogress({on:false,button:null})
                        seterr({exist:true,msg:'something went wrong while creating camapign,Try Again'})
                    })
    }

    return (
        <Fade in={true} timeout={{enter:500,appear:500,exit:500}}>
        <div className='shield d-flex justify-content-center align-items-center'>
            <form onSubmit={submitForm} className='col-12 col-md-8 col-lg-6 col-xl-6 bg-white rounded py-4 d-flex flex-column justify-content-between' 
                style={{minHeight:'70vh'}}>
                <div>
                    <label className='ff-mst text-1'>{(props.mode === 'edit')?'Edit Campaign':'Create New Campaign'}</label>
                    <div className='form-group'>
                        <TextField
                            id="name"
                            label="Campaign Name"
                            rows={4}
                            inputProps={{minLength:3}}
                            placeholder="Enter a Campaign Name"
                            variant="outlined"
                            value={data.name.val}
                            onChange={handleNameChange}
                            inputRef={name}
                            onFocus={()=>seterr({exist:false,msg:''})}
                            fullWidth
                            required
                            /> 
                    </div>
                    <label className='text-muted fsm mt-2 mb-1'>Remaining character {data.description.rem}/500</label>
                    <div className='form-group'>
                         <TextField
                            id="desc"
                            onFocus={()=>seterr({exist:false,msg:''})}
                            inputRef={description}
                            label="Description"
                            multiline
                            rows={4}
                            placeholder="Write something about Campaign"
                            variant="outlined"
                            value={data.description.val}
                            onChange={handleDescriptionChange}
                            fullWidth
                            required
                            /> 
                    </div>
                    {(err.exist)?<Fade in={err.exist}><Alert severity='error' variant='filled'>{err.msg}</Alert></Fade>:<></>}
                </div>
                <div className='d-flex justify-content-between'>
                    <div>
                        <button type='button'  className='btn btn-outline-danger'
                         onClick={()=>setdata({
                                                name:{val:props.name,rem:50-props.name.length},
                                                description:{val:props.description,rem:500-props.description.length}
                                            })
                                }
                        disabled={progress.on}
                        >Reset</button>
                    </div>
                    <div className='d-flex'>
                        <button type='button' disabled={progress.on} className='btn btn-outline-3 mr-2' onClick={()=>props.openEditor({open:false,mode:null,id:null})}>Cancel</button>
                        {(progress.on && progress.button === 'submit')?
                        <CircularProgress/>:
                        <button type='submit' disabled={progress.on} className='btn btn-3'>{(props.mode === 'edit')?'Update':'Add'}</button>
                         }
                    </div>
                </div>
            </form>
          </div>
        </Fade>
    )
}

const mapDispatchToProps = dispatch=>({
    addCampaign:campaign=>dispatch(addCampaign(campaign)),
    editCampaign:campaign=>dispatch(editCampaign(campaign))
})

export default connect(null,mapDispatchToProps)(CampaignEditor)