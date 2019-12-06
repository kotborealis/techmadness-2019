import React, {useState} from 'react';
import {QrReader} from '../components/QrReader/QrReader';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';

export const MobileApp = ({}) => {
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

        <Typography>
            Токен: {token}
        </Typography>
    </Paper>);
};