import React from 'react';
import Grid from '@material-ui/core/Grid';
import RosbankLogo from '../assets/rosbank-logo-2.png';
import Typography from '@material-ui/core/Typography';

export const RosbankDesktopMockup = ({title, step, totalSteps, children, picture = null, ...props}) =>
    <div {...props}>
        <Grid container style={{padding: '20px'}}>
            <Grid container direction="row">
                <Grid item xs={2}>
                    <img src={RosbankLogo} width={200}/>
                </Grid>
                <Grid item xs={2} verticalAlignment={"center"}>
                    <br/>вместе<br/>мы сильнее
                </Grid>
            </Grid>
            <Grid container direction="row" style={{background: '#F1F1F1', color: '#000000', padding: '20px 100px'}}>
                <Grid item xs={1}>Главная</Grid>
                <Grid item xs={1}>Выписки</Grid>
                <Grid item xs={1}>Платежи</Grid>
                <Grid item xs={1}>Валюта</Grid>
                <Grid item xs={1}>Зарптала</Grid>
                <Grid item xs={1}>Кредиты</Grid>
                <Grid item xs={1}>Депозиты</Grid>
                <Grid item xs={1}>Сообщения</Grid>
                <Grid item xs={1}>Администрирования</Grid>
            </Grid>
            <Grid item style={{padding: '40px', color: '#727272'}} xs={12}>
                <u>Главная</u> // <u>Настройки</u> // <u>Мобильный Банк</u> // <span style={{color: '#000'}}>Подключение мобильного устройства</span>
            </Grid>
            <Grid item style={{padding: '10px 40px'}} xs={12}>
                <Typography variant="h5">Подключение мобильного устройства</Typography>
            </Grid>
            <Grid item style={{background: '#f1f1f1', margin: '10px 40px', padding: '50px'}} xs={12}>
                <Grid container direction="row">
                    <Grid item xs={8}>
                        <Grid container direction="column">
                            <Grid item xs={12}>
                                <Typography variant="h5"
                                            style={{color: "#727272"}}>Шаг {step} из {totalSteps}</Typography>
                                <br/>
                                <br/>
                                <Typography variant="h2">{title}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {children}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        {picture}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </div>;