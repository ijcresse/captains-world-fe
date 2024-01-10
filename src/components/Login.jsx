//login route. No link provided, this is need to know only
import { useContext, useState } from 'react';
import { 
    Dialog,
    DialogContent, 
    DialogTitle,
    TextField,  
    Button,  
    FormControl
} from '@mui/material';
import { ServerContext } from '../context/ServerContext';
import { ToastContext } from '../context/ToastContext';
import './css/Login.css'

const post_headers = {
    'Content-Type': 'application/json',
}

function Login({open, handleClose}) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const { createToast } = useContext(ToastContext);
    const { serverOrigin, isAuthorized } = useContext(ServerContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    
    const signIn = (e) => {
        e.preventDefault();
        let req = new Request(`${serverOrigin}/api/user/login`, {
            method: 'post',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(formData),
            headers: post_headers
        });
        fetch(req)
            .then(res => {
                if (res.status === 401) {
                    createToast('Unrecognized credentials. Please try again', 'warning')
                } else {
                    createToast('Signed in!', 'success');
                }
            })
            .catch(err => {
                console.warn(err);
            })
            .finally(() => {
                setFormData({ username: "", password: ""});
            })
    }

    const verifySession = () => {
        let req = new Request(`${serverOrigin}/api/user/session`, {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        })
        fetch(req)
            .then(res => {
                if (res.status === 200) {
                    createToast('Valid session', 'success');
                } else if (res.status === 401) {
                    createToast('Invalid session', 'warning')
                }
            })
            .catch(err => {
                console.error(err)
                createToast('Something went wrong', 'error');
            })
    }

    const logout = () => {
        let req = new Request(`${serverOrigin}/api/user/logout`, {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        })
        fetch(req)
            .then(res => {
                createToast('Logged out', 'success');
            })
            .catch(err => {
                console.error(err)
                createToast('Something went wrong', 'error');
            })

    }

    return(
        <Dialog id="login-top" open={open} onClose={handleClose}>
            <DialogTitle>Please log in</DialogTitle>
            <DialogContent>
                <form onSubmit={e => signIn(e)} >
                    <FormControl>
                        <TextField 
                            name="username" 
                            label="Username" 
                            variant="filled" 
                            value={formData['username']} 
                            onChange={handleInputChange} 
                        />
                        <TextField 
                            name="password" 
                            label="Password" 
                            type="password" 
                            variant="filled" 
                            value={formData['password']} 
                            onChange={handleInputChange} 
                        />
                    </FormControl>
                    <Button type="submit" size="medium" color="primary" onClick={e => signIn(e)}>Sign In</Button>
                </form>
                <Button size="medium" color="secondary" onClick={() => verifySession()}>Verify Session</Button>
                <Button size="medium" color="warning" onClick={() => logout()}>Logout</Button>
            </DialogContent>
        </Dialog>
    )
}

export default Login;