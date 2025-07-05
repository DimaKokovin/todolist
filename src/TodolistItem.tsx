import {FilterValues, Task} from "./App.tsx";
// import {Button} from "./Button.tsx";
import Button from '@mui/material/Button';
import {CreateItemForm} from "./CreateItemForm.tsx";
import {ChangeEvent} from "react";
import {EditableSpan} from "./EditableSpan.tsx";
import DeleteIcon from '@mui/icons-material/Delete';
import {Box, IconButton, List, ListItem} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';
import {containerSX, getListItmSx} from "./TodolistItem.styles.ts";




type TodolistItemProps = {
    toDoListId:string
    title:string
    tasks: Task[]
    date?:string
    filter:FilterValues
    deleteTask:(taskId:string,toDoListId:string) => void
    changeFilter:(filter:FilterValues, toDoListId:string) => void
    createTask: (title:string,toDoListId:string)=> void
    changeTaskStatus:(taskId:string,newStatus:boolean, toDoListId:string)=> void
    deleteToDoList:(toDoListId:string) => void
    changeTaskTitle: (taskId:string,title:string,toDoListId:string)=> void
    changeToDoListTitle: (title:string,toDoListId:string)=> void
}


export const TodolistItem = (props:TodolistItemProps) => {

    const deleteToDoListFunction = ()=>{ props.deleteToDoList(props.toDoListId) }

    const createTaskH =(title:string)=>{
        props.createTask(title, props.toDoListId)
    }


    const changeToDoListTitleH = (title:string)=>{
        props.changeToDoListTitle(title,props.toDoListId)
    }

    return (
        <div>
            <h3>

                <EditableSpan title={props.title} changeTitle={changeToDoListTitleH}/>

                <IconButton onClick={deleteToDoListFunction}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <CreateItemForm

                createItem={createTaskH}
            />

            {props.tasks.length === 0 ?(<p>Тасок нет</p>):(

                <List>
                    {props.tasks.map(task=>{
                        const deleteTaskHandler = () =>  props.deleteTask(task.id,props.toDoListId)
                        const changeTaskStatusHandler =
                            (e:ChangeEvent<HTMLInputElement>) =>
                            props.changeTaskStatus(task.id,e.currentTarget.checked,props.toDoListId)

                        const changeTaskTitleH = (title:string)=>{
                            props.changeTaskTitle(task.id,title,props.toDoListId)
                        }

                        return(
                            <ListItem disablePadding key={task.id} sx={getListItmSx(task.isDone)}>

                                <Checkbox icon={<FavoriteBorder/> }
                                          checkedIcon={<Favorite/>}
                                          checked={task.isDone}
                                          onChange={changeTaskStatusHandler}
                                          size={'small'}   />


                                <EditableSpan title={task.title} changeTitle={changeTaskTitleH}/>

                                <IconButton onClick={deleteTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>

                            </ListItem>
                        )

                    })}


                </List>
            )}

            <Box sx={containerSX}>
                <Button  onClick={()=>props.changeFilter('all',props.toDoListId)}
                    size={"medium"}
                    variant={"contained"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    sx={{m:"0px 3px"}}      >

                    All
                </Button>

                <Button  onClick={()=>props.changeFilter('active',props.toDoListId)}
                         size={"small"}
                         variant={"contained"}
                         color={props.filter === "active" ? "secondary" : "primary"}
                         sx={{m:"0px 3px"}}  >
                    Active
                </Button>

                <Button  onClick={()=>props.changeFilter('completed',props.toDoListId)}
                         size={"small"}
                         variant={"contained"}
                         color={props.filter === "completed" ? "secondary" : "primary"}
                         sx={{m:"0px 3px"}}  >
                    Completed
                </Button>






            </Box>
            <div>{props.date}</div>
        </div>
    );
};

