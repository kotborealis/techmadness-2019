import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import usePreciseTimer from '../hooks/usePreciseTimer';
import CircularProgress from '@material-ui/core/CircularProgress';
import {QrViewer} from '../components/QrViewer/QrViewer';
import {SoundTransmitter} from '../components/SoundTransmitter/SoundTransmitter';
import {useStore} from '../store/store';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/CameraAlt';
import MicIcon from '@material-ui/icons/Mic';
import SpeakerPhoneIcon from '@material-ui/icons/SpeakerPhone';
import {authApprove} from '../api/api';
import {RosbankDesktopMockup} from '../components/RosbankDesktopMockup';
import {DevicesList} from '../components/DevicesList/DevicesList';

const ScreenFirstStep = ({onDone}) => <RosbankDesktopMockup
    onClick={onDone}
    step={1}
    totalSteps={4}
    title={"Ознакомьтесь с условиями использования"}
>
</RosbankDesktopMockup>;

const ScreenCodeStep = ({token, tokenLoading, libquietLoaded, libquietProfile, step, onDone}) => <RosbankDesktopMockup
    onClick={onDone}
    step={2}
    totalSteps={4}
    title={"Добавление устройства"}
>
    {!token && tokenLoading && <CircularProgress/>}
    {token && <ScreenCode {...{token, libquietLoaded, libquietProfile, step}}/>}
</RosbankDesktopMockup>;

const ScreenSecondStep = ({approveCode, onDone}) => <RosbankDesktopMockup
    onClick={onDone}
    step={3}
    totalSteps={4}
    title={"Для завершения регистрации подпишите сертификат"}
>
    <Typography>
        <br/>
        Проверьте, что код на устройстве совпадает с отображаемым:
        <br/>
        <br/>
        <Typography variant="h5">{approveCode}</Typography>
    </Typography>
    <div style={{margin: '20px 10px'}}>
        <Button variant="outlined" color="primary" style={{margin: '0 10px'}}>
            Подписать сертификат
        </Button>
        <Button variant="outlined" color="secondary" style={{margin: '0 10px'}}>
            Отменить
        </Button>
    </div>
</RosbankDesktopMockup>;


const ScreenThirdStep = ({onDone}) => <RosbankDesktopMockup
    onClick={onDone}
    step={4}
    totalSteps={4}
    title={"Вы успешно подключились! Пользуйтесь банком вне офиса."}
>
    <Typography variant="h5">Подключённые устройства:</Typography>
    <br/>
    <DevicesList/>
</RosbankDesktopMockup>;

const AuthDescription = ({}) =>
    <Typography align="center">
        Используйте <nobr><MicIcon/> микрофон</nobr> или <nobr><CameraIcon/> камеру</nobr> Вашего устройства для
        авторизации
    </Typography>;

const ScreenCode = ({token, libquietLoaded, libquietProfile, step, tokenLoading = true}) =>
    <Typography align="center">
        <QrViewer value={token}/>
        <Typography>
            {token ? token.slice(0, 6) : ''}
            {tokenLoading}
        </Typography>
        <SpeakerPhoneIcon fontSize="large"/>
        <Typography align="center">
            Держите устройство поблизости или отсканируйте QR-код
        </Typography>
        <br/>
        <br/>
        <AuthDescription/>
    </Typography>;


export const DesktopApp = ({}) => {
    const step = useStore(state => state.desktopStep);
    const advanceStep = useStore(state => state.advanceDesktopStep);

    const setStore = useStore(state => state.set);

    const userFetch = useStore(state => state.user.fetch);
    const userId = useStore(state => state.user.data ? state.user.data.id : null);

    const libquietProfile = useStore(state => state.libquietProfile);

    const libquietLoaded = useStore(state => !state.libquietLoading);
    const fetchAuthToken = useStore(state => state.authToken.fetch);
    const tokenLoading = useStore(state => state.authToken.loading);
    const token = useStore(state => state.authToken.data);
    const approveCode = useStore(state => state.approveCode);

    useEffect(() => {
        userFetch();
    }, []);

    usePreciseTimer(() => {
        if(step !== 1) return;
        fetchAuthToken({userId});
    }, 1000 * 4);


    useEffect(() => {
        if(step !== 1) return;
        fetchAuthToken({userId});
    }, [step]);

    useEffect(() => {
        if(step !== 1) return;
        (async () => {
            const data = await authApprove(userId);
            if(data === undefined) return;
            setStore(state => void (state.approveCode = data.code));
            advanceStep();
        })();
    }, [step, userId]);

    return (
        <div>
            {step === 0 && <ScreenFirstStep onDone={advanceStep}/>}
            {step === 1 && <ScreenCodeStep {...{token, tokenLoading, libquietLoaded, libquietProfile, step}}
                                           onDone={advanceStep}/>}
            {step === 2 && <ScreenSecondStep onDone={advanceStep} approveCode={approveCode}/>}
            {step === 3 && <ScreenThirdStep onDone={advanceStep}/>}
            <SoundTransmitter value={token} on={libquietLoaded && step === 1} profile={libquietProfile}/>
        </div>
    );
};