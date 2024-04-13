import { Alert, AlertColor, Grid, Snackbar, Typography } from "@mui/material"
import backgroundCadastro from '/background-cadastro.png'
import { } from '../App.css'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../App.css'
import InputDefault from "../components/InputDefault"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LabelDefault from "../components/LabelDefault";
import ButtonDefault from "../components/ButtonDefault";
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { login } from "../store/modules/user/user.login.slice"

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const dataUserRedux = useAppSelector((state) => state.users.data)

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [alertMessage, setAlertMessage] = useState<string>()
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    const [alertColor, setAlertColor] = useState<AlertColor>('error' || 'info' || 'success' || 'warning')

    function Clear() {
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
        const userLogged = {
            email, password
        }
        await dispatch(login(userLogged)).then(response => {
            if (response.payload) {
                setAlertMessage(`${response.payload}`)
                setAlertColor("success")
                Clear()
                setOpenAlert(true)
                navigate('/home')
            }
        })
    }

    const validateUser = () => {
        if (!email || !password) {
            setAlertMessage("Preencha todos os campos")
            setAlertColor("error")
            setOpenAlert(true)
            return
        }
        const existUserEmail = dataUserRedux.find((item) => item?.email === email)
        const checkPassword = existUserEmail?.password === password
        console.log(dataUserRedux)
        console.log(existUserEmail)
        console.log(email)
        console.log(password)
        if (!existUserEmail) {
            setAlertMessage("Usuário não encontrado")
            setAlertColor("error")
            setOpenAlert(true)
        }

        if (!checkPassword) {
            setAlertMessage("Email ou senha incorretos")
            setAlertColor("error")
            setOpenAlert(true)
        }

        else if (existUserEmail?.email !== email) {
            setAlertMessage("Email ou senha incorretos")
            setAlertColor("error")
            setOpenAlert(true)
        }
        else {
            handleLogin()
        }
    }

    return (
        <>
            <Grid container sx={{ width: '100vw', minHeight: '100vh' }}>
                <Grid item xs={6} sx={{
                    background: `url(${backgroundCadastro})center/cover no-repeat`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: '100%'
                }}>
                </Grid>
                <Grid item xs={6} md={6} sx={{ display: 'flex', minHeight: '100%', paddingBottom: '30px' }} justifyContent={"center"} alignItems={'center'}>
                    <Grid container item justifyContent={"center"} sx={{ display: 'flex' }}>
                        <Grid item xs={9}>
                            <Typography sx={{ display: 'flex', justifyContent: 'center', fontFamily: 'DM Sans, sans-serif', fontWeight: '800', fontSize: '25px', color: '#7751d6' }}>Login</Typography>
                            <LabelDefault label="E-mail" />
                            <InputDefault require action={(e) => setEmail(e.target.value)} value={email} label={"Insira seu email"} color={"secondary"} type={"email"} icon={<MailOutlineIcon style={{ width: '24x', height: '25px', padding: '0px 10px 10px 0px', color: '#757575' }} />} />
                            <LabelDefault label='Senha' />
                            <InputDefault require action={(e) => setPassword(e.target.value)} value={password} color="secondary" label="Insira sua senha" type={showPassword ? 'text' : 'password'} icon={<span onClick={passwordVisibility}>{showPassword ? <RemoveRedEyeIcon style={{ padding: '0px 10px 10px 0px' }} /> : <VisibilityOffIcon style={{ padding: '0px 10px 10px 0px' }} />}</span>} />
                            <ButtonDefault type='button' action={validateUser} label='Entrar' styleWidth={150} styleHeight={50} />
                            <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography variant="body1">Não tem cadastro ? <button onClick={() => navUrl('/cadastro')} className="link">Cadastrar</button></Typography>
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