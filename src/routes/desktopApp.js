import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import usePreciseTimer from '../hooks/usePreciseTimer';
import CircularProgress from '@material-ui/core/CircularProgress';
import {QrViewer} from '../components/QrViewer/QrViewer';
import {SoundTransmitter} from '../components/SoundTransmitter/SoundTransmitter';
import {useStore} from '../store/store';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DevicesIcon from '@material-ui/icons/Devices';
import CameraIcon from '@material-ui/icons/CameraAlt';
import MicIcon from '@material-ui/icons/Mic';
import SpeakerPhoneIcon from '@material-ui/icons/SpeakerPhone';
import Container from '@material-ui/core/Container';
import {authApprove} from '../api/api';
import Transition from 'react-transition-group/Transition';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

const AuthDescription = ({}) =>
    <Typography align="center">
        Используйте <nobr><MicIcon/> микрофон</nobr> или <nobr><CameraIcon/> камеру</nobr> Вашего устройства для
        авторизации
    </Typography>;

const ScreenInitial = ({onDone}) =>
    <Typography align="center">
        <Button
            variant="contained"
            startIcon={<DevicesIcon/>}
            onClick={onDone}
        >
            Авторизовать новое мобильное устройство
        </Button>
        <br/>
        <br/>
        <AuthDescription/>
    </Typography>;

const ScreenCode = ({token, libquietLoaded, libquietProfile, step, tokenLoading = true}) =>
    <>
        <QrViewer value={token}/>
        <Typography>
            {token.slice(0, 6)}
            {tokenLoading}
        </Typography>
        <SpeakerPhoneIcon fontSize="large"/>
        <Typography align="center">
            Держите устройство поблизости или отсканируйте QR-код
        </Typography>
        <br/>
        <br/>
        <AuthDescription/>
    </>;

const DialogSuccess = ({open, onDone}) =>
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
    >
        <DialogTitle>{"Ваше устройсво подключено!"}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Теперь вы можете продолжить работу с банком прямо на вашем мобильном устройстве!
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onDone} color="primary">
                Ок!
            </Button>
        </DialogActions>
    </Dialog>;


export const DesktopApp = ({}) => {
    const libquietProfile = useStore(state => state.libquietProfile);

    const libquietLoaded = useStore(state => !state.libquietLoading);
    const fetchAuthToken = useStore(state => state.authToken.fetch);
    const tokenLoading = useStore(state => state.authToken.loading);
    const token = useStore(state => state.authToken.data ? state.authToken.data.hash : null);
    const userId = useStore(state => state.authToken.data ? state.authToken.data.id : null);

    const [step, setStep] = useState("initial");

    const calculateHashTime = (ts = Date.now()) => (ts / 1000 / 5) | 0;

    usePreciseTimer(() => {
        if(step !== "code") return;
        fetchAuthToken({time: calculateHashTime()});
    }, 1000 * 2);


    useEffect(() => {
        if(step !== "code") return;
        fetchAuthToken({time: calculateHashTime()});
    }, [step]);

    useEffect(() => {
        if(step !== "code") return;
        (async () => {
            console.log("await auth");
            const data = await authApprove(userId);
            if(data === undefined) return;
            console.log("await auth done");
            setStep("success");
        })();
    }, [step, userId]);

    return (
        <Container>
            <Paper>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{minHeight: '100vh'}}
                >
                    <Grid item xs={12}>
                        <Typography style={{maxWidth: '300px'}} align="center">
                            {step === "initial" && <ScreenInitial onDone={() => setStep('code')}/>}
                            {step === "code" && !token && tokenLoading && <CircularProgress/>}
                            {step === "code" && token &&
                             <ScreenCode {...{token, libquietLoaded, libquietProfile, step}}/>}
                            <DialogSuccess open={step === "success"} onDone={() => setStep("end")}/>
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
            <SoundTransmitter value={token} on={libquietLoaded && step === "code"} profile={libquietProfile}/>
        </Container>
    );
};