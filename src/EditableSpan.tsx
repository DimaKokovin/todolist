import {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";
type EditableSpanType = {
    title:string
    changeTitle: (title:string)=> void


}

export const EditableSpan = (props:EditableSpanType) => {
    const [isEditMode, setIsEditMode] = useState(false)

    const [itemTitle, setItemTitle] =useState(props.title)
    const setTaskTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {

        setItemTitle(e.currentTarget.value)
    }

    const onEditMode= () =>  setIsEditMode(true)
    const offEditMode= () => {
        setIsEditMode(false)
        props.changeTitle(itemTitle)
    }
    return (
       isEditMode ? <TextField
           variant={"standard"}
           value={itemTitle}
           onBlur={offEditMode}
           onChange={setTaskTitleHandler}
           autoFocus/> : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

