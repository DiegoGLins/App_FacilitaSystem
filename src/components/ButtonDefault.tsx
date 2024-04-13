import { Grid } from "@mui/material"

interface ButtonDefaultProps {
    action?: () => void;
    label: string
    styleWidth: number
    styleHeight: number
    type?: "button" | "submit" | "reset" | undefined
}

const ButtonDefault: React.FC<ButtonDefaultProps> = ({ action, label, styleWidth, styleHeight, type }) => {
    return (
        <Grid item sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
            <button type={type} className="styleButton" style={{ width: styleWidth, height: styleHeight }} onClick={action} >{label}</button>
        </Grid>
    )
}

export default ButtonDefault
