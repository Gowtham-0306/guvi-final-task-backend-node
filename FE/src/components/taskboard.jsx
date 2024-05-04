import {Grid} from "@mui/material"
import styles from './banner.module.css'
import { Navbar } from "./navbar"
export function Taskboard(){

return(

<>



    <Grid container className={styles.taskboard}>
    <Navbar />

    </Grid>




</>)



}