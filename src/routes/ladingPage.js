import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

export const LandingPage = ({}) => <Paper style={{padding: '20px'}}>
    <Grid container
          direction="column"
          alignItems="center"
          justify="center">
        <Typography>
            <Link href={"/desktop"}>Десктоп</Link>
            <br/>
            <Link href={"/mobile"}>Мобила</Link>
        </Typography>
    </Grid>
</Paper>;