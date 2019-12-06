import React from 'react';
import QrScanner from 'react-qr-scanner';

export const QrReader =
({
     delay = 100,
     onResult = () => 0,
     onError = () => 0,
     style = {},
     className = "",
     previewStyle = {},
     previewClassName = {}
 }) => {

    const dataHandler = (data) => {
        console.info("QrReader.js", "dataHandler", data);
    };

    const errorHandler = (error) => {
        console.error("QrReader.js", "errorHandler", error);
        onError(error);
    };

    return (
        <div style={style} className={className}>
            <QrScanner
                delay={delay}
                style={previewStyle}
                className={previewClassName}
                onError={errorHandler}
                onScan={dataHandler}
            />
        </div>
    );
};