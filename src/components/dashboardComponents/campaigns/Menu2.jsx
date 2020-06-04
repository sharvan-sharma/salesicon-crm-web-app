import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '../../utilComponents/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import axios from 'axios'
import {connect} from 'react-redux'
import {editCampaign} from '../../../redux/campaigns/campaigns.actions'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

function MenuListComposition(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [progress,setprogress] = React.useState(false)
  const [err,seterr] = React.useState({exist:false,msg:''})

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const changeStatus = (e)=>{
      e.persist()
      axios.post('/staffapi/campaign/changestatus',{
          campaign_id:props.campaign_id,
          status:(props.status === 'A')?'IA':'A'
      },{withCredentials:true})
      .then(result=>{
        setprogress(false)
        switch(result.data.status){
            case 200: {
                props.editCampaign(result.data.campaign)
                handleClose(e)
                break;}
            case 500: seterr({exist:true,msg:'error,Try Again'});break;
            case 401: seterr({exist:true,msg:'error,Try Again'});break;
            case 422: seterr({exist:true,msg:'error,Try Again'});break;
            case 423: seterr({exist:true,msg:`error,Try Again`});break;
            default: console.log('default exec');
        }
      })
      .catch(err=>{
        setprogress(false)
        seterr({exist:true,msg:'error,Try Again'})
      })
  }


  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {(props.status === 'A')?
            <span className='text-1 ff-mst'>Active</span>:
           <span className='text-muted ff-mst'>Inactive</span>
           }
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={changeStatus}>
                        <div>
                            {(progress)?<CircularProgress/>:
                                <>
                                    {(props.status !== 'A')?
                                        <span className='text-1 ff-mst'>Active</span>:
                                        <span className='text-muted ff-mst'>Inactive</span>
                                    }
                                </>
                            }
                        </div>
                    </MenuItem>
                    <div>
                        {(err.exist)?
                        <MenuItem>
                            <Alert severity='error' variant='filled'>{err.msg}</Alert>
                        </MenuItem>:<></>
                    }
                    </div>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch=>({
    editCampaign:campaign=>dispatch(editCampaign(campaign))
})

export default connect(null,mapDispatchToProps)(MenuListComposition)