import React,{useState,useRef} from 'react'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Cancel'
import Fade from '@material-ui/core/Fade'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import {connect} from 'react-redux'
import {addLeadInteraction} from '../../../../redux/leadInteractions/leadInteractions.actions'
import CircularProgress  from '../../../utilComponents/CircularProgress'
import Alert from '@material-ui/lab/Alert'

function CreateLeadInteraction(props){

    const [err,seterr] = useState({exist:false,msg:''})
    const remark = useRef('')
    const [response,setresponse] = useState({score:-1,response_type:null})
    const [remarks,setremarks] = useState({val:'',rem:200})
    const [progress,setprogress] = useState(false)

    const handleRemarkChange = ()=>{
        if(remark.current.value.length < 200){
            setremarks({val:remark.current.value,rem:200-remark.current.value.length})
        }else{
            setremarks({val:remarks.val,rem:0})
        }
    }


    const submitForm = (e)=>{
        e.preventDefault() 
        if(response.response_type === null ){
            seterr({exist:true,msg:'Please select a Response Type'})
        }else if(response.score === -1){
            seterr({exist:true,msg:'Please select a Score'})
        }else{
            setprogress(true)
            const data = {
                score:response.score,
                response_type:response.response_type,
                customer_id:props.lead_id,
                remarks:remarks.val,
                datetime:new Date()
            }
            axios.post('/staffapi/leadinteraction/create',data,{withCredentials:true})
            .then(result=>{
                setprogress(false)
                console.log(result.data)
                switch(result.data.status){
                    case 423:seterr({exist:true,msg:`Validation error ${result.data.type}`});break
                    case 200:props.addLeadInteraction(result.data.lead_interaction);props.setAdd(false);break;
                    case 401:seterr({exist:true,msg:'Server error'});break;
                    case 500:seterr({exist:true,msg:'Server error'});break;
                    default :console.log('default exec create interaction')
                }
            })
            .catch(err=>{
                setprogress(false)
                seterr({exist:true,msg:'Server error'})
            })
        }
    }

    return(
                <Fade in ={true} >
                    <form onSubmit={submitForm} className='col-12 p-2 my-2 shadow-lg rounded'>
                        <div className='d-flex justify-content-between flex-wrap'>
                            <div className='d-flex'>
                                <div className="fsm btn-group mr-2">
                                    {(response.response_type === null)?
                                        <button type="button" className="btn btn-dark">
                                            Response
                                        </button>:
                                        <>{(response.response_type === 'positive')?
                                            <button type="button" className="btn btn-success">
                                                Positive
                                            </button>:
                                            <button type="button" className="btn btn-danger">
                                                Negative
                                            </button>
                                            }
                                        </>
                                    }
                                    <button type="button" className="btn btn-dark dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="sr-only">Toggle Dropdown</span>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <button className="dropdown-item text-success"
                                            onClick={()=>setresponse({...response,response_type:'positive'})} 
                                            onFocus={()=>seterr({exist:false,msg:''})} type="button">
                                            Positive
                                        </button>
                                        <button className="dropdown-item text-danger"
                                            onClick={()=>setresponse({...response,response_type:'negative'})} 
                                            onFocus={()=>seterr({exist:false,msg:''})} type="button">
                                            Negative
                                        </button>
                                    </div>
                                </div>
                                <div className="fsm btn-group">
                                    <button type="button" className="btn btn-dark">
                                        {(response.score === -1)?'Score':response.score}
                                    </button>
                                    <button type="button" className="btn btn-dark dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="sr-only">Toggle Dropdown</span>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        {
                                        [1,2,3,4,5,6,7,8,9,10].map(v=><button key={v} 
                                                                        onFocus={()=>seterr({exist:false,msg:''})}
                                                                        onClick={()=>setresponse({...response,score:v})} 
                                                                        className="dropdown-item text-1" type="button">
                                                                            {v}
                                                                        </button>)   
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex'>
                                    <div>
                                        {(progress)?<CircularProgress/>:
                                        <IconButton type='submit' disabled={progress} color='inherit' size='small' ><AddIcon/></IconButton>}
                                    </div>
                                    <div>
                                        <IconButton type='button' disabled={progress} color='inherit' size='small' onClick={()=>props.setAdd(false)}><CancelIcon/></IconButton>
                                    </div>
                            </div>
                        </div>
                        <label className='my-2'>Remaining Characters {remarks.rem}/200</label>
                        <div className='d-flex col-12 p-0 my-2'>
                             <TextField
                                id="desc"
                                label="Remark"
                                inputRef={remark}
                                multiline
                                rows={2}
                                placeholder="Add A Remark"
                                variant="outlined"
                                fullWidth
                                required
                                value={remarks.val}
                                onFocus={()=>seterr({exist:false,msg:''})}
                                onChange={handleRemarkChange}
                            />
                        </div>
                        {(err.exist)?<Alert severity='error' variant='filled'>{err.msg}</Alert>:<></>}
                    </form>
                    </Fade>
)

}

const mapDispatchToProps = dispatch=>({
addLeadInteraction:lead_interaction=>dispatch(addLeadInteraction(lead_interaction))
})

export default connect(null,mapDispatchToProps)(CreateLeadInteraction)
