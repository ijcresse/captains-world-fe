import React, { useContext } from 'react';
import {
    Container,
    Snackbar,
    Alert
} from '@mui/material';
import { ToastContext } from '../context/ToastContext';

/*
stub - belongs at top level in Root
*/
const Notification = () => {
    const { message, severity, show, closeToast } = useContext(ToastContext);

    return (
        <Container>
            <Snackbar open={show} autoHideDuration={6000} onClose={closeToast}>
                <Alert onClose={closeToast} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default Notification;