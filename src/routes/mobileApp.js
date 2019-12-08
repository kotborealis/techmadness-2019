import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {SoundReceiver} from '../components/SoundReceiver/SoundReceiver';
import {useStore} from '../store/store';
import Grid from '@material-ui/core/Grid';
import {QrReader} from '../components/QrReader/QrReader';
import CameraIcon from '@material-ui/icons/CameraAlt';
import CloseIcon from '@material-ui/icons/Close';

import classes from './mobileApp.css';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Transition from 'react-transition-group/Transition';
import Button from '@material-ui/core/Button';

import RosbankLogo from '../assets/rosbank-logo.png';
import DevicesIcon from '@material-ui/icons/Devices';
import {mobileApprove} from '../api/api';

const ScreenInitial = ({onDone}) =>
    <>
        <Grid
            container
            direction="column"
            alignItems="center"
        >
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    startIcon={<DevicesIcon/>}
                    onClick={onDone}
                >
                    Авторизовать через QR-код
                </Button>
            </Grid>
            <Grid item xs={10} className={classes.userAgreement}>
                <Typography align="center">
                    Я прочитал и принимаю условия пользовательского соглашения
                </Typography>
            </Grid>
        </Grid>
    </>;

const ScreenScan = ({handleToken, libquietLoaded, libquietProfile}) =>
    <>
        <Typography align="center" className={classes.scanCode}>
            <CameraIcon/> Отсканируйте QR-код с устройства
        </Typography>
        <QrReader
            onResult={(data) => handleToken("qr", data)}
            previewStyle={{
                width: "100%",
                height: "100%"
            }}
            style={{width: '100%', height: '100%'}}
        />
        <SoundReceiver
            on={libquietLoaded}
            profile={libquietProfile}
            onData={(data) => handleToken("sound", data)}
        />
    </>;

const DialogSuccess = ({open, approveCode, onDone}) =>
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
    >
        <DialogTitle>{"Остался один шаг"}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Проверьте, что код на устройстве совпадает с отображаемым: <b>{approveCode}</b>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onDone} color="primary">
                Ок!
            </Button>
        </DialogActions>
    </Dialog>;

export const MobileApp = ({}) => {
    const libquietProfile = useStore(state => state.libquietProfile);

    const libquietLoaded = useStore(state => !state.libquietLoading);

    const [step, setStep] = useState(0);
    const [approveCode, setApproveCode] = useState(null);

    const handleToken = (source, token) => {
        if(!token) return;

        mobileApprove({token}).then(({code}) => {
            setApproveCode(code);
            setStep(2);
        }).catch(error => console.log(JSON.stringify(error)));
    };

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <img className={classes.logo} src={RosbankLogo}/>
                <span className={classes.close}>
                    <CloseIcon fontSize="large"/>
                </span>
            </div>
            <Grid
                container
                direction="column"
                alignItems="center"
                style={{minHeight: '100vh'}}
            >
                <Grid item xs={12}>
                    {step === 0 && <ScreenInitial onDone={() => setStep(1)}/>}
                    {step === 1 && <ScreenScan {...{handleToken, libquietLoaded, libquietProfile}}/>}
                    <DialogSuccess onDone={() => setStep(3)} open={step === 2} approveCode={approveCode}/>
                    {step === 3 && (() => void (window.location = '/keypadInitial'))()}
                </Grid>
            </Grid>
        </div>
    );
};