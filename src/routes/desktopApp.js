import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import usePreciseTimer from '../hooks/usePreciseTimer';
import {useFetchAuthToken} from '../api/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import {QrViewer} from '../components/QrViewer/QrViewer';
import {SoundTransmitter} from '../components/SoundTransmitter/SoundTransmitter';
import Button from '@material-ui/core/Button';

const quiet = require('quietjs-bundle');

export const DesktopApp = ({}) => {
    const [soundActive, setSoundActive] = useState(false);

    useEffect(() => {
        quiet.addReadyCallback(() => {
            console.log("QUIET JS LOADED");
            setSoundActive(true);
        });
    }, []);

    const [hashTime, setHashTime] = useState(0);

    const calculateHashTime = (ts = Date.now()) => (ts/1000/5)|0;

    usePreciseTimer(() => {
        setHashTime(calculateHashTime());
    }, 1000 * 5, true);

    const [token, tokenLoading] = useFetchAuthToken({time: hashTime}, [hashTime]);
    return (<Paper>
        <Typography variant="h5">
            Генерация
        </Typography>

        <SoundTransmitter value={"Hello world!"} on={soundActive}/>

        {!token && tokenLoading && <CircularProgress/>}
        {token && <QrViewer value={token}/>}
    </Paper>);
};