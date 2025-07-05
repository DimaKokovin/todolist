// import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

type CreateItemFormType = {


    createItem: (title:string)=> void
}

export const CreateItemForm = (props:CreateItemFormType) => {


    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)


    const setTaskTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setItemTitle(e.currentTarget.value)
    }
    const isAddBtnDisabled = !itemTitle || itemTitle.length > 10



    const createTaskOnKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" &&  !isAddBtnDisabled){
            createTaskHandler()
        }
    }

    const createTaskHandler = () => {
        const trimmedTaskTitle = itemTitle.trim()

        if(trimmedTaskTitle){
            props.createItem(itemTitle)
        }else{
            setError("Title is required!!!")
        }


        setItemTitle('')}



    return (
        <div>
            <TextField
                error={!!error}
                size={"small"}
                variant={"outlined"}
                placeholder="Enter text"
                value={itemTitle}
                onChange={setTaskTitleHandler}
                onKeyDown={createTaskOnKeyDownHandler}
                // className={!!error ? "task-input-error":""}
                helperText={error}

            />



            <IconButton onClick={createTaskHandler} disabled={isAddBtnDisabled}>
                <AddCircleOutlineIcon/>
            </IconButton>



            {itemTitle && <div>Max title length is  10 charters</div>}
            {itemTitle.length > 10 && <div style={{color:'red'}}> Title length is to long</div>}
            {/*{error && <div style={{color: 'red'}}>{error}</div>}*/}
        </div>
    );
};

