import { createContext, useState } from 'react';

const ToastContext = createContext(null);

function ToastProvider({children}) {
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [show, setShow] = useState(false);

    function createToast(message, severity) {
        setShow(true);
        setMessage(message);
        setSeverity(severity);
    }

    function closeToast() {
        setShow(false);
    }

    const values = {
        message, severity, show, createToast, closeToast
    }

    return (
        <ToastContext.Provider value={values}>
            {children}
        </ToastContext.Provider>
    )
}

export { ToastContext, ToastProvider }