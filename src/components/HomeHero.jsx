import { 
    Grid,
    Stack,
    Paper,
    Typography,
    Button
} from '@mui/material';
import { useNavigate } from 'react-router';
import './css/HomeHero.css';

export default function HomeHero() {
    const navigate = useNavigate();

    const reviewsLink = () => {
        navigate('/reviews');
    }

    const CardContent = (
        <Paper id="content-top" elevation={2}>
            <Grid id="content-order" className="height-inherit" container item xs={8} direction="column">
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
                <Button id="reviews-link" variant="contained" onClick={() => reviewsLink()}>
                    Reviews
                </Button>
            </Grid>
        </Paper>
    )

    return(
        <Grid id="home-hero-root" container direction="row">
            <Grid className="height-inherit" 
                    container direction="column" item xs={12} md={9}
                    justifyContent="center">
                <Grid className="height-inherit"
                        container direction="row" item md={8} xs={10}
                        justifyContent="center">
                    <Grid direction="column" container item md={8} >
                        { CardContent }
                    </Grid>
                </Grid>
            </Grid>
            {/* <div id="home-hero-image-container">
                img (z index needs to be below other areas)
            </div> */}
        </Grid>
    )
}