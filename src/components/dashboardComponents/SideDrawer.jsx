import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import LogoutButton from './LogoutButton'
import Brand from '../utilComponents/Brand'
import DBProfile from './Dbprofile'
import {Link} from 'react-router-dom'
import Badge from '@material-ui/core/Badge';
import CancelIcon from '@material-ui/icons/Cancel'
import IconButton from '@material-ui/core/IconButton';


const linksObject = {
    staff:[  {text:'Dashboard',to:'/',content:0},
                      {text:'Campaigns',to:'/campaigns',content:0},
                      {text:'Add Leads',to:'/addleads',content:0}],
    admin:[  {text:'Dashboard',to:'/',content:0},
                     {text:'Conversions',to:'/conversions',content:0},
                     {text:'Sellers',to:'/sellers',content:0},
                     {text:'Staff',to:'/staff',content:0},
                     {text:'Products',to:'/products',content:0}]
}

function SideDrawer(props){

return(
    <div className='bg-black text-white d-flex flex-column justify-content-between' style={{minHeight:'100vh'}}>
      <div>
         <div className='px-3 pt-4 d-flex text-white align-items-center justify-content-between'>
             <Brand color='light'/>
             <div className='mbl'>
                <IconButton size='small' color='inherit' onClick={props.handleDrawerToggle}>
                    <CancelIcon/>
                </IconButton>
            </div>
        </div>
         <DBProfile />
         <div className='hr-3 col-12' ></div>
         <ul className='list-unstyled my-2'>
                {linksObject[props.account_type].map((link, index) => {
                    let activeClass = 'text-decoration-none text-white fmd'
                    let inactiveClass = 'text-decoration-none text-white-50'
                    
                    return (
                        <li key={link.text} index={index}  
                            onClick={()=>{
                                           if(props.type ==='mbl')
                                           {setTimeout(()=>{props.handleDrawerToggle()},500)}
                                        }}
                             className='p-2 ff-mst d-flex justify-content-center'>
                            {(link.content !== 0)?<Badge badgeContent={link.content} color='secondary'>
                                <Link className={(index === props.screen)?activeClass:inactiveClass}
                                    to={link.to}>
                                    {link.text}
                                </Link>
                            </Badge>:
                            <Link className={(index === props.screen)?activeClass:inactiveClass}
                                    to={link.to}>
                                    {link.text}
                            </Link>}
                        </li>)
                })
                }
         </ul>
         <div className='hr-3 col-12' ></div>
         <ul className='list-unstyled my-2'>
                <li className='p-2 d-flex justify-content-center'>
                    <LogoutButton/>
                </li>
         </ul>
      </div>
      <div className='d-flex p-4 flex-wrap justify-content-center'>
        <span>&copy; {(new Date()).getFullYear()} | <b className='text-10'>S</b>ales<b className='text-10'>I</b>con </span> 
        <a className='text-decoration-none' href="https://github.com/sharvan-sharma">
            <FontAwesomeIcon icon={faGithub} className='mr-2'/>sharvan-sharma 
        </a> 
      </div>
    </div>
)
}

export default SideDrawer