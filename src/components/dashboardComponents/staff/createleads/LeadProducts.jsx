import React,{useEffect,useState} from 'react'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Cancel'
import axios  from 'axios'
import CircularProgress from '../../../utilComponents/CircularProgress'
import {connect} from 'react-redux'
import {setProductsObject} from '../../../../redux/products/products.actions'


const dropdownObject = (defaultObject)=>{
    let obj = {}
    Object.entries(defaultObject).map(item=>{
        if(item[1].status === 'A'){
            obj[item[0]] = {name:item[1].name}
        } 
    })
    return obj
}

function ChildComponent(props){

    const [state,setstate] = useState({products:{sel:{},rem:props.productsObject}})

    const addProduct = (id)=>{
        const remobj = state.products.rem
        const selobj = state.products.sel
        selobj[id] = remobj[id]
        delete remobj[id]
        props.setProducts({sel:{...selobj},rem:{...remobj}})
        setstate({...state,products:{sel:{...selobj},rem:{...remobj}}})
    }
    const removeProduct = (id)=>{
        const remobj = state.products.rem
        const selobj = state.products.sel
        remobj[id] = selobj[id]
        delete selobj[id]
        props.setProducts({sel:{...selobj},rem:{...remobj}})
        setstate({...state,products:{sel:{...selobj},rem:{...remobj}}})
    }

    return (
         <>
            {/* products dropdown */}
            <div className='d-flex col-12 p-0 flex-wrap my-2'>
                           {Object.entries(state.products.sel).map(item=>{
                               return (<label key={item[0]} className='bg-light rounded-pill px-2 m-1'  >
                                            <span>{item[1].name}</span>
                                            <IconButton size='small' onClick={()=>removeProduct(item[0])} color='inherit'>
                                                <CancelIcon/>
                                            </IconButton>
                                        </label>)
                           }) }
            </div>
            <div className="form-group">
                        <button type="button"  className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Products
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                            {
                                Object.entries(state.products.rem).map(item=><button key={item[0]} 
                                                                                onClick={()=>addProduct(item[0])}
                                                                                className="dropdown-item" type="button">
                                                                                    {item[1].name}
                                                                                </button>)
                            }
                        </div>
            </div>
            </>
    )
}

function LeadProducts(props){


    const [state,setstate] = useState({
        error:{exist:false,msg:''},
        loading:true,
    })

    useEffect(()=>{
        axios.get('/readproducts',{withCredentials:true})
        .then(result=>{
            setTimeout(()=>{
            switch(result.data.status){
                case 200:{
                    props.setProductsObject(result.data.productsArray);
                    setstate({...state,loading:false});
                    break;
                }
                case 500:setstate({...state,loading:false,error:{exist:false,msg:'Error while Loading products'}});break;
                case 401:setstate({...state,loading:false,error:{exist:false,msg:'Unauthorised'}});break;
                default:console.log('product loading default staff')
            }},3000)
        })
        .catch(err=>{
            setstate({...state,loading:false,error:{exist:false,msg:'Error while Loading products'}})
        })
    },[])

    

    if(state.loading){
        return (
            <div className='ff-mst text-1 d-flex align-items-center'>
                    <span>Loading Products</span>
                    <CircularProgress/>
                </div>
        )
    }else if(state.error.exist){
        return <Alert severity='error' variant='filled'>{state.error.msg}</Alert>
    }else{
        return <ChildComponent setProducts={props.setProducts} productsObject={dropdownObject(props.productsObject)} />
    }

}



const mapStateToPorps = (state)=>({
    productsObject:state.products.productsObject
})

const mapDispatchToProps = dispatch=>({
    setProductsObject:array=>dispatch(setProductsObject(array))
})

export default connect(mapStateToPorps,mapDispatchToProps)(LeadProducts)