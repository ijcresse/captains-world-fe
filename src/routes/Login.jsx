//login route. No link provided, this is need to know only
import { useContext, useState } from 'react';
import { Card, 
    CardContent, 
    TextField, 
    Typography, 
    Container, 
    Button, 
    CardActions, 
    FormControl 
} from '@mui/material';
import { RootContext } from './Root';
import './css/Login.css'

const post_headers = {
    'Content-Type': 'application/json',
}

function Login() {
    const axiosInstance = useContext(RootContext)
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
        console.log(formData);

        axiosInstance.get("http://localhost:5000/api/health")
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            })
        axiosInstance.post("http://localhost:5000/api/user/login", formData, { headers: post_headers })
            .then(res => {
                console.log(res)
                //set cookie
                //redirect to admin page (let's use post as default for now)
            })
            .catch(err => {
                console.error(err)
                //create error toast
            })
            .finally(() => {
                setFormData({username: "", password: ""})
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