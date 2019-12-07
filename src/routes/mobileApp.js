import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {SoundReceiver} from '../components/SoundReceiver/SoundReceiver';
import {useStore} from '../store/store';
import Grid from '@material-ui/core/Grid';
import {QrReader} from '../components/QrReader/QrReader';
import CameraIcon from '@material-ui/icons/CameraAlt';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Transition from 'react-transition-group/Transition';
import Button from '@material-ui/core/Button';

export const MobileApp = ({}) => {
    const libquietProfile = useStore(state => state.libquietProfile);

    const libquietLoaded = useStore(state => !state.libquietLoading);

    const [token, setToken] = useState(null);
    const [showDialog, setShowDialog] = useState(false);

    const handleToken = (source, token) => {
        if(!token || showDialog) return;
        setToken(token);
        setShowDialog(true);
    };

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
                    <QrReader
                        onResult={(data) => handleToken("qr", data)}
                        previewStyle={{
                            width: "100%",
                            height: "100%"
                        }}
                        style={{width: '100%', height: '100%'}}
                    />
                    <Typography align="center"><CameraIcon/> Отсканируйте QR-код с устройства</Typography>
                    <SoundReceiver
                        on={libquietLoaded}
                        profile={libquietProfile}
                        onData={(data) => handleToken("sound", data)}
                    />
                </Grid>
            </Grid>

            <Dialog
                open={showDialog}
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
                    <Button onClick={() => setShowDialog(false)} color="primary">
                        Ок!
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};