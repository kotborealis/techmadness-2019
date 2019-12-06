import React from 'react';
import QrCode from 'qrcode.react';

export const QrViewer = ({value, style = {}, className = ""}) =>
    <div style={style} className={className}>
        <QrCode value={value}/>
    </div>;