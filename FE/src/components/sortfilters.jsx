import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector hooks
import styles from './banner.module.css';
import { Grid } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Button from "@mui/material/Button";
import { updateSelectedStatus } from './redux/reducers/taskdetailsreducer';

export function Sorting({ setfiltername = () => {} }) {
  const [status, setStatus] = React.useState('');
  const dispatch = useDispatch(); // Initialize useDispatch hook

  // Get the selected status from Redux state
  const selectedStatus = useSelector((state) => state.Taskdetails.selectedStatus);
  const newtaskarray = useSelector((state) => state.Taskdetails.data);

  const handlesortvalue = (taskstatus) => {
    setStatus(taskstatus);
   console.log(taskstatus);

    // Dispatch an action to update Redux state with selected status
    dispatch(updateSelectedStatus(taskstatus));
  };

  function handlesortsearch(){

console.log(newtaskarray);

  }

  return (
    <Grid container className={styles.sortingsection} sm={12}>
      <Grid item>
        <InputLabel id="demo-multiple-name-label">Task status</InputLabel>
        <Select
          value={selectedStatus} // Use selectedStatus from Redux state
          onChange={(event) => {
            handlesortvalue(event.target.value); // Call handlesortvalue here
          }}
          style={{ minWidth: 190, maxHeight: 30 }}
        >
          <MenuItem value="">filter by task status</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="NotCompleted">Not Completed</MenuItem>
          <MenuItem value="Inprogress">In progress</MenuItem>
        </Select>
        <button onClick={handlesortsearch}> data</button>
       
      </Grid>
    </Grid>
  );
}
