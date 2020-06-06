import React,{useState,useRef,useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {setCampaignsObject} from '../../redux/campaigns/campaigns.actions'
import {setLeadsObject} from '../../redux/leads/leads.actions'
import {connect} from 'react-redux'
import axios  from 'axios'
import Alert from '@material-ui/lab/Alert'
import CircularProgress from '../utilComponents/CircularProgress'
import SearchBarFilters from './searchbar/SearchBarFilters'
import Fade from '@material-ui/core/Fade'

let type = ''
let c = 0
function Searchbar(props) {


  const query = useRef('')

  const [searchFilters,setSearchFilters] = useState({applied:false,filters:{},sortby:{}}) 
  const [state,setstate] = useState({progress:false,error:{exist:false,msg:''},clear:false})
  
  const makeFiltersChangeRequest = async (obj)=>{
      await setSearchFilters(obj)
      search()
      c += 1
      console.log(c)
  }

  const generateRequestData = ()=>{
    if(searchFilters.applied){
      const queryObject = {
              type:props.type,
              searchQuery:query.current.value || '',
              filters:searchFilters.filters,
              sortby:searchFilters.sortby
            }
      return {url:'/staffapi/filteredsearch',query:queryObject}
    }else{
      const queryObject = {
        type:props.type,
        searchQuery:query.current.value || '',
      }
      return {url:'/staffapi/filteredsearch',query:queryObject}
    }
  }

  const generateResult = (data)=>{
    switch(props.type){
      case 'campaigns': props.setCampaignsObject(data.campaignsArray);break ;
      case 'leads': props.setLeadsObject(data.leadsArray);break;
      default : return ''
    }
    setstate({...state,clear:!state.clear})
  }

  const checkLength = ()=>{
    if(query.current.value.length%3 === 0 && query.current.value !== ''){
      search()
    }
  }
  

  const search=(cflag = null)=>{
    setstate({...state,progress:(cflag === null)?true:false,error:{exist:false,msg:''}})
    let data = (cflag === true)?{url:'/staffapi/filteredsearch',query:{type:props.type,searchQuery:''}}:generateRequestData()
    axios.post(data.url,data.query,{withCredentials:true})
        .then(result=>{
          switch(result.data.status){
              case 423:setstate({...state,progress:false,error:{exist:true,msg:`validation err ${result.data.type}`}});break;
              case 500:setstate({...state,progress:false,error:{exist:true,msg:'server error'}});break;
              case 401:setstate({...state,progress:false,error:{exist:true,msg:'Unauthorized'}});break;
              case 200:generateResult(result.data);break;
              default :console.log('default exec serach bar')
          }
        })
        .catch(err=>{
          setstate({...state,progress:false,clear:(cflag === true)?false:true,error:{exist:true,msg:'server error'}})
        })
  }


  return (
  <div className='col-12 fsm d-flex justify-content-between'>
      <SearchBarFilters type={props.type}  makeFiltersChangeRequest={makeFiltersChangeRequest} flag={searchFilters.flag} />
        <div className='bg-light col-lg-6 col-md-6 col-8 p-0 d-flex justify-content-center align-items-center rounded'>
              <input className='bg-light form-control border-0'  placeholder={`Search ${props.type}`} id='search' 
              onChange={checkLength}
              ref={query} />
              {(state.progress)?
                <CircularProgress className='fsm'/>:
                <IconButton disabled={state.progress} size='small'   
                  onClick={search}>
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
          (state.clear)?<button className='btn btn-danger fsm' onClick={()=>search(true)} >clear results</button>:<></>
        }
   </div>
  );
}

const mapDispatchToProps = dispatch=>({
  setCampaignsObject:array=>dispatch(setCampaignsObject(array)),
  setLeadsObject:array=>dispatch(setLeadsObject(array))
})


export default connect(null,mapDispatchToProps)(Searchbar)