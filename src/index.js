import React from 'react';
import {render} from 'react-dom';
import "!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {MobileApp} from './routes/mobileApp';
import Container from '@material-ui/core/Container';
import {DesktopApp} from './routes/desktopApp';
import {LandingPage} from './routes/ladingPage';

render(
    <Container>
        <BrowserRouter basename={process.env.PUBLIC_PATH}>
            <Switch>
                <Route exact path="/">
                    <LandingPage/>
                </Route>
                <Route path="/mobile">
                    <MobileApp/>
                </Route>
                <Route path="/desktop">
                    <DesktopApp/>
                </Route>
            </Switch>
        </BrowserRouter>
    </Container>,
    document.getElementById('App')
);