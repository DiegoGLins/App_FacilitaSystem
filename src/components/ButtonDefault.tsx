import { Grid } from "@mui/material"

interface ButtonDefaultProps {
    customStyle?: string;
    disable?: boolean;
    action?: () => void;
    label: React.ReactNode
    styleWidth: number
    styleHeight: number
    type?: "button" | "submit" | "reset" | undefined
}

const ButtonDefault: React.FC<ButtonDefaultProps> = ({ action, customStyle, disable, label, styleWidth, styleHeight, type }) => {
    return (
        <Grid item sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
            <button type={type} disabled={disable} className={customStyle} style={{ width: styleWidth, height: styleHeight }} onClick={action} >{label}</button>
        </Grid>
    )
}

export default ButtonDefault
