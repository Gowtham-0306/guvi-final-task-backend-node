import { Grid, Button, Typography } from "@mui/material";
import styles from './banner.module.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Navbar } from "./navbar";
import { Taskcard } from "./taskcard";
import { Sorting } from "./sortfilters";
import axios from "axios";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDataFromAPI } from "./redux/reducers/apidatas";
import { storeediteddata } from "./redux/reducers/taskdetailsreducer";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

export function Homepage() {
  const navigate = useNavigate();
  const [filteredTasks, setFilteredTasks] = useState([]);
  const dispatch = useDispatch();
  const selectedStatus = useSelector(state => state.Taskdetails.selectedStatus);
  const [savedbutton, setsavedbutton] = useState(false);
  const [deletebutton, setdeletebutton] = useState(false);
  useEffect(() => {
    fetchDataFromAPI(dispatch);
    setdeletebutton(false);
  }, [dispatch, savedbutton, deletebutton]);
  const tasks = useSelector((state) => state.Taskdetails.data);
  console.log(tasks);



  
 
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
    }
  }, [history]);

 

  
  const [filtername, setfiltername] = useState("");
 
  
  
  const [errors, setErrors] = useState({
    taskname: false,
    taskdesc: false,
    taskcatogery: false,
  });
  const [taskdetails, settaskdetails] = React.useState({
    taskname: "",
    taskdesc: "",
    taskstatus: "",
    taskcatogery: ""
  });

  const [editableCardId, setEditableCardId] = useState(null);


  const handleTaskDelete = async (taskId, taskname, isdeleteclicked = Boolean) => {
    console.log("Deleting task with ID:", taskId , taskname);
    try {
      const response = await axios.delete(`http://127.0.0.1:3000/api/taskdelete/${taskId}`);
      console.log("Task deleted successfully");
      console.log(response);
      if(response.data.deleteduserdata){
        console.log(`deleted`);
        const updatedTasks = tasks.filter(task => task._id !== taskId);
        if (updatedTasks.length > 0) {
          dispatch({ type: 'UPDATE_TASKS', payload: updatedTasks });
        } else {
          console.log("No tasks remaining after deletion");
          dispatch({ type: 'UPDATE_TASKS', payload: updatedTasks });
        }
        setdeletebutton(true);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  
  async function handleAddTask() {
    if (!taskdetails.taskname || !taskdetails.taskdesc || !taskdetails.taskcatogery) {
      console.error("Please fill in all required fields");
      setErrors({
        taskname: !taskdetails.taskname,
        taskdesc: !taskdetails.taskdesc,
        taskcatogery: !taskdetails.taskcatogery,
      });
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:3000/createtaskdetails", {
        ...taskdetails,
        taskstatus: "NotCompleted",
      });
      if (response.status === 200) {
        console.log(`Task details saved`);
        console.log(response.data.userdata);
        const newTask = { ...taskdetails, id: response.data.taskname };
        const updatedTasks = [...tasks, newTask];
        dispatch({ type: 'UPDATE_TASKS', payload: updatedTasks });
        setsavedbutton(true);
        setTimeout(() => {
          setsavedbutton(false);
        }, 1000);
        settaskdetails({
          taskname: "",
          taskdesc: "",
          taskstatus: "",
          taskcatogery: ""
        });

        
      } 
      else {
        console.log("Task details not saved");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleclickedit(editedtaskdetails, taskid) {
    if (!editedtaskdetails.taskname || !editedtaskdetails.taskdesc || !editedtaskdetails.taskcatogery) {
      console.error("Please fill in all required fields");
      return;
    }
  
    try {
      const response = await axios.put(`http://127.0.0.1:3000/updateuser/${taskid}`, editedtaskdetails);
      if (response) {
        console.log("Task updated successfully");
        console.log(response.data); // Assuming the response contains the updated task object
  console.log(response.data.user);
        // Dispatch an action to update Redux state with the updated task
        dispatch(storeediteddata(response.data.user)); // Assuming storeTasksSuccess action creator is defined
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }
  
  useEffect(() => {
    console.log(selectedStatus);
    const filteredTasks = selectedStatus
      ? tasks.filter(task => task.taskstatus === selectedStatus)
      : tasks;
    setFilteredTasks(filteredTasks);
  }, [selectedStatus, tasks]);





  console.log(filteredTasks);
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
      </Grid>

      <Grid container className={styles.homepagefields}>
        <Grid item>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '24ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-controlled1"
              label="Task Title"
              onChange={(event) => {
                settaskdetails({ ...taskdetails, taskname: event.target.value });
                if (event.target.value.length > 0) {
                  setErrors({ ...errors, taskname: false });
                }
              }}
              error={errors.taskname}
              helperText={errors.taskname ? 'Task name is required' : ''}
              value={taskdetails.taskname}
            />
            <TextField
              id="outlined-controlled2"
              label="Task Description"
              onChange={(event) => {
                settaskdetails({ ...taskdetails, taskdesc: event.target.value });
                if (event.target.value.length > 0) {
                  setErrors({ ...errors, taskdesc: false });
                }
              }}
              error={errors.taskdesc}
              helperText={errors.taskdesc ? 'Task description is required' : ''}
              value={taskdetails.taskdesc}
            />
            <TextField
              id="outlined-controlled3"
              label="Task Category"
              onChange={(event) => {
                settaskdetails({ ...taskdetails, taskcatogery: event.target.value });
                if (event.target.value.length > 0) {
                  setErrors({ ...errors, taskcatogery: false });
                }
              }}
              error={errors.taskcatogery}
              helperText={errors.taskcatogery ? 'Task category is required' : ''}
              value={taskdetails.taskcatogery}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleAddTask}
              style={{ marginTop: 20, backgroundColor: savedbutton ? "green" : "rgb(25,118,210)" }}
            >
              {savedbutton ? (
                <>
                  <span>Task saved</span>
                  <DoneOutlineIcon />
                </>
              ) : "Add Task"}
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Sorting component */}
      <Sorting  setfiltername={setfiltername}/>

      {/* Task cards */}
      <Grid container>
      <Grid container rowGap={1} columnGap={7} className={styles.homepagecards}>
  {filteredTasks && filteredTasks.length > 0 ? (
    // Filter tasks based on selectedFilter before mapping
    filteredTasks.map((data, index) => (
      <Grid item md={3} key={data._id}>
        <Taskcard 
          taskdetails={data} 
          handletaskdelete={handleTaskDelete}  
          handleclickedit={handleclickedit}  
          editable={editableCardId === data._id} 
          handleCardEdit={setEditableCardId}
        />
      </Grid>
    ))
  ) : (
    <Typography>{filteredTasks.length > 0 ? "loading..." : "No tasks found"}</Typography>
  )}
</Grid>

</Grid>

    </>
  );
}


