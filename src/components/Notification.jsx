import React, { useState } from 'react';
import {
    Container,
    Snackbar,
    Alert
} from '@mui/material';

/*
stub - belongs at top level in Root
*/
const Notification = () => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState('success');

    const handleClose = () => {
        setShowToast(false);
    }

    return (
        <Container>
            <Snackbar open={showToast} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={toastSeverity}>
                    {toastMessage}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default Notification;