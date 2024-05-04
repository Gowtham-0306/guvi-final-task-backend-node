import axios from 'axios';
// import { storeTasksSuccess } from './taskdetailsreducer';
import { storeTasksSuccess } from './taskdetailsreducer';

// Function to fetch data from API
export  async function fetchDataFromAPI (dispatch = ()=>{} ) {

  


    const apiurl = "http://127.0.0.1:3000/gettaskdetails";



  try {
    const response = await axios.get(apiurl);


dispatch(storeTasksSuccess(response.data.
  taskdetails));

  } catch (error) {
    throw error;
  }

 
};
fetchDataFromAPI()