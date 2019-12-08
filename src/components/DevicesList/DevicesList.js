import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 32,
    },
    pos: {
        marginBottom: 12,
    },
}));

export const DevicesList = ({}) => {
    const classes = useStyles();


    return (
        <Grid container className={classes.root}>
            <Grid item xs={4} spacing={5}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Samsung A50
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Отвязать</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={4} style={{marginLeft: '20px'}}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Добавить...
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Добавить</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
};