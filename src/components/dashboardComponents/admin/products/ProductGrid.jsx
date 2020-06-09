import React,{useState} from 'react'
import { IconButton } from '@material-ui/core'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import Collapse from '@material-ui/core/Collapse'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import {deleteProduct} from '../../../../redux/products/products.actions'
import {connect} from 'react-redux'
import axios from 'axios'
import ProductEditor  from './ProductEditor'
import Status from '../../../utilComponents/Status'

const beautifyDate = (uglydate)=>{
    const date = new Date(uglydate)
    const year = date.getFullYear()
    const day = date.getDate()
    const month = date.getMonth()+1
    const hour = (date.getHours() < 10)?'0'+date.getHours():date.getHours()
    const minutes = (date.getMinutes() < 10)?'0'+date.getMinutes():date.getMinutes()

    return day+'/'+month+'/'+year+' '+hour+':'+minutes
}


function ProductGrid(props){

    const [state,setstate] = useState({
        expand:false,
        error:{exist:false,msg:''},
        progress:false,
        openEditor:false
    })

    const closeEditor = ()=>{
        setstate({...state,openEditor:false})
    }

    const deleteP = ()=>{
            setstate({...state,progress:true})
            axios.post('/adminapi/product/delete',{product_id:props.product._id},{withCredentials:true})
            .then(result=>{
                switch(result.data.status){
                    case 200:props.deleteProduct(props.product._id);setstate({...state,progress:false});break;
                    case 403:setstate({...state,progress:false,error:{exist:true,msg:'Unauthorised'}});break;
                    case 500:setstate({...state,progress:false,error:{exist:true,msg:'server error'}});break;
                    case 423:setstate({...state,progress:false,error:{exist:true,msg:'Invalid product_id'}});break;
                    default:console.log('product del admin def exec')
                }

            })
            .catch(err=>{
                setstate({...state,progress:false,error:{exist:true,msg:'server error'}})
            })
    }

    return (<div className='my-4'>
                    <div className='d-flex shadow p-2  rounded flex-wrap align-items-center justify-content-between'>
                        <div className='ff-mst bold '>
                            <IconButton size='small' onClick={()=>setstate({...state,expand:!state.expand})}>
                                {(!state.expand)?<ExpandMore/>:<ExpandLess/>}
                            </IconButton>
                            <label className='m-1'>{props.product.name}</label>
                        </div>
                        <div className='ff-mst bold '>{beautifyDate(props.product.createdAt)}</div>
                        <Status type='products' status={props.product.status} product_id={props.product._id} />
                        <div className='d-flex'>
                            <div className='mr-2'>
                                <IconButton size='small'  onClick={()=>setstate({...state,openEditor:true})}>
                                    <EditIcon/>
                                </IconButton>
                            </div>
                            <div className='text-1'>
                                <IconButton size='small' color='inherit' onClick={deleteP}>
                                    <DeleteIcon/>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    {(state.openEditor)?<ProductEditor
                                         mode='edit' 
                                         closeEditor={closeEditor}
                                         name={props.product.name} 
                                         description={props.product.description}
                                         product_id={props.product._id}
                                         />:<></>}
                    {(state.expand)?
                        <Collapse in={true}>
                            <div className='p-2 m-0 fsm text-1 ff-mst bg-light'>
                                {props.product.description}
                            </div>
                        </Collapse>:<></>
                        }
            </div>
    )
}

const mapDispatchToProps= dispatch=>({
    deleteProduct:id=>dispatch(deleteProduct(id))
})

export default connect(null,mapDispatchToProps)(ProductGrid)