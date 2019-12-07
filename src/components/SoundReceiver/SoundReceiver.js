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

            quiet.receiver({
                profile,
                onReceive: (data) =>
                    handler.current(quiet.ab2str(data))
            });
        }, [onData, on, profile]);

        return <></>;
    };