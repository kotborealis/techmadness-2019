import React, {useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import usePreciseTimer from '../hooks/usePreciseTimer';
import CircularProgress from '@material-ui/core/CircularProgress';
import {QrViewer} from '../components/QrViewer/QrViewer';
import {SoundTransmitter} from '../components/SoundTransmitter/SoundTransmitter';
import {useStore} from '../store/store';

export const DesktopApp = ({}) => {
    const libquietLoaded = useStore(state => !state.libquietLoading);
    const fetchAuthToken = useStore(state => state.authToken.fetch);
    const tokenLoading = useStore(state => state.authToken.loading);
    const token = useStore(state => state.authToken.data);

    const calculateHashTime = (ts = Date.now()) => (ts / 1000 / 5) | 0;

    usePreciseTimer(() => {
        fetchAuthToken({time: calculateHashTime()});
    }, 1000 * 10);

    useEffect(() => void fetchAuthToken({time: calculateHashTime()}), []);

    return (<Paper>
        <Typography variant="h5">
            Генерация
        </Typography>

        {!token && tokenLoading && <CircularProgress/>}
        {token && <>
            <QrViewer value={token}/>
            <SoundTransmitter value={token} on={libquietLoaded}/>
        </>
        }
    </Paper>);
};