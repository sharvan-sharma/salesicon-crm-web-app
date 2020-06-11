import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Navbar from './Navbar'
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import SideDrawer from '../components/dashboardComponents/SideDrawer'
import TabScreens from './TabScreens'
import {connect} from 'react-redux'

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
  },
}));


function DashboardStructure(props) {

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
          <Navbar 
          handleDrawerToggle={handleDrawerToggle}
          menuButton={classes.menuButton}
          account_type={props.account_type}
          screen={props.screen} />
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
            <SideDrawer screen={props.screen} account_type={props.account_type} type='mbl' handleDrawerToggle={handleDrawerToggle} />
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
            <SideDrawer screen={props.screen} account_type={props.account_type} type='pc' handleDrawerToggle={handleDrawerToggle} />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content} style={{backgroundColor:'white',minHeight:'100vh',padding:'1rem'}}>
        <div className={classes.toolbar} />
        <TabScreens screen = {props.screen} account_type={props.account_type} />
      </main>
    </div>
  );
}

const mapStateToProps = state=>({
account_type:state.user.account_type
})

export default connect(mapStateToProps)(DashboardStructure)