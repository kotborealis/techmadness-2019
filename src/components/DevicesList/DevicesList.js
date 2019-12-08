import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeviceUnknownIcon from '@material-ui/icons/DeviceUnknown';
import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export const DevicesList = ({}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <DeviceUnknownIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Samsung A50"/>
                </ListItem>
                <Divider/>
                <ListItem button>
                    <ListItemText primary="Добавить новое устройство"/>
                </ListItem>
            </List>
        </div>
    );
};