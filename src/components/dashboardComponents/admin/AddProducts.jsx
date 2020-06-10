import React,{useEffect,useState} from 'react'
import {Connect} from 'react-redux'
import ProductGrid from './addproduct/ProductGrid'
import Alert from '@material-ui/lab/Alert'
import Fade from '@material-ui/core/Fade'
import ProductEditor from './addproduct/ProductEditor'
import {setProductsObject} from '../../../redux/products/products.actions'
import LinearProgress from '../../utilComponents/LinearProgress'
import Brand from '../../utilComponents/Brand'
import axios from 'axios'
import {connect} from 'react-redux'

function Products(props){

    const [state,setstate] = useState({
        loading:true,
        error:{exist:false,msg:''},
        openEditor:false
    })

    const closeEditor = ()=>{
        setstate({...state,openEditor:false})
    }

    useEffect(()=>{
        axios.get('/readproducts',{withCredentials:true})
        .then(result=>{
            switch(result.data.status){
                case 200: props.setProductsObject(result.data.productsArray);setstate({...state,loading:false});break;
                case 401: setstate({...state,loading:false,error:{exist:true,msg:'Unauthorised To load products'}});break;
                case 500: setstate({...state,loading:false,error:{exist:true,msg:'Error Occured While Loading products'}});break;
                default : console.log('read products default exec admin')
            }
        })
        .catch(err=>{
            console.log(err)
            setstate({...state,loading:false,error:{exist:true,msg:'Error Occured While Loading products'}})
        })
    },[])

    if(state.loading){
        return (
            <div className='col-12 d-flex  justify-content-center align-items-center ' style={{height:'80vh'}}>
                <div className='col-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center align-items-center '>
                    <div className='fmd my-2'>
                        <Brand color='dark'/>
                    </div>
                    <LinearProgress/>
                </div>
            </div>
        )
    }else if(state.error.exist){
        return (
            <div className='col-12 d-flex justify-content-center align-items-center' style={{height:'80vh'}}>
                <div className='col-12 col-md-6 col-lg-6 d-flex flex-column justify-content-center align-items-center '>
                    <Fade in={true}><Alert severity='error' variant='filled'>{state.error.msg}</Alert></Fade>
                </div>
            </div>
        )
    }else{
        return (
            <>
            <div className='my-2 col-12 p-0 d-flex justify-content-between align-items-center'>
                <label className='m-1 ff-mst flg text-1'>Products</label>
                <button className='btn btn-outline-3' onClick={()=>setstate({...state,openEditor:true})} >New</button>
            </div>
            {
                (state.openEditor)?<ProductEditor mode='new' closeEditor={closeEditor} />:<></>
            }
            <div className='hr-3' />
            <div className='col-12 my-4 p-0'>
                {
                Object.entries(props.productsObject).map((item)=><ProductGrid key={item[0]} product={item[1]}/>)
                }
                {
                (Object.entries(props.productsObject).length === 0)?
                <Fade in={true}>
                    <Alert severity='info' variant='filled' className='shadow p-2 my-4 rounded'>
                        No Product Added Yet 
                    </Alert>
                </Fade>:
                <></>
                }
            </div>
            </>
        )
    }
}

const mapDispatchToProps = dispatch=>({
    setProductsObject:array=>dispatch(setProductsObject(array))
})

const mapStateToProps = state=>({
    productsObject:state.products.productsObject
})

export default connect(mapStateToProps,mapDispatchToProps)(Products)