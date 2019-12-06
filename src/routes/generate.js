import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import QRCode from 'qrcode.react';
import usePreciseTimer from '../hooks/usePreciseTimer';
import {useFetchAuthToken} from '../api/api';
import CircularProgress from '@material-ui/core/CircularProgress';

console.log("use", useFetchAuthToken);

export const RouteGenerate = ({}) => {
    //const [token, setToken] = useState(null);
    const [hashTime, setHashTime] = useState(0);

    const calculateHashTime = (ts = Date.now()) => (ts/1000/5)|0;

    usePreciseTimer(() => {
        setHashTime(calculateHashTime());
    }, 1000 * 5, true);

    const [token, tokenLoading, tokenError] = useFetchAuthToken({time: hashTime}, [hashTime]);
    return (<Paper>
        <Typography variant="h5">
            Генерация
        </Typography>

        {!token && tokenLoading && <CircularProgress/>}
        {token && <QRCode value={token}/>}
    </Paper>);
};