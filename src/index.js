import React, {useEffect} from 'react';
import {render} from 'react-dom';
import "!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {MobileApp} from './routes/mobileApp';
import Container from '@material-ui/core/Container';
import {DesktopApp} from './routes/desktopApp';
import {LandingPage} from './routes/ladingPage';
import {useStore} from './store/store';
import 'libfec';

const quiet = require('quietjs-bundle');

const App = ({}) => {
    const setStore = useStore(state => state.set);

    // load libquiet
    useEffect(() => {
        quiet.addReadyCallback(() => {
            console.log("libquiet ready!");
            setStore(state => void (state.libquietLoading = false));
        });

        window.setQuietProfile = (profile) => setStore(state => void (state.libquietProfile = profile));
    }, []);

    return (
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
        </Container>
    );
};

render(
    <App/>,
    document.getElementById('App')
);