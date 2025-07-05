import {SxProps} from "@mui/material"

export const containerSX:SxProps = {
    display:"flex",
    justifyContent:"space-between"
}

export const getListItmSx = (isDone: boolean):SxProps => ({
    display:"flex",
    justifyContent:"space-between",
    opacity:isDone ? 0.5 : 1
})