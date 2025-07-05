import { v1 } from 'uuid';
import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
// import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import {Box, CssBaseline, Paper, Switch} from '@mui/material';
import {containerSX} from "./TodolistItem.styles.ts";
import {NavButton} from "./NavBatton.ts";


import { createTheme, ThemeProvider } from '@mui/material/styles';
import {amber, green, } from '@mui/material/colors';


export type Task = {
    id: string
    title: string
    isDone: boolean
}


export type toDoListType = {
    id:string
    title:string
    filter : FilterValues
}


    export type taskStateOfType ={
    [toDoListId:string]:Task[]
}

export type FilterValues = "all" | "active" | "completed"




export const App = ()=> {


    const toDoListId_1 = v1()
    const toDoListId_2 = v1()

    const [toDoLists, setTodolist] = useState<toDoListType[]>([
        {id:toDoListId_1, title:'What to learn',filter:"all"},
        {id:toDoListId_2, title:'What to buy',filter:"all"},
    ])

    const [tasks, setTasks] = useState<taskStateOfType>({


        [toDoListId_1]:[
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
            { id: v1(), title: 'Redux', isDone: false }
        ],


        [toDoListId_2]:[
            { id: v1(), title: 'cheese', isDone: true },
            { id: v1(), title: 'milk', isDone: true }
        ]
    })



    // Tasks CRUD



    const deleteTask = (taskId:string,toDoListId:string)=>{



        setTasks({...tasks,[toDoListId]: tasks[toDoListId].filter(task=> task.id !== taskId) })
    }


    const createTask = (title:string,toDoListId:string) => {

        const  newTask: Task = {id: v1(),title:title,isDone:false}

        setTasks({...tasks, [toDoListId]: [...tasks[toDoListId],newTask]} )
    }





    const changeTaskStatus = (taskId:string,newStatus:boolean,toDoListId:string) => {
       setTasks({...tasks, [toDoListId]: tasks[toDoListId].map(t=> t.id === taskId ? {...t,isDone: newStatus}:t)})
    }

    const changeTaskTitle = (taskId:string,title:string,toDoListId:string)=>{
        setTasks({...tasks, [toDoListId]: tasks[toDoListId].map(t=> t.id === taskId ? {...t,title}:t)})

    }
    //ToDoLists CRUD

    const  deleteToDoList = (toDoListId:string) => {
        setTodolist(toDoLists.filter(tl=> tl.id !== toDoListId))
        delete tasks[toDoListId]
    }


    const changeFilter  = (filter: FilterValues, toDoListId:string)=> {
        setTodolist(toDoLists.map(tl=> tl.id === toDoListId ?  {...tl,filter}: tl ))
    }
    const changeToDoListTitle  = (title:string, toDoListId:string)=> {
        setTodolist(toDoLists.map(tl=> tl.id === toDoListId ?  {...tl,title}: tl ))
    }



    const CreateToDoLists = (title:string)=>{
        const newToDoListId = v1()
        const newToDolIst: toDoListType = {id:newToDoListId,title,filter:"all"}
        setTodolist([...toDoLists, newToDolIst])
        setTasks({...tasks,[newToDoListId]:[]})
    }

    const toDoListComponents = toDoLists.map(tl=>{


        let filteredTasks: Task[] = tasks[tl.id]

        if(tl.filter === "active"){
            filteredTasks = filteredTasks.filter(task => !task.isDone )

        }


        if(tl.filter === "completed"){
            filteredTasks = filteredTasks.filter(task => task.isDone )

        }




        return (
            <Grid key={tl.id}>
                <Paper elevation={5} sx={{p:'15px'}}>
                    <TodolistItem
                        toDoListId = {tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={filteredTasks}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        createTask={createTask}
                        changeTaskStatus={changeTaskStatus}
                        deleteToDoList={deleteToDoList}
                        changeTaskTitle={changeTaskTitle}
                        changeToDoListTitle={changeToDoListTitle}

                    />
                </Paper>
            </Grid>


        )
    })


    const [isDarkMode, setIsDarkMode] = useState(false)

    const theme = createTheme({
        palette:{
            primary: green,
            secondary: amber,
            mode:isDarkMode ? "dark" : "light"
        }

    })

    return (
      <div className="app">
          <ThemeProvider theme={theme}>
              <CssBaseline/>
              <AppBar position="static">
                  <Toolbar>

                      <Container sx={containerSX}>
                          <IconButton color="inherit">
                              <MenuIcon />
                          </IconButton>
                          <Box>
                              <NavButton >Sign in</NavButton>
                              <NavButton >Sign up</NavButton>
                              <NavButton background={theme.palette.secondary.main}>Faq</NavButton>
                              <Switch onChange={()=>{setIsDarkMode(!isDarkMode)}}/>
                          </Box>

                      </Container>


                  </Toolbar>
              </AppBar>
              <Container maxWidth={"lg"} >
                  {/*sx={{marginLeft:"0px",marginRight:'0px'}}*/}
                  <Grid container sx={{p:"15px 0"}}>
                      <CreateItemForm createItem={CreateToDoLists}/>
                  </Grid>
                  <Grid container spacing={6}>
                      {toDoListComponents}
                  </Grid>

              </Container>

          </ThemeProvider>


      </div>
    )
}


