import React, {useEffect, useState} from 'react';
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

export const MobileApp = ({}) => {
    const libquietProfile = useStore(state => state.libquietProfile);

    const libquietLoaded = useStore(state => !state.libquietLoading);

    const [token, setToken] = useState(null);
    const [step, setStep] = useState("initial");

    const handleToken = (source, token) => {
        console.log("Handle token", token, step);
        if(!token) return;

        setToken(token);
        setStep("success");
    };

    useEffect(() => {
        if(!token) return;
        void mobileApprove({token});
    }, [token]);

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
                {step === "initial" && <Grid item xs={12}>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                    >
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                startIcon={<DevicesIcon/>}
                                onClick={() => setStep("scan")}
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
                </Grid>}
                {step === "scan" && <Grid item xs={12}>
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
                </Grid>}
            </Grid>

            <Dialog
                open={step === "success"}
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
                    <Button onClick={() => setStep("end")} color="primary">
                        Ок!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};