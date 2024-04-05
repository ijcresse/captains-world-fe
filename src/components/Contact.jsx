import {
    Grid,
    Typography,
    Button
} from '@mui/material';

import './css/Contact.css';

export default function Contact() {

    const emailCaptain = () => {
        window.location = 'mailto:reinsch0079@gmail.com';
    }

    return(
        <Grid id="contact-root" container direction="row" justifyContent="center">
            <Grid container direction="column" item md={3} justifyContent="center">
                <Grid container direction="row" item md={6} justifyContent="center">
                    <Grid container direction="column" item md={9} justifyContent="center">
                        <Typography variant="body1">
                            Have a question or comment?
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container direction="column" item md={3} justifyContent="center">
                <Grid container direction="row" item md={6} justifyContent="center">
                    <Grid container direction="column" item md={9} justifyContent="center">
                        <Button variant="outlined" onClick={() => emailCaptain()}>
                            email me
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}