import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {SoundReceiver} from '../components/SoundReceiver/SoundReceiver';
import {useStore} from '../store/store';

export const MobileApp = ({}) => {
    const libquietProfile = useStore(state => state.libquietProfile);

    const libquietLoaded = useStore(state => !state.libquietLoading);

    const [token, setToken] = useState(null);

    const handleToken = (source, token) => {
        if(!token) return;
        console.log(source, token);
        setToken(token);
    };

    return (<Paper>
        <Typography variant="h5">
            Авторизация
        </Typography>

        {/*<QrReader*/}
        {/*onResult={(data) => handleToken("qr", data)}*/}
        {/*previewStyle={{*/}
        {/*width: 320,*/}
        {/*height: 320*/}
        {/*}}*/}
        {/*/>*/}

        <SoundReceiver
            on={libquietLoaded}
            profile={libquietProfile}
            onData={(data) => handleToken("sound", data)}
        />

        <Typography>
            Токен: {token}
        </Typography>
    </Paper>);
};