import React from 'react';
import QrCode from 'qrcode.react';

export const QrViewer = ({value, style = {}, className = ""}) =>
    <QrCode value={value} style={style} className={className}/>;