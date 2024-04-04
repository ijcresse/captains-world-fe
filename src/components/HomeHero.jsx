import { 
    Grid,
    Paper,
    Typography,
    Button
} from '@mui/material';

import './css/HomeHero.css';

export default function HomeHero() {

    return(
        <Grid id="home-hero-root" container direction="row">
            <Grid className="grid-top height-inherit" 
                    container direction="column" item xs={9}
                    justifyContent="center">
                <Grid className="height-inherit"
                        container direction="row" item xs={8}
                        justifyContent="center">
                    <Grid direction="column" item xs={8} >
                        <Paper className="content-top">
                            main content for material
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            {/* <Grid id="home-hero-image-container">
                img (z index needs to be below other areas)
            </Grid> */}
        </Grid>
    )
}