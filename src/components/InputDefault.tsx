import { TextField, InputAdornment } from "@mui/material"
import React, { ChangeEvent } from "react";

interface InputDefaultProps {
    label: string
    color: "error" | "primary" | "secondary" | "info" | "success" | "warning";
    type: string;
    icon?: React.ReactNode
    action: (e: ChangeEvent<HTMLInputElement>) => void;
    value?: string | number
    require?: boolean
    id?: string
}

const InputDefault = ({ color, type, icon, label, action, value, require, id }: InputDefaultProps) => {
    return (
        <TextField id={id} required={require} onChange={action} value={value} color={color} label={label} type={type} variant="standard" fullWidth InputProps={{
            endAdornment: <InputAdornment position='end'>{icon}
            </InputAdornment>
        }} />
    )
}

export default InputDefault