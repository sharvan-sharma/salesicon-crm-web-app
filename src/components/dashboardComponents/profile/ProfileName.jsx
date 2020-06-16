import React,{useState,useRef} from 'react'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckIcon from '@material-ui/icons/Check'
import Alert from '@material-ui/lab/Alert'
import {checkName} from '../../../utils/validations/index'
import axios from 'axios'
import {connect} from 'react-redux'
import {setUserName} from '../../../redux/user/user.actions'


function ProfileName(props){

    const fname = useRef(props.name.firstname)
    const mname = useRef(props.name.middlename)
    const lname = useRef(props.name.lastname)

     const [state,setstate] = useState({
         mode:'unedit',
         error:{exist:false,msg:''}
     })

     const submitForm  = (e)=>{
        e.preventDefault()
        const name = {
            firstname:fname.current.value,
            middlename:mname.current.value,
            lastname:lname.current.value
        }
        if(checkName(name)){
            axios.post('/editprofile',{
                type:'name',
                name
            },{withCredentials:true})
            .then(result=>{
                switch(result.data.status){
                    case 200:props.setUserName(result.data.name);setstate({...state,mode:'unedit'});break;
                    case 401:setstate({...state,error:{exist:true,msg:'Unauthorised to update name'}});break;
                    case 423:setstate({...state,error:{exist:true,msg:`Validation Error : ${result.data.type}`}});break;
                    case 500:setstate({...state,error:{exist:true,msg:'Something Went Wrong At Our End'}});break;
                    default :console.log('default exec profile name')
                }
            })
            .catch(err=>{
                setstate({...state,error:{exist:true,msg:'Something Went Wrong At Our End'}})
            })
        }else{
            setstate({...state,error:{exist:true,msg:'Firstname, MiddleName and LastName atmost contain 20 character each.'}})
        }
     }

    return (
            <div className='col-12 my-2 px-4 py-2 '>
                <div className='text-dark fmd'>Name</div>
                <form onSubmit={submitForm}>
                    <div className='d-flex my-2 flex-wrap align-items-center justify-content-between'>
                        {(state.mode !== 'edit')?
                            <>
                            <div className='text-1 ff-mst'>{props.name.firstname} {props.name.middlename} {props.name.lastname}</div>
                            <IconButton size='small' onClick={()=>setstate({...state,mode:'edit'})}>
                                <EditIcon/>
                            </IconButton>
                            </>:
                            <>
                            <div className='col-12 p-0 col-lg-3'>
                                <input required type='text' onFocus={()=>setstate({...state,error:{exist:false,msg:''}})} ref={fname} defaultValue={props.name.firstname} className='form-control m-1'/>
                            </div>
                            <div className='col-12 p-0 col-lg-3'>
                                 <input  type='text' ref={mname} onFocus={()=>setstate({...state,error:{exist:false,msg:''}})} placeholder='middle name' defaultValue={props.name.middlename} className='form-control m-1'/>
                            </div>
                            <div className='col-12 p-0 col-lg-3'>
                                <input  type='text' ref={lname} onFocus={()=>setstate({...state,error:{exist:false,msg:''}})} defaultValue={props.name.lastname} className='form-control m-1'/>
                            </div>
                            <div>
                                <IconButton 
                                size='small' 
                                type='submit'
                                onFocus={()=>setstate({...state,error:{exist:false,msg:''}})} >
                                    <CheckIcon/>
                                </IconButton>
                                <IconButton 
                                size='small' 
                                onFocus={()=>setstate({...state,error:{exist:false,msg:''}})} 
                                onClick={()=>setstate({...state,mode:'unedit'})}>
                                    <CancelIcon />
                                </IconButton>
                            </div>
                            
                              </>  }
                        </div>
                        {
                            (state.error.exist)?
                            <div className='my-2'>
                                    <Alert severity='error' variant='filled'>{state.error.msg}</Alert>
                            </div>:
                            <></>
                        }
                    </form>
                </div>
    )

}

const mapDispatchToProps = dispatch=>({
    setUserName:name=>dispatch(setUserName(name))
})

const mapStateToProps = state=>({
    name:state.user.name
})

export default connect(mapStateToProps,mapDispatchToProps)(ProfileName)