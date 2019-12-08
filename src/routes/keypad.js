import React from 'react';
import {KeyPad} from '../components/KeyPad/KeyPad';
import RosbankLogo from '../assets/rosbank-logo.png';

export const KeypadPage = (props) =>
    <div style={{
        padding: '20px',
        background: `linear-gradient(180deg, #DD2626 0%, #3D2C36 100%)`,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
    }}>
        <img src={RosbankLogo} width={"100%"} height={"auto"} style={{marginBottom: "100px"}}/>
        <KeyPad {...props}/>
    </div>;