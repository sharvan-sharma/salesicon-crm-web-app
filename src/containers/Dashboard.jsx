import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DBProfile from '../components/dashboardComponents/Dbprofile'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import LogoutButton from '../components/dashboardComponents/LogoutButton'
import {Link,Switch,Route} from 'react-router-dom'
import Campaigns from '../components/dashboardComponents/Campaigns'
import CreateLeads from '../components/dashboardComponents/CreateLeads'
import LeadsDashboard from '../components/dashboardComponents/LeadsDashboard'
import Badge from '@material-ui/core/Badge';
import Brand from '../components/utilComponents/Brand'
import CancelIcon from '@material-ui/icons/Cancel'
import Profile from '../components/dashboardComponents/Profile'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor:'white'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    backgroundColor:'white',
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [active,setactive] = React.useState(0)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const linksArray = [{text:'Dasboard',to:'/',content:0},
                      {text:'Campaigns',to:'/campaigns',content:0},
                      {text:'Add Leads',to:'/addleads',content:0}]

  const createdrawer = (type)=>(
    <div className='bg-black text-white d-flex flex-column justify-content-between' style={{minHeight:'100vh'}}>
      <div>
         <div className='px-3 pt-4 d-flex text-white align-items-center justify-content-between'>
             <Brand color='light'/>
             <div className='mbl'>
                <IconButton size='small' color='inherit' onClick={handleDrawerToggle}>
                    <CancelIcon/>
                </IconButton>
            </div>
        </div>
         <DBProfile setactive={setactive}/>
         <div className='hr-3 col-12' ></div>
         <ul className='list-unstyled my-2'>
                {linksArray.map((link, index) => {
                    let activeClass = 'text-decoration-none text-white fmd'
                    let inactiveClass = 'text-decoration-none text-white-50'
                    
                    return (
                        <li key={link.text} index={index}  
                            onClick={()=>{
                                           setactive(index)
                                           if(type ==='mbl')
                                           {setTimeout(()=>{handleDrawerToggle()},500)}
                                        }}
                             className='p-2 ff-mst d-flex justify-content-center'>
                            {(link.content !== 0)?<Badge badgeContent={link.content} color='secondary'>
                                <Link className={(index === active)?activeClass:inactiveClass}
                                    to={link.to}>
                                    {link.text}
                                </Link>
                            </Badge>:
                            <Link className={(index === active)?activeClass:inactiveClass}
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
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className='d-flex text-dark justify-content-between align-items-center'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className='mbl fmd'>
            <Brand color='dark'/>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {createdrawer('mbl')}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {createdrawer('pc')}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content} style={{backgroundColor:'white',minHeight:'100vh'}}>
        <div className={classes.toolbar} />
        <Switch>
            <Route exact path='/' component={()=><LeadsDashboard setactive={()=>setactive(0)}/>} />
            <Route exact path='/campaigns' component={()=><Campaigns setactive={()=>setactive(1)}/>} />
            <Route exact path='/addleads' component={()=><CreateLeads setactive={()=>setactive(2)}/>} />
            <Route exact path='/profile' component={()=><Profile setactive={()=>setactive(-1)}/>} />
        </Switch>
      </main>
    </div>
  );
}


export default ResponsiveDrawer;
