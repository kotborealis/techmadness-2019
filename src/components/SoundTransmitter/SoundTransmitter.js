import React, {useEffect, useRef} from 'react';
const Quiet = require('quietjs-bundle');

export const SoundTransmitter =
    ({
         on = false,
         value = "",
         delay = 100,
         profile = "ultrasonic-experimental"
     }) => {
        const transmit = useRef(null);

        const onTransmitFinish = (immediate = false) => {
            if(!on) return;
            console.log("onTransmitFinish", immediate);
            setTimeout(() => {
                console.log("new transmit", value);
                if(!transmit.current || !value)
                    return onTransmitFinish();

                transmit.current.transmit(Quiet.str2ab(value));
            }, immediate ? 0 : delay);
        };

        useEffect(() => {
            if(!on) return;
            console.log("Init transmit");
            transmit.current = Quiet.transmitter({
                profile,
                onFinish: onTransmitFinish,
                clampFrame: false
            });

            onTransmitFinish(true);
        }, [profile, delay, on]);

        return <></>;
    };