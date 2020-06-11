import React,{useState} from 'react'
import axios from 'axios'
import CircularProgress from './CircularProgress'
import {connect} from 'react-redux'
import {editProduct} from '../../redux/products/products.actions'
import {editStaff} from '../../redux/staffs/staffs.actions'
import Alert from '@material-ui/lab/Alert'
import Fade from '@material-ui/core/Fade'

function Status(props){

    const [state,setstate] = useState({
        error:{exist:false,msg:''},
        progress:false
    })

    const Url = ()=>{
        switch(props.type){
            case 'products' : return '/adminapi/product/update/status'
            case 'staffs' : return '/adminapi/setstaffstatus'
            default :console.log('no default status route')
        }
    }

    const generateResult = (data)=>{
        switch(props.type){
            case 'products' : props.editProduct(data.product);break;
            case 'staffs' : props.editStaff(data.staff);break;
            default :console.log('no defaultreducx store')
        }
    }

    const createDataObject = ()=>{
        switch(props.type){
            case 'products' : return {status:(props.status === 'A')?'IA':'A',product_id:props.product_id}
            case 'staffs' : return {status:(props.status === 'A')?'IA':'A',staff_id:props.staff_id}
            default :console.log('no defaultreducx store')
        }
    }

    const changeStatus = ()=>{
        setstate({...state,progress:true})
        axios.post(Url(),createDataObject(),{withCredentials:true})
        .then(result=>{
            switch(result.data.status){
                case 200:generateResult(result.data);setstate({...state,progress:false});break;
                case 423:setstate({...state,progress:false,error:{exist:true,msg:`Validation error Type:${result.data.type}`}});break;
                case 422:setstate({...state,progress:false,error:{exist:true,msg:`Can't change status of ${props.type} that doesn't exist`}});break;
                case 500:setstate({...state,progress:false,error:{exist:true,msg:'Server Error'}});break;
                case 401:setstate({...state,progress:false,error:{exist:true,msg:'Unauthorised'}});break;
                default:console.log('default change status exec ')
            }
        })
        .catch(err=>{
            setstate({...state,progress:false,error:{exist:true,msg:'Server Error'}})
        })
    }

    return (<>
        {
            (state.progress)?
            <CircularProgress/>:
            <div className="dropdown">
                <button className="dropdown-toggle btn btn-light fsm rounded-pill px-3 ff-mst" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {(props.status === 'A')?
                    <span className='text-1'>Active</span>:
                    <span className='text-muted'>Inactive</span>
                    }
                </button>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown" 
                style={{position:'absolute',left:0,minWidth:'auto',transform:'none !important',willChange:'unset'}}>
                    <button  className="dropdown-item" onClick={changeStatus} >
                        {(props.status === 'A')?
                        <span className='text-muted ff-mst'>Inactive</span>:
                        <span className='text-1 ff-mst'>Active</span>
                        }
                    </button>
                </div>
            </div>
        }
        {
            (state.error.exist)?
            <Fade in={true}>
                <Alert severity='error' variant='filled'>{state.error.msg}</Alert>
            </Fade>:
            <></>
        }
        </>
    )
}

const mapDispatchToProps = dispatch=>({
    editProduct:product=>dispatch(editProduct(product)),
    editStaff:staff=>dispatch(editStaff(staff))
})

export default connect(null,mapDispatchToProps)(Status)