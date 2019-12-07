import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import usePreciseTimer from '../hooks/usePreciseTimer';
import CircularProgress from '@material-ui/core/CircularProgress';
import {QrViewer} from '../components/QrViewer/QrViewer';
import {SoundTransmitter} from '../components/SoundTransmitter/SoundTransmitter';
import {useStore} from '../store/store';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/CameraAlt';
import MicIcon from '@material-ui/icons/Mic';
import SpeakerPhoneIcon from '@material-ui/icons/SpeakerPhone';
import {authApprove} from '../api/api';
import Transition from 'react-transition-group/Transition';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import FirstStepMock from '../assets/IMG_1149.PNG';
import SecondStepMock from '../assets/IMG_1150.PNG';
import ThirdStepMock from '../assets/IMG_1152.PNG';
import LogoMock from '../assets/photo_2019-12-07_22-27-35.jpg';

const ScreenFirstStep = ({onDone}) =>
    <div>
        <img src={FirstStepMock} width={1920} onClick={() => onDone()}/>
    </div>;
const ScreenSecondStep = ({onDone}) =>
    <div>
        <img src={LogoMock} width={1920} onClick={() => onDone()}/>
        <img src={SecondStepMock} width={1920} onClick={() => onDone()}/>
    </div>;
const ScreenThirdStep = ({onDone}) =>
    <div>
        <img src={LogoMock} width={1920} onClick={() => onDone()}/>
        <img src={ThirdStepMock} width={1920} onClick={() => onDone()}/>
    </div>;

const AuthDescription = ({}) =>
    <Typography align="center">
        Используйте <nobr><MicIcon/> микрофон</nobr> или <nobr><CameraIcon/> камеру</nobr> Вашего устройства для
        авторизации
    </Typography>;

const ScreenCode = ({token, libquietLoaded, libquietProfile, step, tokenLoading = true}) =>
    <Typography align="center">
        <QrViewer value={token}/>
        <Typography>
            {token ? token.slice(0, 6) : ''}
            {tokenLoading}
        </Typography>
        <SpeakerPhoneIcon fontSize="large"/>
        <Typography align="center">
            Держите устройство поблизости или отсканируйте QR-код
        </Typography>
        <br/>
        <br/>
        <AuthDescription/>
    </Typography>;

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
    const userFetch = useStore(state => state.user.fetch);
    const userId = useStore(state => state.user.data ? state.user.data.id : null);

    const libquietProfile = useStore(state => state.libquietProfile);

    const libquietLoaded = useStore(state => !state.libquietLoading);
    const fetchAuthToken = useStore(state => state.authToken.fetch);
    const tokenLoading = useStore(state => state.authToken.loading);
    const token = useStore(state => state.authToken.data);

    useEffect(() => {
        userFetch();
    }, []);

    const [step, setStep] = useState(0);

    usePreciseTimer(() => {
        if(step !== 1) return;
        fetchAuthToken({userId});
    }, 1000 * 4);


    useEffect(() => {
        if(step !== 1) return;
        fetchAuthToken({userId});
    }, [step]);

    useEffect(() => {
        if(step !== 1) return;
        (async () => {
            const data = await authApprove(userId);
            if(data === undefined) return;
            setStep(2);
        })();
    }, [step, userId]);

    console.log(token, tokenLoading);

    return (
        <div>
            {(step === 0 || step === 1) && <ScreenFirstStep onDone={() => setStep(1)}/>}
            {step === 1 && <Dialog open={true}>
                <DialogTitle>Добавить устройство</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {!token && tokenLoading && <CircularProgress/>}
                        {token && <ScreenCode {...{token, libquietLoaded, libquietProfile, step}}/>}
                    </DialogContentText>
                </DialogContent>
            </Dialog>}
            {step === 2 && <ScreenSecondStep onDone={() => setStep(3)}/>}
            {step === 3 && <ScreenThirdStep onDone={() => setStep(4)}/>}
            <SoundTransmitter value={token} on={libquietLoaded && step === 1} profile={libquietProfile}/>
        </div>
    );
};