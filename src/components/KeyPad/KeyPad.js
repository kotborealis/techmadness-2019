import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function generatePinInput(pin, initial, error) {
    const line = [];

    for(let i = 0; i < pin.length; i++)
        line.push(
            <Grid item xs={3} alignItems="center" justify="center" style={{textAlign: "center"}}>
                <IconButton aria-label="pin" style={{color: !initial && error ? '#ff0000' : '#ffffff'}}>
                    {pin[i]}
                </IconButton>
            </Grid>
        );

    if(line.length === 0) line.push(
        <Grid item xs={3} alignItems="center" justify="center" style={{textAlign: "center"}}>
            <IconButton aria-label="pin" style={{color: !initial && error ? '#482b35' : '#ffffff'}}>
                &nbsp;
            </IconButton>
        </Grid>
    );

    return <Grid container
                 direction="row"
                 alignItems="center"
                 justify="center">
        {line}
    </Grid>;
}

function generateKeypadButtons(pinHandler) {
    const table = [];
    for(let i = 0; i < 3; i++){
        const line = [];
        for(let j = 0; j < 3; j++){
            const value = i * 3 + j + 1;
            line.push(
                <Grid item xs={4} alignItems="center" justify="center" style={{textAlign: "center"}}>
                    <IconButton onClick={() => pinHandler(value)} aria-label="pin"
                                style={{color: '#ffffff'}}>
                        {value}
                    </IconButton>
                </Grid>
            );
        }
        table.push(
            <Grid container
                  direction="row"
                  alignItems="center"
                  justify="center">
                {line}
            </Grid>
        );
    }
    return table;
}

export const KeyPad = ({initial = false}) => {
    const [error, setError] = useState(false);
    const [pin, setPin] = useState([]);

    const pinHandler = (value) => {
        const newPin = [...pin, value];

        if(newPin.length === 4){
            setError(true);
            setPin(newPin);
            if(initial === true){
                setTimeout(() => window.location = '/keypad', 500);
            }
        }
        else{
            setError(false);
            if(newPin.length > 4)
                setPin([value]);
            else
                setPin(newPin);
        }
    };

    return (
        <Grid container direction="column"
              justify="center"
              alignItems="center">
            <Grid container
                  direction="column"
                  justify="center"
                  alignItems="center"
            >
                <Grid container
                      justify="center"
                      alignItems="center"
                >
                    <Typography variant="h5" style={{color: '#fff'}}>
                        {initial ? "Задайте пинкод:" : "Введите пинкод:"}
                    </Typography>
                </Grid>
                {generatePinInput(pin, initial, error)}
                {generateKeypadButtons(pinHandler)}
            </Grid>
            <br/>
            <Grid container
                  direction="column"
                  justify="center"
                  alignItems="center"
            >
                {!initial && <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        style={{
                            color: 'white',
                            borderColor: 'white'
                        }}
                        onClick={() => void (window.location = '/mobile')}
                    >Забыли пинкод? :(</Button>
                </Grid>}
            </Grid>
        </Grid>
    );
};