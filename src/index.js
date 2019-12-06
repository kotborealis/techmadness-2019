import React from 'react';
import {render} from 'react-dom';
import "!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {RouteReader} from './routes/reader';
import Container from '@material-ui/core/Container';
import {RouteGenerate} from './routes/generate';

render(
    <Container>
        <BrowserRouter basename={process.env.PUBLIC_PATH}>
            <Switch>
                <Route path="/reader">
                    <RouteReader/>
                </Route>
                <Route path="/generate">
                    <RouteGenerate/>
                </Route>
            </Switch>
        </BrowserRouter>
    </Container>,
    document.getElementById('App')
);