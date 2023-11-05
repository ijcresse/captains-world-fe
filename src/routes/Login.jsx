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
        axiosInstance.post("http://localho.st:5000/api/login", formData)
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
                        <TextField name="username" label="Username" variant="filled" onChange={handleInputChange} />
                        <TextField name="password" label="Password" variant="filled" onChange={handleInputChange} />
                    </FormControl>
                    <Button size="medium" color="primary" onClick={() => signIn()}>Sign In</Button>
                </CardActions>
            </Card>
        </Container>
    )
}

export default Login;