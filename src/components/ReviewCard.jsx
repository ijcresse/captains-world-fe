//takes info for a single review and returns a card containing that information (and link to the dedicated review)
//used on the Reviews page.
import { useContext } from 'react';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

import { ServerContext } from '../context/ServerContext';
import './css/ReviewCard.css'

const ReviewCard = ({reviewInfo, isAuthorized}) => {
    const handleDelete = () => {
        console.log('attempting to delete review with id', reviewId);
    }

    //sketched out for later task
    const adminRow = (
        <div className="review-card-admin-row">
            <DeleteIcon onClick={handleDelete} />
        </div>
    )

    const newCard = (
        <Card className="review-card-top">
            <div className="review-card-image">
                <AddCircleOutlineIcon />
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
                    <div className="review-card-image">
                        {reviewInfo['c_image_url'] ? <img src={`${import.meta.env.VITE_IMAGES_DIR}/${reviewInfo['c_image_url']}`} /> : <>No Image</>}
                    </div>
                    <div className="review-card-text">
                        <div className="review-card-title">
                            <Typography variant="h5">
                                {reviewInfo['c_name']}
                            </Typography>
                        </div>
                    </div>
                </Card> 
                :
                newCard
            }
        </div>


    )
}

export default ReviewCard;