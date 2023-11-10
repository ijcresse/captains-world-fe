//login route. No link provided, this is need to know only
import { useState } from 'react';
import { Card, 
    CardContent, 
    TextField, 
    Typography, 
    Container, 
    Button, 
    CardActions, 
    FormControl,
    Snackbar,
    Alert
} from '@mui/material';
import './css/Login.css'


const post_headers = {
    'Content-Type': 'application/json',
}

function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState('success');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const signIn = () => {
        let req = new Request("http://localhost:5000/api/user/login", {
            method: 'post',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(formData),
            headers: post_headers
        });
        fetch(req)
            .then(res => {
                res.headers.forEach((val, key) => {
                    console.log(key, val);
                })
            })
            .catch(err => {
                console.warn(err);
            })
    }

    const verifySession = () => {
        let req = new Request('http://localhost:5000/api/user/session', {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        })
        fetch(req)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    setToastMessage('valid session')
                    setToastSeverity('success')
                } else if (res.status === 401) {
                    setToastMessage('invalid session')
                    setToastSeverity('warning')
                }
            })
            .catch(err => {
                console.error(err)
                setToastMessage('something went wrong with verifying session')
                setToastSeverity('error')
            })
            .finally(() => {
                setShowToast(true)
            })
    }

    const logout = () => {
        let req = new Request('http://localhost:5000/api/user/logout', {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        })
        fetch(req)
            .then(res => {
                console.log(res)
                setToastMessage('logged out')
                setToastSeverity('success')
            })
            .catch(err => {
                console.error(err)
                setToastMessage('something went wrong with logging out')
                setToastSeverity('error')
            })
            .finally(() => {
                setShowToast(true)
            })

    }

    const handleClose = () => {
        setShowToast(false)
    }

    return(
        <Container id="login-top">
            <Card id="login-panel">
                <CardContent id="login-header">
                    <Typography variant="h4">Please log in:</Typography>
                </CardContent>
                <CardActions id="login-form">
                    <FormControl>
                        <TextField name="username" label="Username" variant="filled" value={formData['username']} onChange={handleInputChange} />
                        <TextField name="password" label="Password" variant="filled" value={formData['password']} onChange={handleInputChange} />
                    </FormControl>
                    <Button size="medium" color="primary" onClick={() => signIn()}>Sign In</Button>
                </CardActions>
            </Card>
            <Button size="medium" color="secondary" onClick={() => verifySession()}>Verify Session</Button>
            <Button size="medium" color="warning" onClick={() => logout()}>Logout</Button>
            <Snackbar open={showToast} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={toastSeverity}>
                    {toastMessage}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default Login;