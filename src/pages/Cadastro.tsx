/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert, AlertColor, Grid, Snackbar, Typography } from "@mui/material"
import backgroundCadastro from '/background-cadastro.png'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../App.css'
import InputDefault from "../components/InputDefault"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LabelDefault from "../components/LabelDefault";
import ButtonDefault from "../components/ButtonDefault";
import { createUser } from "../store/modules/user/users.slice"
import { useAppDispatch } from "../store/hooks"
import cicleUser from '/circle-user.png'

const Cadastro: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const [alertMessage, setAlertMessage] = useState<string>()
    const [openAlert, setOpenAlert] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [alertColor, setAlertColor] = useState<AlertColor>('error' || 'info' || 'success' || 'warning')

    const navUrl = (url: string) => {
        navigate(url)
    }

    const passwordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const passwordRepeatVisibility = () => {
        setShowRepeatPassword(!showRepeatPassword);
    };

    const clear = () => {
        setName('')
        setEmail('')
        setPassword('')
        setRepeatPassword('')
    }

    const handleCreateUser = async () => {
        if (!name || !email || !password || !repeatPassword) {
            setAlertMessage("Preencha todos os campos")
            setAlertColor("error")
            setOpenAlert(true)
            return
        }

        if (password !== repeatPassword) {
            setAlertMessage("Senhas não são iguais")
            setAlertColor("warning")
            setOpenAlert(true)
            return
        }
        const newUser = {
            name, email, password, repeatPassword
        }

        await dispatch(createUser(newUser)).then(response => {
            if (response.payload) {
                setAlertMessage("Cadastro realizado com sucesso")
                setAlertColor("success")
                clear()
                setOpenAlert(true)
                setTimeout(() => {
                    navigate('/')
                }, 1900)
            }
        }).catch(error => {
            setAlertMessage(`${error.response.message}`)
            setAlertColor("error")
        })
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
                            <Typography sx={{ display: 'flex', justifyContent: 'center', fontFamily: 'DM Sans, sans-serif', fontWeight: '800', fontSize: '25px', color: '#7751d6' }}>Cadastro</Typography>
                            <LabelDefault label="Nome" />
                            <InputDefault id='name' require value={name} action={(e) => setName(e.target.value)} label={"Insira seu nome"} color={"secondary"} type="text" icon={<img style={{ width: '25px', height: '23px', padding: '0px 10px 10px 0px', color: '#757575' }} src={cicleUser} />} />
                            <LabelDefault label="E-mail" />
                            <InputDefault id='email' require value={email} action={(e) => setEmail(e.target.value)} label={"Insira seu email"} color={"secondary"} type={"email"} icon={<MailOutlineIcon style={{ width: '24x', height: '25px', padding: '0px 10px 10px 0px', color: '#757575' }} />} />
                            <LabelDefault label='Senha' />
                            <InputDefault id='password' require value={password} action={(e) => setPassword(e.target.value)} color="secondary" label="Insira sua senha" type={showPassword ? 'text' : 'password'} icon={<span onClick={passwordVisibility}>{showPassword ? <RemoveRedEyeIcon style={{ padding: '0px 10px 10px 0px' }} /> : <VisibilityOffIcon style={{ padding: '0px 10px 10px 0px' }} />}</span>} />
                            <LabelDefault label='Confirme senha' />
                            <InputDefault id='repeatPassword' require value={repeatPassword} action={(e) => setRepeatPassword(e.target.value)} color="secondary" label="Repita a senha criada" type={showRepeatPassword ? 'text' : 'password'} icon={<span onClick={passwordRepeatVisibility}>{showRepeatPassword ? <RemoveRedEyeIcon style={{ padding: '0px 10px 10px 0px' }} /> : <VisibilityOffIcon style={{ padding: '0px 10px 10px 0px' }} />}</span>} />
                            <ButtonDefault type='button' label='Cadastrar' action={handleCreateUser} styleWidth={150} styleHeight={50} />
                            <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography variant="body1">Já tem cadastro ? <button onClick={() => navUrl('/')} className="link">Fazer login</button></Typography>
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

export default Cadastro
