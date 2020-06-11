import React,{useState,useRef} from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {setCampaignsObject} from '../../redux/campaigns/campaigns.actions'
import {setLeadsObject} from '../../redux/leads/leads.actions'
import {setProductsObject} from '../../redux/products/products.actions'
import {setStaffsObject} from '../../redux/staffs/staffs.actions'
import {connect} from 'react-redux'
import axios  from 'axios'
import Alert from '@material-ui/lab/Alert'
import CircularProgress from '../utilComponents/CircularProgress'
import SearchBarFilters from './searchbar/SearchBarFilters'
import Fade from '@material-ui/core/Fade'

function Searchbar(props) {


  const query = useRef('')

  const [searchFilters,setSearchFilters] = useState({applied:false,filters:[],sortby:{}}) 
  const [state,setstate] = useState({progress:false,error:{exist:false,msg:''},clear:false})
  
  const makeFiltersChangeRequest = (obj)=>{
    if(obj.applied){
      search({searchQuery:query.current.value || '',filters:obj.filters,sortby:obj.sortby},'search')
    }else{
      search({searchQuery:'',filters:[],sortby:{}},'clear')//clear result
    }

    setSearchFilters(obj) 
  }

  const Url = ()=>{
    switch(props.account_type){
      case 'staff': return '/staffapi/filteredsearch'
      case 'admin':return '/adminapi/filteredsearch'
      default : console.log(`account_type doesn't exist `)
    }
  }

  const generateResult = (data,query_type)=>{
    if(props.account_type === 'staff'){
      switch(props.type){
        case 'staff-c': props.setCampaignsObject(data.campaignsArray);break ;
        case 'staff-l': props.setLeadsObject(data.leadsArray);break;
        default : return ''
      }
    }else{
      switch(props.type){
        case 'admin-c': props.setCampaignsObject(data.campaignsArray);break ;
        case 'admin-p': props.setProductsObject(data.productsArray);break;
        case 'admin-s': props.setStaffsObject(data.staffArray);break;
        default : return ''
      }
    }

    setstate({...state,clear:(query_type === 'clear')?false:true})
  }

  

  const search=(query,query_type)=>{
    setstate({...state,progress:(query_type === 'clear')?false:true,error:{exist:false,msg:''}})
    axios.post(Url(),{...query,type:props.type},{withCredentials:true})
        .then(result=>{
          switch(result.data.status){
              case 423:setstate({...state,progress:false,error:{exist:true,msg:`validation err ${result.data.type}`}});break;
              case 500:setstate({...state,progress:false,error:{exist:true,msg:'server error'}});break;
              case 401:setstate({...state,progress:false,error:{exist:true,msg:'Unauthorized'}});break;
              case 200:generateResult(result.data,query_type);break;
              default :console.log('default exec serach bar')
          }
        })
        .catch(err=>{
          setstate({...state,progress:false,error:{exist:true,msg:'server error'}})
        })
      }


  

  const handleSearchbarChange = ()=>{
    const queryLength = query.current.value.length
    if(queryLength !== 0 && (queryLength%3 === 0)){
      search({
                searchQuery:query.current.value,
                filters:state.filters,
                sortyby:state.sortby
             },'search')
    }
  }

  
  const setPlaceHolder = ()=>{
    if(props.account_type === 'staff'){
      switch(props.type){
        case 'staff-l':return 'Search leads';
        case 'staff-c':return 'Serach Campaigns';
        default : console.log('no such type exist')
      }
    }else{
      switch(props.type){
        case 'admin-c':return 'Serach Campaigns';
        case 'admin-p':return 'Serach Products';
        case 'admin-s':return 'Serach Staffs';
        default:console.log('no such type exist')
      }
    }
  }



  return (
  <div className='d-flex justify-content-between align-items-center'>
        <SearchBarFilters type={props.type} account_type={props.account_type}  makeFiltersChangeRequest={makeFiltersChangeRequest} flag={searchFilters.flag} />
        <div className='bg-light form-control border-0  d-flex justify-content-center align-items-center rounded'>
              <input className='bg-light form-control border-0'
              placeholder={setPlaceHolder()}
              id='search' 
              onChange={handleSearchbarChange}
              onFocus={()=>setstate({...state,error:{exist:false,msg:''}})}
              ref={query} />
              {(state.progress)?
                <CircularProgress className='fsm'/>:
                <IconButton disabled={state.progress} size='small'   
                  onClick={()=>search({
                                        filters:state.filters,
                                        sortby:state.sortby,
                                        searchQuery:query.current.value
                                        },'search')
                          }
                >
                  <SearchIcon fontSize='small'/>
                </IconButton>
              }
        </div>
        {(state.error.exist)?
            <Fade in={state.error.exist}>
              <Alert severity='error' className='fsm' variant='filled'>{state.error.msg}</Alert>
            </Fade>:
            <></>
        }
        {
          (state.clear)?
          <button 
          className='btn btn-danger ml-2 text-nowrap fsm' 
          onClick={()=>search({searchQuery:'',filters:[],sortby:{}},'clear')} 
          >clear results</button>:<></>
        }
   </div>
  );
}

const mapDispatchToProps = dispatch=>({
  setCampaignsObject:array=>dispatch(setCampaignsObject(array)),
  setLeadsObject:array=>dispatch(setLeadsObject(array)),
  setStaffsObject:array=>dispatch(setStaffsObject(array)),
  setProductsObject:array=>dispatch(setProductsObject(array))
})


export default connect(null,mapDispatchToProps)(Searchbar)