import {useDispatch} from "react-redux"
import { storeTasksFailure, storeTasksSuccess, storeTasksRequest } from "./taskdetailsreducer.js";
import { fetchDataFromAPI } from "./apidatas.js";

export async function useDataFetching() {


  const dispatch = useDispatch();

console.log(1111);
}
