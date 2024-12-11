import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';
import { colors } from '@mui/material';
import Todo from './Todo';
import { useContext, useEffect, useState, useMemo, useReducer } from 'react';
import { TodosContext } from '../contexts/TodosContext';
import { ToastContext } from '../contexts/ToastContext';


import todosReducer from '../reducers/todoReducer'


// delete
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';






export default function Todolist() {
  const { todos2, setTodos } = useContext(TodosContext)
  const [titleInput, setTitle] = useState("")
  const [displayedTodos, setDisplayedTodos] = useState("all")
  const [showModel, setShowModel] = useState(false)
  const [DialogTodo, setDialogTodo] = useState(null)
  const [showModelUpdate, setShowModelUpdate] = useState(false)
  const [updateTodo, SetUpdateTodo] = useState();
  const { ShowHideToast } = useContext(ToastContext)

  const [todos, dispatch] = useReducer(todosReducer, [])

  //filteration arrays

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCopleted
    })
  }, [todos])

  const NotCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCopleted
    })
  }, [todos])

  let todosToBeRendered = todos

  if (displayedTodos == "completed") {
    todosToBeRendered = completedTodos
  } else if (displayedTodos == "non-completed") {
    todosToBeRendered = NotCompletedTodos
  } else {
    todosToBeRendered = todos
  }




  //HANDle Delete
  function ShowDeleteDialog(todo) {
    setDialogTodo(todo)
    setShowModel(true)
  }
  function handleCloseDeleteModel() {
    setShowModel(false)
  }
  function handleDeleteComfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id != DialogTodo.id
    })
    setTodos(updatedTodos)
    localStorage.setItem("todos", JSON.stringify(updatedTodos))
    setShowModel(false)
    ShowHideToast("Deleted successfully")
  }

  //HANDle updated

  function openUpdateDialog(todo) {
    setDialogTodo(todo)
    setShowModelUpdate(true)

  }

  function handleUpdateCloseModel() {
    setShowModelUpdate(false)
  }

  function handleUpdateComfirm() {
    const updatedTodosList = todos.map((t) => {
      if (t.id === DialogTodo.id) {
        return { ...t, title: DialogTodo.title, details: DialogTodo.details };
      }
      return t;
    });
    setTodos(updatedTodosList);
    setShowModelUpdate(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodosList))
    ShowHideToast("Modified successfully")
  }




  const todojsx = todosToBeRendered.map((t) => {
    return <Todo key={t.id} todo={t} ShowDelete={ShowDeleteDialog} showUpdate={openUpdateDialog} />;
  })

  function changeDisplayedType(e) {
    setDisplayedTodos(e.target.value)
  }







  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    if (storageTodos) {
      setTodos(storageTodos);
    } else {
      setTodos([]); // إذا لم يكن هناك بيانات، اجعلها قائمة فارغة
    }
  }, []);

  function handleAddClick() {
    dispatch({type:"added",payload:{newTitle:titleInput}})
    setTitle("")
    ShowHideToast("Added successfully")
  }
  return (
    <>
      {/* deleteModel */}
      <Dialog
        open={showModel}
        onClose={handleCloseDeleteModel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure about that??"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deletion cannot be undone once completed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModel}>close</Button>
          <Button autoFocus onClick={handleDeleteComfirm}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==deleteModel== */}

      {/* UpdateModel*/}
      <Dialog
        open={showModelUpdate}
        onClose={handleUpdateCloseModel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure about that??"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Task title"
            value={DialogTodo?.title || ""}
            onChange={(e) => {
              if (DialogTodo) {
                setDialogTodo({ ...DialogTodo, title: e.target.value });
              }
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="details"
            name="details"
            label="details"
            value={DialogTodo?.details || ""}
            onChange={(e) => {
              if (DialogTodo) {
                setDialogTodo({ ...DialogTodo, details: e.target.value });
              }
            }}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateCloseModel}>close</Button>
          <Button autoFocus onClick={handleUpdateComfirm}>
            done
          </Button>
        </DialogActions>
      </Dialog>
      {/* ==UpdateModel== */}


      <Container maxWidth="sm" >
        <Card sx={{ minWidth: 275 }} style={{ maxHeight: "80vh", overflow: "auto" }}>
          <CardContent>
            <Typography variant='h4' gutterBottom >
              My tasks
              <Divider />
            </Typography>
            {/* filter buttons */}
            <ToggleButtonGroup
              value={displayedTodos}
              exclusive
              onChange={changeDisplayedType}
              aria-label="text alignment"
            >
              <ToggleButton value="all" >
                All
              </ToggleButton>
              <ToggleButton value="completed" >
                completed
              </ToggleButton>
              <ToggleButton value="non-completed" >
                Not completed
              </ToggleButton>
            </ToggleButtonGroup>
            {/* === filter buttons === */}
            {/* All Todos */}
            {todojsx}
            {/* === All Todos === */}
            {/* input & Add button */}
            <Grid container style={{ marginTop: "20px" }} spacing={2}>
              <Grid size={4} display="flex" justifyContent="space-around" alignItems="center" >
                <Button variant="contained" style={{ width: "100%", height: "100%" }} onClick={handleAddClick} disabled={titleInput.length == 0} >
                  Add</Button>
              </Grid>
              <Grid size={8} display="flex" justifyContent="space-around">
                <TextField id="outlined-basic" label="Outlined" variant="outlined" style={{ width: "100%" }} value={titleInput} onChange={(e) => {
                  setTitle(e.target.value)
                }} />
              </Grid>
            </Grid>

            {/* ==input & Add button ==*/}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}