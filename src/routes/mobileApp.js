import React, {useState} from 'react';
import {QrReader} from '../components/QrReader/QrReader';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {SoundReceiver} from '../components/SoundReceiver/SoundReceiver';
import {useStore} from '../store/store';

export const MobileApp = ({}) => {
    const libquietLoaded = useStore(state => !state.libquietLoading);

    const [token, setToken] = useState(null);

    const handleToken = (source, token) => {
        if(!token) return;
        setToken(token);
    };

    return (<Paper>
        <Typography variant="h5">
            Авторизация
        </Typography>

        <QrReader
            onResult={(data) => handleToken("qr", data)}
            previewStyle={{
                width: 320,
                height: 320
            }}
        />

        <SoundReceiver
            on={libquietLoaded}
            onData={(data) => handleToken("sound", data)}
        />

        <Typography>
            Токен: {token}
        </Typography>
    </Paper>);
};