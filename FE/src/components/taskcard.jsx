import * as React from 'react';
import styles from './banner.module.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { storeTasksRequest , storeTasksSuccess , storeTasksFailure} from "./redux/reducers/taskdetailsreducer"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from 'axios';

export function Taskcard({ taskdetails, handletaskdelete = () => {}, handleclickedit =()=>{}, editable = false, handleCardEdit = () => {} }) {
  const [status, setStatus] = React.useState('');
  const [editedTaskDetails, setEditedTaskDetails] = React.useState({ ...taskdetails });
  
  const handleChange = (event) => {
    setEditedTaskDetails({ ...editedTaskDetails, [event.target.name]: event.target.value });
    console.log(editedTaskDetails);
  };
  
  return (
    <>
      <Card sx={{ width: 350 }}>
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="body1" gutterBottom>
                Task Name:
              </Typography>
              <TextField
                id="task-name"
                // value={editable ? editedTaskDetails.taskname : taskdetails.taskname}
                value={editedTaskDetails.taskname}
                disabled={!editable}
                onChange={handleChange}
                name="taskname"
              />
            </Grid>
            <Grid item>
              <Typography variant="body1" gutterBottom>
                Task Description:
              </Typography>
              <TextField
                id="task-description"
                // value={editable ? editedTaskDetails.taskdesc : taskdetails.taskdesc}
                value={editedTaskDetails.taskdesc}
                disabled={!editable}
                onChange={handleChange}
                name="taskdesc"
              />
            </Grid>
            <Grid item>
              <Typography variant="body1" gutterBottom>
                Task Category:
              </Typography>
              <TextField
                id="task-category"
               // value={editable ? editedTaskDetails.taskcatogery : taskdetails.taskcatogery}
               value={editedTaskDetails.taskcatogery}
                disabled={!editable}
                onChange={handleChange}
                name="taskcatogery"
              />
            </Grid>
            <Grid item>
              <Typography variant="body1" gutterBottom>
                Status :  { editedTaskDetails.taskstatus }
              </Typography>
              <InputLabel id="demo-multiple-name-label">Task status</InputLabel>
              <Select
                style={{ minWidth: 120, maxHeight: 30 }}
                 value={ editedTaskDetails.taskstatus}

                disabled={!editable}
                // onChange={(event) => setStatus(event.target.value)}
                onChange={(event)=> {
                  setEditedTaskDetails({ ...editedTaskDetails, taskstatus: event.target.value });
                  setStatus(editedTaskDetails.taskstatus);
                 
                }}  
              >
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="NotCompleted">Not Completed</MenuItem>
                <MenuItem value="Inprogress">In progress</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <CardActions>
                <Button size="small" variant='contained' color='success' onClick={() => {
                  handleclickedit(editedTaskDetails, taskdetails._id);
                  console.log(editedTaskDetails);
                  handleCardEdit(null); 
                  
                }}>Save</Button>
                <Button size="small" variant='contained' color='error' onClick={() => {
                  handletaskdelete(taskdetails._id, taskdetails.taskname, true);
                }}>Delete</Button>
                <Button size="small" variant='contained' color='error' onClick={() => {
                  if(!editable){
                    handleCardEdit(taskdetails._id);
                  }
                  else
                
                {
                   handleCardEdit()

                }
                }}>Edit</Button>
              </CardActions>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}



