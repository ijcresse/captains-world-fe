import {
    Grid,
    Stack,
    Typography,
    Paper,
} from '@mui/material';

import './css/About.css';

const aboutText = `
Doloribus dolorum fugit qui provident eos qui vitae. 
Fugit ea nulla odit velit dolorem quis at. 
Quae itaque non suscipit molestiae facilis ab tenetur. 
Magnam ex nulla accusamus animi est illo. 
Voluptatem molestiae sit totam atque voluptas debitis in temporibus. 
Ad nihil quod itaque eum sapiente.`;

export default function About() {

    return(
        <Grid id="about-root" container direction="row">
            <Grid className="height-inherit" container direction="column" item md={6} xs={12} justifyContent="center">
                <Grid container direction="row" item md={8} xs={8} justifyContent="center">
                    <Grid container item md={2} />
                    <Grid container direction="column" item md={8} justifyContent="center">
                        <Paper id="about-content-top" elevation={2} square>
                            <Grid id="about-content" className="height-inherit" container direction="column" item xs={10}>
                                <Stack>
                                    <Typography variant="subtitle2">
                                        Meet the somme:
                                    </Typography>
                                    <Typography variant="h3">
                                        HOLLY REINSCH
                                    </Typography>
                                </Stack>
                                <Paper elevation={0}>
                                    <Typography variant="body1">
                                        {aboutText}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Paper>
                    </Grid>
                    
                </Grid>
            </Grid>
            <Grid container direction="column" item md={6} xs={12} justifyContent="center">
                <Grid container direction="row" item md={6} xs={12} justifyContent="center">
                    <div id="image-cropper">
                        <img id="about-image" src={'../../contact.png'} className="rounded" />
                    </div>
                    <Grid container item md={2} />
                </Grid>
            </Grid>
        </Grid>
    )
}