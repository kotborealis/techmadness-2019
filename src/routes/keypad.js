import React from 'react';
import {KeyPad} from '../components/KeyPad/KeyPad';

export const KeypadPage = ({}) =>
    <div style={{
        padding: '20px',
        background: `linear-gradient(180deg, #DD2626 0%, #3D2C36 100%)`,
        minHeight: '100vh',
        display: 'flex',
    }}>
        <KeyPad/>
    </div>;