import { Grid, Typography } from "@mui/material"
import NavbarStyled from "./NavbarStyled"
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import React from "react";
import '../App.css'

const NavBar: React.FC = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const navUrl = (url: string) => {
        navigate(url)
    }

    const handlelogout = async () => {
        if (token) {
            localStorage.clear()
            navUrl('/')
        }
    }

    return (
        <NavbarStyled>
            <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <Typography className="titleNavBar" variant="h3">Task Daily</Typography>
            </Grid>
            <Grid item sx={{ display: 'flex', paddingRight: '4rem' }}>
                <LogoutIcon sx={{
                    width: '35px',
                    height: '35px', cursor: 'pointer'
                }} onClick={handlelogout} />
            </Grid>
        </NavbarStyled>
    )
}

export default NavBar