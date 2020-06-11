import React,{useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Grow from '@material-ui/core/Grow'
import Checkbox from '@material-ui/core/Checkbox';
import Badge from '@material-ui/core/Badge'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

let menu = {
  'staff':{
            'staff-c':{
              filters:[{code:'status',valuesArray:[{text:'Inactive',val:'IA'},{text:'Active',val:'A'}]}],
              sortby:[{text:'Name',valuesArray:[{text:'ASC',val:1},{text:'DESC',val:-1},{text:'none',val:0}],code:'name'},
                      {text:'Creation date',valuesArray:[{text:'ASC',val:1},{text:'DESC',val:-1},{text:'none',val:0}],code:'createdAt'}
                    ]
            },
            'staff-l':{
              filters:[{code:'status',valuesArray:[{text:'Rejected',val:'Rejected'},{text:'Converted',val:'Converted'},{text:'Pending',val:'Pending'}]},
                      {code:'source',valuesArray:[{text:'Online Source',val:'online'},{text:'Offline Source',val:'offline'}]}
                      ],
              sortby:[{text:'Name',valuesArray:[{text:'ASC',val:1},{text:'DESC',val:-1},{text:'none',val:0}],code:'name'},
                      {text:'Creation date',valuesArray:[{text:'ASC',val:1},{text:'DESC',val:-1},{text:'none',val:0}],code:'createdAt'},
                      {text:'Dob',valuesArray:[{text:'ASC',val:1},{text:'DESC',val:-1},{text:'none',val:0}],code:'dob'}
                    ]
            }
    },
    'admin':{
            'admin-c':{
              filters:[{code:'status',valuesArray:[{text:'Inactive',val:'IA'},{text:'Active',val:'A'}]}],
              sortby:[{text:'Name',valuesArray:[{text:'ASC',val:1},{text:'DESC',val:-1},{text:'none',val:0}],code:'name'},
                      {text:'Creation date',valuesArray:[{text:'ASC',val:1},{text:'DESC',val:-1},{text:'none',val:0}],code:'createdAt'}
                    ]
            },
            'admin-s':{
              filters:[{code:'status',valuesArray:[{text:'Inactive',val:'IA'},{text:'Active',val:'A'}]}],
              sortby:[{text:'Name',valuesArray:[{text:'ASC',val:1},{text:'DESC',val:-1},{text:'none',val:0}],code:'name'},
                      {text:'Creation date',valuesArray:[{text:'ASC',val:1},{text:'DESC',val:-1},{text:'none',val:0}],code:'createdAt'},
                      {text:'Dob',valuesArray:[{text:'ASC',val:1},{text:'DESC',val:-1},{text:'none',val:0}],code:'dob'}
                    ]
            },
            'admin-p':{
              filters:[{code:'status',valuesArray:[{text:'Inactive',val:'IA'},{text:'Active',val:'A'}]}],
              sortby:[{text:'Name',valuesArray:[{text:'ASC',val:1},{text:'DESC',val:-1},{text:'none',val:0}],code:'name'},
                      {text:'Creation date',valuesArray:[{text:'ASC',val:1},{text:'DESC',val:-1},{text:'none',val:0}],code:'createdAt'}
                    ]
            },
    },
}

function SearchBarFilters(props){

  const [state,setstate] = useState({open:false,applied:false,filters:{},sortby:{}})

  const handleChange = (v,key)=>{
    let val = Number(v)
    if(val !== 0){
      let sortByObject = state.sortby
      sortByObject[key] = val
      setstate({...state,sortby:{...sortByObject}})
    }else{
      console.log('exec')
      let sortByObject = state.sortby
      delete sortByObject[key]
      setstate({...state,sortby:{...sortByObject}}) 
    }
  }

  const sendFilters = async (v)=>{
    if(v){
      let filtersArray = Object.entries(state.filters).map(filter=>{
        let obj = {}
        obj[filter[0]] = {$in:filter[1]}
        return obj
      })
      props.makeFiltersChangeRequest({applied:v,filters:filtersArray,sortby:state.sortby})
      setstate({...state,open:false,applied:v})
    }else{
      props.makeFiltersChangeRequest({applied:v,filters:{},sortby:{}})
      setstate({filters:{},sortby:{},open:false,applied:v})
    }
  }

return (
  <div className='mr-2 ' >
    <div className='d-flex p-1 align-items-center rounded text-1'>
      <label className='text-muted m-1'>Filters</label>
      <Badge badgeContent={Object.entries(state.filters).length+Object.entries(state.sortby).length} color="primary">
        <IconButton size='small' color='inherit' onClick={()=>{
            if(state.open && !state.applied){
              setstate({...state,open:!state.open,filters:[],sortby:[]})
            }else{
              setstate({...state,open:!state.open})
            }
          }}>
            {(state.open)?<ArrowDropUpIcon/>:<ArrowDropDownIcon/>}
        </IconButton>
      </Badge>
    </div>
  {(state.open)?<Grow in={state.open}>
    <div className='p-4 shadow-lg bg-white searchbar-filters' style={{maxHeight:'70vh',overflowY:'scroll'}}>
        <div className='d-flex flex-wrap ' >
          <div>
           <label className='ff-mst text-dark'>Filters</label>
           <div className='d-flex flex-wrap'>
                {
                  menu[props.account_type][props.type].filters.map((elep,index)=>{
                  return (<div key={index}>
                    <label className='ff-mst m-1 text-muted'>{elep.code}</label>
                    {
                      elep.valuesArray.map(elec=>{
                      return (<div key={elec.val} className='d-flex justify-content-start align-items-center'>
                                <Checkbox
                                    size='small'
                                    color="default"
                                    key={elec.val}
                                    checked={(state.filters[elep.code] === undefined)?false:state.filters[elep.code].includes(elec.val)}
                                    onChange={(e)=>{
                                      if(e.target.checked){
                                        let filtersObject = state.filters
                                        filtersObject[elep.code] = [...((filtersObject[elep.code] === undefined)?[]:filtersObject[elep.code]),elec.val]
                                        setstate({...state,filters:{...filtersObject}})
                                      }else{
                                        let filtersObject = state.filters
                                        let arr = filtersObject[elep.code].filter(ele=>ele !== elec.val)
                                        filtersObject[elep.code] = arr
                                        setstate({...state,filters:{...filtersObject}})
                                      }
                                    }}
                                  />
                                  <label className='ff-mst m-1 text-muted'>{elec.text}</label>
                              </div>)
                             })
                    }
                    </div>)
                  })
                }
          </div>
          </div>
          <div >
              <label className='ff-mst text-dark'>Sort by</label>
              <div className='d-flex flex-wrap'>
               {
                menu[props.account_type][props.type].sortby.map((ele,index)=>{
                  return (
                    <div key={index} className='p-2 text-dark fsm'>
                        <FormControl  component="fieldset">
                          <FormLabel component="legend">{ele.text}</FormLabel>
                          <RadioGroup  name={ele.text} 
                            value={(state.sortby[ele.code] !== undefined)?state.sortby[ele.code]:0}
                            onChange={(e)=>handleChange(e.target.value,ele.code)}>
                            {
                              ele.valuesArray.map(ele=><FormControlLabel  key={ele.val} value={ele.val} control={<Radio size='small' />} label={ele.text} />)
                            }
                          </RadioGroup>
                        </FormControl>
                    </div>
                )})
              }
              </div>
          </div>
          
        </div>
        <div>
                <button className='btn btn-primary fsm mr-2' 
                  disabled={(Object.entries(state.sortby).length === 0 && Object.entries(state.filters).length === 0)?true:false} 
                  onClick={()=>{sendFilters(true)}} >Apply</button>
                <button className='btn btn-danger fsm my-2' 
                  disabled={(!state.applied)?true:false} 
                  onClick={()=>{sendFilters(false)}} >clear all</button>
          </div>
      </div>
    </Grow>:<></>}
  
  </div>
)


}

export default SearchBarFilters