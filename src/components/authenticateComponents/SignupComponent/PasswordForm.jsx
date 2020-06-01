import React,{useRef,useState} from 'react';
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import utils from '../../../utils/index'
import Tooltip from '@material-ui/core/Tooltip'
import Fade from '@material-ui/core/Fade'

function PasswordForm(props){

  const password = useRef('')
  const cnfpassword = useRef('')
  const [err,seterr] = useState({
    password:{exist:0,msg:''},
    cnfpassword:{exist:0,msg:''}
  })

  const [meter,setmeter] = useState({
        exist:0,
        component:()=><></>
    })

  const power = ()=>{
       if(err.password.exist === 0){
                utils.generatePasswordPower(password.current.value,(power)=>{
                switch(power){
                    case 2 : { setmeter({exist:1,component:()=><Alert icon={false}  className='my-3 py-0 fsm' severity="error">Password is weak</Alert>})
                              break;}
                    case 3 : { setmeter({exist:1,component:()=><Alert icon={false}  className='my-3 py-0 fsm' severity="warning">Password is Good</Alert>})
                              break;}
                    case 4 : { setmeter({exist:1,component:()=><Alert icon={false}  className='my-3 py-0 fsm' severity="info">Password is Strong</Alert>})
                              break;}
                    case 5 : { setmeter({exist:1,component:()=><Alert className='my-3 py-0 fsm' severity="success">Password is Secure</Alert>})
                              break;}
                    default : { setmeter({exist:0,component:()=><></>})
                                break;}
                }
               })
        }else{
            setmeter({exist:0,component:()=><></>})
        }
  }

  const validatePwd = ()=>{
    const pwd = password.current.value
    if(pwd.length < 8 || pwd.length > 25){
      seterr({...err,password:{exist:1,msg:'Password lenght must be 8 to 25 caracter long'}})
    }else{
      seterr({...err,password:{exist:0,msg:''}})
    }
  }

  const validateCnfPwd = ()=>{
    const pwd = password.current.value
    const cpwd = cnfpassword.current.value 
    if(cpwd !== pwd.substring(0,cpwd.length)){
      seterr({...err,cnfpassword:{exist:1,msg:'password fields are not matching'}})
    }else{
      seterr({...err,cnfpassword:{exist:0,msg:''}})
    }
  }

  const submitForm = (e)=>{
      e.preventDefault()
      if(cnfpassword.current.value === password.current.value){
        props.setdata({...props.data,password:cnfpassword.current.value})
        if(props.next){
          props.next()
        }
      }else{
         seterr({...err,cnfpassword:{exist:1,msg:'password fields are not matching'}})
      }
      
  }
  


return (<Fade in={true}>
        <form onSubmit={submitForm}>
            <label className='h4'>Create A Password</label>
            <Tooltip arrow title={
                    <div className='text-white'>
                    <p>Do's</p>
                    <ul>
                        <li>Password must be 8 to 25 characters long</li>
                        <li>It must contain UpperCase and LowerCase letters</li>
                        <li>It also contain some special chharcters like @,./#$%^*()! etc</li>
                        <li>It must have some Integers</li>
                    </ul>
                    <p>Don't</p>
                    <ul>
                        <li>Never set password as Name of Person or Pet</li>
                        <li>Never set Birthday's as Password</li>
                        <li>Don't set passwords like qwerty,123456 etc </li>
                    </ul>
                    </div>
                }>
                    <p className='fm text-info'>What Exactly is a Strong Password ?</p>
                </Tooltip>
             {(meter.exist === 1)?meter.component():<></>}
            <div className='form-group'>
              <TextField
                fullWidth
                inputRef={password}
                onBlur={validatePwd}
                onChange={power}
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                required
              />
            </div>
            {(err.password.exist === 1)?<Alert severity='error' className='fsm'>{err.password.msg}</Alert>:<></>}
            <div className='form-group mt-2'>
              <TextField
                fullWidth
                inputRef={cnfpassword}
                onChange={validateCnfPwd}
                id="cnfpassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                required
              />
            </div>
            {(err.cnfpassword.exist === 1)?<Alert severity='error' className='fsm'>{err.cnfpassword.msg}</Alert>:<></>}
            <div className='d-flex justify-content-between my-2'>
               {(props.back)?<button className='btn btn-outline-dark' disabled={props.stepIndex === 0} onClick={props.back}>
                Back
              </button>:<></>}
              <div className='d-flex'>
                {(props.reset)?<button variant="contained" color="primary" className='btn btn-outline-danger mr-2' onClick={props.reset}>
                  Reset
                </button>:<></>}
                <button variant="contained" color="primary" disabled={(err.password.exist === 1 || err.cnfpassword.exist === 1)?true:false} 
                className='btn btn-dark' type='submit' >
                  {(props.reset)?'Sign Up':'Change Password'}
                </button>
              </div>
            </div>
        </form>
        </Fade>)
}

export default PasswordForm