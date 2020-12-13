import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Card } from '@material-ui/core';

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import Popover from '@material-ui/core/Popover';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import TodayIcon from '@material-ui/icons/Today';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingTop: 70,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 0,
    bottom: 'auto',
    height: '70px',
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: 5,
    right: 0,
    margin: '0 10px',
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
});


function App() {

    const [events, setEvents] = useState([]);
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDialogAddEvent, setOpenDialogAddEvent] = React.useState(false);
    const [openDialogEditEvent, setOpenDialogEditEvent] = React.useState(false);
    const [activeEventID, setActiveEventID] = React.useState('');

    const handleExpandClick = () => {
    setExpanded(!expanded);
    };
    const csrftoken = Cookies.get('csrftoken');

    const updateEvents = useEffect(() => {
        axios({
            method: "GET",
            url: "http://0.0.0.0:8000/api/event/"
        }).then(response => {
            setEvents(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }, []);

  
// ActionsPopover
  const handleClickOpenPopover = (event, id) => {
    setAnchorEl(event.currentTarget);
    console.log(id);
    setActiveEventID(id);
  };

// Add Dialog
  const handleClickOpenAdd = (event) => {
    setOpenDialogAddEvent(true);
  };
  const handleClickCloseAdd = () => {
    setOpenDialogAddEvent(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
// Remove
  const handleClickRemove = () => {
    axios.delete(`http://0.0.0.0:8000/api/event/${activeEventID}`, 
            {headers: {'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRFToken': csrftoken
                      },
                    })
      .then(() => {
        handleClose();
        updateEventsList(setEvents);
        console.log(`Deleted ${activeEventID}`);
        console.log (events);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

// Edit Dialog
  const handleClickOpenEdit = (event) => {
    setOpenDialogEditEvent(true);
  };

  const handleClickCloseEdit = (event) => {
    setOpenDialogEditEvent(false);
  };

  //Add new form
  const [selectedAddDate, setSelectedDate] = React.useState(new Date());
  const [addReminderText, setAddReminderText] = React.useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddReminderTextChange = (text) => {
    setAddReminderText(text.currentTarget.value)
    console.log(addReminderText);
  };

  const handleClickAdd = (event) => {
    axios({
      method: 'post',
      url: 'http://0.0.0.0:8000/api/event/',
      headers: {'X-Requested-With': 'XMLHttpRequest',
                 'X-CSRFToken': csrftoken
                },
      data: {
        name: addReminderText,
        date_time: selectedAddDate
      }
      })
      .then(() => {
        updateEventsList(setEvents);
        setOpenDialogAddEvent(false);
        console.log(event);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? 'simple-popover' : undefined;

 
  
  console.log(events);
  console.log(activeEventID);
  return (
  <Container maxWidth="md">
  <MuiThemeProvider theme={theme}>
    <React.Fragment>
         <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.text} variant="h5" gutterBottom>Reminders</Typography>
          <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            <AddIcon onClick={handleClickOpenAdd}/>
          </Fab>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
      <Paper square className={classes.paper}>
        <List className={classes.list}>
          {events.map(({ id, name, date_time }) => (
            <React.Fragment key={id}>
              <ListItem>
                <ListItemText
                  primary={name + ' ' + id}
                  secondary={
                    <React.Fragment>
                      <TodayIcon fontSize="small"/>
                          {" " + date_time + " "}
                      <AccessAlarmIcon fontSize="small"/>
                        {" " + date_time + " "}
                    </React.Fragment>
                  }
                />
                <ExpandMoreIcon onClick={(event) => {handleClickOpenPopover(event, id)}}/>
                <Popover
                  id={id}
                  open={openPopover}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <List component="nav" aria-label="secondary mailbox folders">
                    <ListItem button onClick={handleClickOpenEdit}>
                      <ListItemText primary="Edit" />
                    </ListItem>
                    <ListItem button onClick={handleClickRemove}>
                      <ListItemText primary="Remove" />
                    </ListItem>
                  </List>
                </Popover>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Dialog fullWidth="true" open={openDialogAddEvent} onClose={handleClickCloseAdd}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="reminder_text"
            label="Reminder text"
            type="text"
            value={addReminderText}
            onChange={handleAddReminderTextChange}
            fullWidth
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={selectedAddDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectedAddDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </Grid>
          </MuiPickersUtilsProvider>
          <Typography align="right" className={classes.root}>
            <Button onClick={handleClickAdd} color="secondary">
              ADD
            </Button>
          </Typography>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>


      <Dialog fullWidth="true" open={openDialogEditEvent} onClose={handleClickCloseEdit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="reminder_text"
            label="Reminder text"
            type="text"
            fullWidth
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={selectedAddDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectedAddDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </Grid>
          </MuiPickersUtilsProvider>
          <Typography align="right" className={classes.root}>
            <Button onClick={handleClickAdd} color="secondary">
              ADD
            </Button>
          </Typography>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>

    </React.Fragment>
    </MuiThemeProvider>
    </Container>
  );
}

export default App;
function updateEventsList(setEvents) {
  axios({
    method: "GET",
    url: "http://0.0.0.0:8000/api/event/"
  }).then(response => {
    setEvents(response.data);
  }, []);
}

