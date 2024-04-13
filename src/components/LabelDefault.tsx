import { Typography } from "@mui/material"

interface LabelDefaultProps {
    label: string
}

const LabelDefault = ({ label }: LabelDefaultProps) => {
    return (
        <Typography sx={{ marginTop: '1.2rem', fontFamily: 'DM Sans, sans-serif', fontSize: '18px', fontWeight: '600', color: '#7751d6' }} variant="body1">{label}</Typography>
    )
}

export default LabelDefault