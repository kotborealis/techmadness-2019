import React, {useEffect, useRef} from 'react';

const Quiet = require('quietjs-bundle');

export const SoundTransmitter =
    ({
         on = false,
         value = "",
         delay = 250,
         profile = "ultrasonic-experimental"
     }) => {
        const transmit = useRef(null);
        const data = useRef("");

        const onTransmitFinish = (immediate = false) => {
            if(!on) return;

            setTimeout(() => {
                if(!transmit.current || !data.current)
                    return onTransmitFinish();

                transmit.current.transmit(Quiet.str2ab(data.current));
            }, immediate ? 0 : delay);
        };

        useEffect(() => {
            data.current = value;
        }, [value]);

        useEffect(() => {
            if(!on) return;

            transmit.current = Quiet.transmitter({
                profile,
                onFinish: onTransmitFinish,
                clampFrame: false
            });

            onTransmitFinish(true);
        }, [profile, delay, on]);

        return <></>;
    };