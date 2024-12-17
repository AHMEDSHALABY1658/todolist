import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';

import { useTodos } from '../contexts/TodosContext';
import { ToastContext } from '../contexts/ToastContext';


import { useContext } from 'react';
import todosReducer from '../reducers/todoReducer'




export default function Todo({ todo, ShowDelete, showUpdate }) {
    const { ShowHideToast } = useContext(ToastContext)
    const { todos, dispatch } = useTodos()
    function handleCheckClick() {
        dispatch({ type: "toggleCompleted", payload: todo })
        ShowHideToast("Modified successfully")
    }
    function handleDeleteClick() {
        ShowDelete(todo);
    }



    function handleUpdateClick() {
        showUpdate(todo)
    }
    return (
        <>

            <Card sx={{ minWidth: 275, background: "#283593", color: "white", marginTop: "9px" }}>
                <CardContent className='CardContent' >
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={8}>
                            <Typography variant='h5' sx={{ textAlign: "left", textDecoration: todo.isCopleted ? "line-through " : "none" }} > {todo.title}</Typography>
                            <Typography variant='h6' sx={{ textAlign: "left " }} > {todo.details} </Typography>
                        </Grid>
                        <Grid size={4} display="flex" justifyContent="space-around">
                            <IconButton aria-label="delete" className='IconButton' style={{ color: todo.isCopleted ? "white" : "#8bc34a", background: todo.isCopleted ? "#8bc34a" : "white", border: "solid #8bc34a 2px" }} onClick={() => {
                                handleCheckClick();
                            }}>
                                {/* Check icon button*/}
                                <CheckIcon />
                            </IconButton>
                            <IconButton aria-label="delete" className='IconButton' style={{ color: "blue", background: "white", border: "solid blue 2px" }} onClick={handleUpdateClick}>
                                {/* update icon button*/}
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" className='IconButton' style={{ color: "red", background: "white", border: "solid red 2px" }} onClick={handleDeleteClick}>
                                {/* Delete icon button*/}
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>

            </Card>
        </>
    )
}