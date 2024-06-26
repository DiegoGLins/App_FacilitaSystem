/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, AlertColor, CircularProgress, Grid, Snackbar, Typography } from "@mui/material"
import backgroundCadastro from '/background-cadastro.png'
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import '../App.css'
import InputDefault from "../components/InputDefault"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LabelDefault from "../components/LabelDefault";
import ButtonDefault from "../components/ButtonDefault";
import { useAppDispatch } from "../store/hooks"
import { login } from "../store/modules/user/user.login.slice"

const Login: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [alertMessage, setAlertMessage] = useState<string>()
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    const [alertColor, setAlertColor] = useState<AlertColor>('error' || 'info' || 'success' || 'warning')
    const [validate, setValidate] = useState(true)
    const [laoding, setLoading] = useState(false)

    useEffect(() => {
        if (email.length && password.length) {
            setValidate(false)
        }
    }, [email, password])

    const clear = () => {
        setEmail('')
        setPassword('')
    }

    const passwordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const navUrl = (url: string) => {
        navigate(url)
    }

    const handleLogin = async () => {
        if (!email || !password) {
            setAlertMessage("Preencha todos os campos")
            setAlertColor("error")
            setOpenAlert(true)
            return
        }
        else {
            const userLogged = {
                email, password
            }
            setLoading(true)
            setValidate(true)
            await dispatch(login(userLogged)).then(response => {
                if (response.payload) {
                    setLoading(true)
                    setAlertMessage(`${response.payload}`)
                    setAlertColor("success")
                    setOpenAlert(true)
                    clear()
                    navigate('/home')
                }
            }).finally(() => {
                setAlertMessage("Email ou senha incorretos")
                setAlertColor("warning")
                setOpenAlert(true)
            })
        }
    }

    return (
        <>
            <Grid container sx={{ width: '100vw', minHeight: '100vh' }}>
                <Grid item xs={0} sm={7} md={6} sx={{
                    background: `url(${backgroundCadastro})center/cover no-repeat`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: '100%'
                }}>
                </Grid>
                <Grid item xs={12} sm={5} md={6} sx={{ display: 'flex', minHeight: '100%', paddingBottom: '30px' }} justifyContent={"center"} alignItems={'center'}>
                    <Grid container item justifyContent={"center"} sx={{ display: 'flex' }}>
                        <Grid item xs={9}>
                            <Typography sx={{ display: 'flex', justifyContent: 'center', fontFamily: 'DM Sans, sans-serif', fontWeight: '800', fontSize: '25px', color: '#7751d6' }}>Login</Typography>
                            <LabelDefault label="E-mail" />
                            <InputDefault require action={(e) => setEmail(e.target.value)} value={email} label={"Insira seu email"} color={"secondary"} type={"email"} icon={<MailOutlineIcon style={{ width: '24x', height: '25px', padding: '0px 10px 10px 0px', color: '#757575' }} />} />
                            <LabelDefault label='Senha' />
                            <InputDefault require action={(e) => setPassword(e.target.value)} value={password} color="secondary" label="Insira sua senha" type={showPassword ? 'text' : 'password'} icon={<span onClick={passwordVisibility}>{showPassword ? <RemoveRedEyeIcon style={{ padding: '0px 10px 10px 0px' }} /> : <VisibilityOffIcon style={{ padding: '0px 10px 10px 0px' }} />}</span>} />
                            <ButtonDefault type='button' action={handleLogin} customStyle={validate ? 'disabledButton' : 'styleButton'} disable={validate ? true : false} label={laoding ? <CircularProgress color="secondary" /> : "Entrar"} styleWidth={150} styleHeight={60} />
                            <Grid item sx={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }} variant="body1">Não tem cadastro ? <button onClick={() => navUrl('/cadastro')} className="link">Cadastrar</button></Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar className='styleAlert' open={openAlert} autoHideDuration={1600} onClose={() => setOpenAlert(false)}>
                <Alert variant='filled' onClose={() => setOpenAlert(false)} severity={alertColor}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default Login