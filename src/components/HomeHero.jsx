import { 
    Grid,
    Stack,
    Paper,
    Typography,
    Button
} from '@mui/material';
import { useNavigate } from 'react-router';

import Logo from './Logo';
import './css/HomeHero.css';

export default function HomeHero() {
    const navigate = useNavigate();

    const reviewsLink = () => {
        navigate('/reviews');
    }

    const CardContent = (
        <Paper id="content-top" elevation={2} square>
            <Grid id="content-spacing" container item xs={12} direction="column" justifyContent="space-evenly">
                <Stack>
                    <Typography variant="h3">
                        Captain's World
                    </Typography>
                    <Stack>
                        <Typography variant="subtitle2">
                            Reviews and musings by Holly Reinsch,
                        </Typography>
                        <Typography variant="subtitle2">
                            Sake sommelier
                        </Typography>
                    </Stack>
                </Stack>
                <Button id="reviews-link" variant="contained" onClick={() => reviewsLink()}>
                    Reviews
                </Button>
            </Grid>
        </Paper>
    )

    return(
        <Grid id="home-hero-root" container direction="row">
            <Grid container direction="column" item md={8} xs={12} 
                    justifyContent="center">
                <Grid container direction="row" item md={8} xs={5}
                        justifyContent="center">
                    <Grid direction="column" container item md={8} >
                        { CardContent }
                    </Grid>
                </Grid>
                <Grid container item md={1} xs={5} />
            </Grid>
            <Logo />
            <img id="bg-texture" src={'../../cypress.png'} />
        </Grid>
    )
}