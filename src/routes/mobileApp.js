import React, {useEffect, useState} from 'react';
import {QrReader} from '../components/QrReader/QrReader';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import {SoundReceiver} from '../components/SoundReceiver/SoundReceiver';

const quiet = require('quietjs-bundle');

export const MobileApp = ({}) => {
    const [soundActive, setSoundActive] = useState(false);

    useEffect(() => {
        quiet.addReadyCallback(() => {
            console.log("QUIET JS LOADED");
            setSoundActive(true);
        });
    }, []);

    const [token, setToken] = useState(null);

    return (<Paper>
        <Typography variant="h5">
            Авторизация
        </Typography>

        <QrReader
            onResult={setToken}
            previewStyle={{
                width: 320,
                height: 320
            }}
        />

        <SoundReceiver
            on={soundActive}
            onData={(...data) => console.log(data)}
        />

        <Typography>
            Токен: {token}
        </Typography>
    </Paper>);
};