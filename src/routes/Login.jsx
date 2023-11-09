//login route. No link provided, this is need to know only
import { useState } from 'react';
import { Card, 
    CardContent, 
    TextField, 
    Typography, 
    Container, 
    Button, 
    CardActions, 
    FormControl 
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
        </Container>
    )
}

export default Login;