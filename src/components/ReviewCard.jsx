//takes info for a single review and returns a card containing that information (and link to the dedicated review)
//used on the Reviews page.
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

import './css/ReviewCard.css'

const ReviewCard = ({reviewInfo, isAuthorized}) => {
    const handleDelete = () => {
        console.log('attempting to delete review with id', reviewId);
    }

    //sketched out for later task
    //consider moving this adminRow to _specifically_ the adminReviews page.
    const adminRow = (
        <div className="review-card-admin-row">
            <DeleteIcon onClick={handleDelete} />
        </div>
    )

    const newCard = (
        <Card className="review-card-top">
            <div className="review-card-image-container">
                <AddCircleOutlineIcon className="review-card-image" />
            </div>
            <div className="review-card-text">
                <div className="review-card-title">
                    <Typography variant="h5">
                        New
                    </Typography>
                </div>
            </div>
        </Card>
    )

    return(
        <div>
            {/* {isAuthorized ? adminRow : <></>} */}
            {reviewInfo ? 
                <Card className="review-card-top">
                    <Grid className="height-inherit" container direction="column" justifyContent="space-between">
                        <Grid className="review-card-image-container" container item xs={6} direction="row" >
                            {reviewInfo['c_image_url'] ? 
                                <img className="review-card-image" 
                                        src={`${import.meta.env.VITE_IMAGES_DIR}/${reviewInfo['c_image_url']}`} /> : 
                                <div className="review-card-image" >
                                    No Image
                                </div>
                            }
                        </Grid>
                        <Grid className="review-card-text" container item xs={4} direction="column" justifyContent="flex-end">
                            <div className="review-card-title">
                                <Typography variant="h5">
                                    {reviewInfo['c_name']}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Card> 
                :
                newCard
            }
        </div>
    )
}

export default ReviewCard;