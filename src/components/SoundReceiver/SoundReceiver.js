import React, {useEffect, useRef} from 'react';

const quiet = require('quietjs-bundle');

export const SoundReceiver =
    ({
         on = false,
         onData = () => 0,
         profile = 'ultrasonic-experimental'
     }) => {

        const handler = useRef(() => 0);

        useEffect(() => {
            handler.current = onData;

            if(!on) return;

            console.log("SETUP RECIEVER");

            quiet.receiver({
                profile,
                onReceive: (data) => handler.current(quiet.ab2str(data)),
                onCreateFail: (...args) => console.log("failed to create receiver", ...args),
                onReceiveFail: (...args) => console.log("receiver error", ...args),
            });
        }, [onData, on, profile]);

        return <></>;
    };