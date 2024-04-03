//login route. No link provided, this is need to know only
import { useContext, useState } from 'react';
import { 
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

function Login({handleClose}) {
    const { serverOrigin } = useContext(ServerContext);
    const { createToast } = useContext(ToastContext);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

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
                    handleClose();
                }
            })
            .catch(err => {
                console.warn(err);
            })
            .finally(() => {
                setFormData({ username: "", password: ""});
            });
    }

    return(
        <div id="login-root">
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
            
        </div>
    )
}

export default Login;