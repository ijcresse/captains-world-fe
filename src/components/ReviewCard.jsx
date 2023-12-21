//takes info for a single review and returns a card containing that information (and link to the dedicated review)
//used on the Reviews page.
import Card from '@mui/material/Card';

import './css/ReviewCard.css'

const ReviewCard = ({reviewInfo}) => {
    return(
        <Card className="review-card-top">
            <div className="review-card-text">
                <div className="review-card-title"><h3>{reviewInfo['c_name']}</h3></div>
            </div>
            <div className="review-card-image">
                {reviewInfo['c_image_url'] ? <img src={`${import.meta.env.VITE_IMAGES_DIR}/${reviewInfo['c_image_url']}`} /> : <>No Image</>}
            </div>
        </Card>
    )
}

export default ReviewCard;