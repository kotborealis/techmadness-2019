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
import ScreenPicture1 from '../assets/1.jpg';
import ScreenPicture2 from '../assets/2.jpg';
import ScreenPicture3 from '../assets/3.jpg';
import Zoom from '@material-ui/core/Zoom';

const ScreenFirstStep = ({onDone}) => <RosbankDesktopMockup
    onClick={onDone}
    step={1}
    totalSteps={4}
    title={"Ознакомьтесь с условиями использования"}
    picture={<img src={ScreenPicture1} style={{width: '100%'}}/>}
>
    <Button variant="outlined" color="primary" size="large" style={{margin: '50px 10px', fontSize: '1.5rem'}}>
        Я согласен с условиями
    </Button>
</RosbankDesktopMockup>;

const ScreenCodeStep = ({token, tokenLoading, libquietLoaded, libquietProfile, step, onDone}) =>
    <RosbankDesktopMockup
        onClick={onDone}
        step={2}
        totalSteps={4}
        title={"Добавление устройства"}
        picture={
            <>
                {!token && tokenLoading && <CircularProgress/>}
                {token && <>
                    <Zoom in={token && !tokenLoading}>
                        <QrViewer value={token} style={{width: '360px', height: 'auto'}}/>
                    </Zoom>
                    <Typography variant="h2" style={{textAlign: 'center', verticalAlign: 'center'}}>
                        <SpeakerPhoneIcon style={{fontSize: "4.5rem"}}/>
                        <span style={{verticalAlign: 'middle'}}>
                            {token ? token.slice(0, 6) : ''}
                        </span>
                    </Typography>
                </>}
            </>
        }
    >
        {!token && tokenLoading && <CircularProgress/>}
        {token && <ScreenCode {...{token, libquietLoaded, libquietProfile, step}}/>}
    </RosbankDesktopMockup>;

const ScreenSecondStep = ({approveCode, onDone}) => <RosbankDesktopMockup
    onClick={onDone}
    step={3}
    totalSteps={4}
    title={"Для завершения регистрации подпишите сертификат"}
    picture={<img src={ScreenPicture3} style={{width: '100%'}}/>}
>
    <Typography variant="h3">
        <br/>
        Проверьте, что код на устройстве совпадает с отображаемым:
        <br/>
        <br/>
    </Typography>
    <Typography variant="h2">{approveCode}</Typography>
    <div style={{margin: '20px 10px'}}>
        <Button variant="outlined" color="primary" size="large" style={{margin: '0 10px', fontSize: '1.5rem'}}>
            Подписать сертификат
        </Button>
        <Button variant="outlined" color="secondary" size="large" style={{margin: '0 10px', fontSize: '1.5rem'}}>
            Отменить
        </Button>
    </div>
</RosbankDesktopMockup>;


const ScreenThirdStep = ({onDone}) => <RosbankDesktopMockup
    onClick={onDone}
    step={4}
    totalSteps={4}
    title={"Вы успешно подключились! Пользуйтесь банком вне офиса."}
    picture={<img src={ScreenPicture2} style={{width: '100%'}}/>}
>
    <Typography variant="h3">Подключённые устройства:</Typography>
    <br/>
    <DevicesList/>
</RosbankDesktopMockup>;

const AuthDescription = ({}) =>
    <Typography variant="h3">
        Используйте <nobr><MicIcon/> микрофон</nobr> или <nobr><CameraIcon/> камеру</nobr> Вашего устройства для
        авторизации
    </Typography>;

const ScreenCode = () =>
    <Typography variant="h3">
        <Typography variant="h3">
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
            setStore(state => void (state.approveCode === null ? state.approveCode = data.code : undefined));
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