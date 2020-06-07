import React,{useEffect,useState} from 'react';
import axios from 'axios'
import PreLoader from './components/utilComponents/PreLoader'
import ServerError from './components/utilComponents/ServerError'
import Page404 from './containers/Page404'
import LandingPage from './containers/LandingPage'
import Authenticate from './containers/Authenticate'
import Verify from './containers/Verify'
import ResetPassword from './containers/ResetPassword'
import DashboardRouter from './containers/DashboardRouter'
import Contact from './containers/Contact'
import About from './containers/About'
import {Route,Switch,Redirect} from 'react-router-dom'
import querystring from 'query-string'
import {setCurrentUser} from './redux/user/user.actions'
import {connect} from 'react-redux'
import 'jquery/src/jquery'
import 'popper.js/dist/popper'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './styles/main.css'

function App(props) {

   const [screen,resetScreen] = useState({loading:true,error:false})

   useEffect(() => {
     axios.get('/checklogin',{
       withCredentials:true
     })
     .then(res=>{
          if(res.data.logged_in){
              props.setCurrentUser(res.data)
              resetScreen({...screen,loading:false})
          }else{
            setTimeout(()=>{
            resetScreen({...screen,loading:false})
            },2000)
          }
     })
     .catch(err=>{
        resetScreen({loading:false,error:true})
     })
   },[])

  if (screen.loading) {
    return <PreLoader/>
  }else if (screen.error){
    return <ServerError/>
  } else {
    if (props.logged_in) {
      return (<Switch>
                <Route path='/' component={DashboardRouter} />
                <Route >
                  <Redirect to='/' />
                </Route>
              </Switch>)
    } else {
      return (<Switch>
                  <Route exact path='/' component={LandingPage} />
                  <Route exact path='/login' component={()=><Authenticate page={1} />} />
                  <Route exact path='/signup' component={()=><Authenticate page={2} />}/>
                  <Route exact path='/forgotpassword' component={()=><Authenticate page={3} />} />
                  <Route exact path='/resetpassword' component={(prop)=>{
                        const val = querystring.parse(prop.location.search)
                        const token = val.token
                        return <ResetPassword token = {token} />
                      }}/>/>
                  <Route path='/verifyemail' component={(prop)=>{
                        const val = querystring.parse(prop.location.search)
                        const token = val.token
                        return <Verify type='verified' token = {token} />
                      }}/>
                  <Route exact path='/approval' component={(prop)=>{
                        const val = querystring.parse(prop.location.search)
                        const token = val.token
                        return <Verify type='approved' token = {token} />
                      }}/>/>
                  <Route exact path='/contact' component={Contact} />
                  <Route exact path='/about' component={About} />
                  <Route component={Page404}/>
              </Switch>)
    }
  }
}

const mapStateToProps = (state) => ({
  logged_in: state.user.logged_in,
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: userObject => dispatch(setCurrentUser(userObject)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

