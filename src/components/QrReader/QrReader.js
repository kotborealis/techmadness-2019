import React from 'react';
import QrScanner from 'react-qr-reader';

export const QrReader =
    ({
         active = true,
         delay = 100,
         onResult = () => 0,
         onError = () => 0,
         style = {},
         className = "",
         previewStyle = {},
         previewClassName = "",
     }) => {

        const dataHandler = (data) => {
            onResult(data);
        };

        const errorHandler = (error) => {
            console.error("QrReader.js", "errorHandler", error);
            onError(error);
        };

        return (
            <div style={style} className={className}>
                <QrScanner
                    style={previewStyle}
                    className={previewClassName}
                    onScan={dataHandler}
                    onError={errorHandler}
                    onLoad={() => false}
                    facingMode={"environment"}
                    delay={delay}
                    legacyMode={false}
                />
            </div>
        );
    };