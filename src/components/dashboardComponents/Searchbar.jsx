import React,{useState,useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
// import {setNotebooksArray,setNotebook} from '../../redux/notebooks/notebooks.actions'
// import {setTodosArray,setTodoList} from '../../redux/todos/todos.action'
// import {connect} from 'react-redux'
// import axios  from 'axios'
import Alert from '@material-ui/lab/Alert'
import CircularProgress from '../utilComponents/CircularProgress'

const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: 10,
  }
}));

function Searchbar(props) {
  const classes = useStyles();
  const query = useRef('')
  const [progress,setprogress] = useState(false)
  const [error,seterror] = useState({exist:false,msg:''})

  // const findUrl = ()=>{
  //   switch(props.type){
  //     case 'notebooks': return '/notesapi/searchnotebooks' 
  //     case 'todos': return '/todosapi/searchtodos' 
  //     case 'notes' : return '/notesapi/searchnotes'
  //     case 'todolist' : return  '/todosapi/searchitems'
  //     default : return '/todosapi/readtodo'
  //   }
  // }

  // const generateResult = (data)=>{
  //   switch(props.type){
  //     case 'notebooks': props.setNotebooksArray(data.notebooks);break ;
  //     case 'todos': props.setTodosArray(data.todos);break;
  //     case 'notes': props.setNotebook(data.notebook);break;
  //     case 'todolist': props.setTodoList(data.todolist);break;
  //     default : return ''
  //   }
  // }

  // const checkLength = ()=>{
  //   if(query.current.value.length%3 === 0 && query.current.value !== ''){
  //     search()
  //   }
  // }

  // const search=()=>{
  //   props.setsearch(true)
  //   seterror({exist:false,msg:''})
  //   setprogress(true)
  //   axios.post(findUrl(),{
  //         query:query.current.value || '',
  //         notebook_id:props.notebook_id || '',
  //         todo_id:props.todo_id || ''
  //       },{withCredentials:true})
  //       .then(result=>{
  //         setTimeout(()=>{
  //         setprogress(false)
  //         let status =result.data.status
  //         if(status === 500){
  //           seterror({exist:true,msg:'server error'})
  //         }else if(status === 401){
  //           seterror({exist:true,msg:'Unauthorized access'})
  //         }else if(status === 200){
  //           generateResult(result.data)
  //         }
  //       },3000)
  //       })
  //       .catch(err=>{
  //         setprogress(false)
  //         seterror({exist:true,msg:'server error'})
  //       })
  // }

  const [style,setStyle] = useState({})

  return (<>
    <div className='bg-light d-flex justify-content-center align-items-center rounded' style={style}
     onBlur={()=>setStyle({})}
     onFocus={()=>setStyle({border:'2px solid #7400B8'})}>
        <input className='form-control bg-light border-0' placeholder='Search' id='search' 
        // onChange={checkLength}
         ref={query} />
        {(progress)?
          <CircularProgress className='fm'/>:
          <IconButton disabled={progress} className={classes.iconButton}  
          //onClick={search} 
          aria-label="search">
            <SearchIcon />
          </IconButton>
        }
    </div>
    {(error.exist)?<div className='my-2'><Alert severity='error' variant='filled'>{error.msg}</Alert></div>:<></>}
    </>
  );
}

// const mapDispatchToProps = dispatch =>({
//   setNotebooksArray:array=>dispatch(setNotebooksArray(array)),
//   setTodosArray:array=>dispatch(setTodosArray(array)),
//   setNotebook:notebook=>dispatch(setNotebook(notebook)),
//   setTodoList:todolist=>dispatch(setTodoList(todolist))
// })


//export default connect(null,mapDispatchToProps)(Searchbar)
export default Searchbar