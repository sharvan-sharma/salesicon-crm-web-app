import React,{useState,useRef} from 'react'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import {connect} from 'react-redux'
import {addProduct,editProduct} from '../../../../redux/products/products.actions'
import Fade from '@material-ui/core/Fade'
import axios from 'axios'
import CircularProgress from '../../../utilComponents/CircularProgress'

function ProductEditor(props){

    const name = useRef()
    const description = useRef()

    const initialName = (props.mode === 'edit')?props.name:''
    const initialDescription = (props.mode === 'edit')?props.description:''

    const [progress,setprogress]=useState({on:false,button:null})
    const [data,setdata] = useState({
        name:{val:initialName,rem:50-initialName.length},
        description:{val:initialDescription,rem:500-initialDescription.length}
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

    const url = (props.mode === 'edit')?'/adminapi/product/update':'/adminapi/product/create'

    const dataObject = ()=>{ if(props.mode === 'edit'){
                                return ({product_name:name.current.value,
                                        description:description.current.value,
                                        product_id:props.product_id})
                            }else{
                                 return ({product_name:name.current.value,
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
                                (props.mode === 'edit')?props.editProduct(result.data.product):props.addProduct(result.data.product);
                                props.closeEditor()
                                break;}
                            case 500: seterr({exist:true,msg:'something went wrong while creating product,Try Again'});break;
                            case 401: seterr({exist:true,msg:'Not Authorize to create Product'});break;
                            case 422: seterr({exist:true,msg:'Cannot Perform Edit on product that doesnot exist'});break;
                            case 423: seterr({exist:true,msg:`Validation Error : type:${result.data.type}`});break;
                            default: console.log('default exec');
                        }
                    })
                    .catch(err=>{
                        setprogress({on:false,button:null})
                        seterr({exist:true,msg:'something went wrong while creating product,Try Again'})
                    })
    }

    return (
        <Fade in={true} timeout={{enter:500,appear:500,exit:500}}>
        <div className='shield d-flex justify-content-center align-items-center'>
            <form onSubmit={submitForm} className='col-12 col-md-8 col-lg-6 col-xl-6 bg-white rounded py-4 d-flex flex-column justify-content-between' 
                style={{minHeight:'70vh'}}>
                <div>
                    <label className='ff-mst text-1'>{(props.mode === 'edit')?'Edit Product':'Create New Product'}</label>
                    <div className='form-group'>
                        <TextField
                            id="name"
                            label="Product Name"
                            rows={4}
                            inputProps={{minLength:3}}
                            placeholder="Enter a Product Name"
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
                            placeholder="Write something about Product"
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
                                                name:{val:initialName,rem:50-initialName.length},
                                                description:{val:initialDescription,rem:500-initialDescription.length}
                                            })
                                }
                        disabled={progress.on}
                        >Reset</button>
                    </div>
                    <div className='d-flex'>
                        <button type='button' disabled={progress.on} className='btn btn-outline-3 mr-2' onClick={()=>props.closeEditor()}>Cancel</button>
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
    addProduct:product=>dispatch(addProduct(product)),
    editProduct:product=>dispatch(editProduct(product))
})

export default connect(null,mapDispatchToProps)(ProductEditor)