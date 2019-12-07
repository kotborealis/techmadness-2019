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

export const DesktopApp = ({}) => {
    const libquietLoaded = useStore(state => !state.libquietLoading);
    const fetchAuthToken = useStore(state => state.authToken.fetch);
    const tokenLoading = useStore(state => state.authToken.loading);
    const token = useStore(state => state.authToken.data);

    const [showToken, setShowToken] = useState(false);

    const calculateHashTime = (ts = Date.now()) => (ts / 1000 / 5) | 0;

    usePreciseTimer(() => {
        if(!showToken) return;
        fetchAuthToken({time: calculateHashTime()});
    }, 1000 * 10);


    useEffect(() => {
        if(!showToken) return;
        fetchAuthToken({time: calculateHashTime()});
    }, [showToken]);

    return (
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

                        {!showToken && <Button
                            variant="contained"
                            startIcon={<DevicesIcon/>}
                            onClick={() => setShowToken(true)}
                        >
                            Авторизовать новое мобильное устройство
                        </Button>}

                        {showToken && !token && tokenLoading && <CircularProgress/>}

                        {showToken && token && <>
                            <QrViewer value={token}/>
                            <SoundTransmitter value={token} on={libquietLoaded}/>
                            <SpeakerPhoneIcon fontSize="large"/>
                            <Typography align="center">
                                Держите устройство поблизости или отсканируйте QR-код
                            </Typography>
                        </>}

                        <br/>
                        <br/>
                        Используйте <nobr>
                        <MicIcon/> микрофон
                    </nobr> или <nobr>
                        <CameraIcon/> камеру
                    </nobr> Вашего устройства для авторизации в приложении Росбанка
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );

    return (<Paper>
        <Typography variant="h5">
            Генерация
        </Typography>
    </Paper>);
};