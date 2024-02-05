//Allows viewing a particular review. Coordinates with EditReview for logged in users.
//Child component of the Review route
import {
    Typography
} from '@mui/material';

import './css/ViewReview.css';

export default function ViewReview({ reviewData, imgData }) {
    
    //prioritizes newly uploaded image, then current image, and blank if empty.
    const ImageDisplay = () => {
        if (imgData.length === 1) { //imgData should never be larger than 1
            return (<img className="view-review-image" src={imgData[0].preview} />)
        } else if (reviewData['c_image_url']) {
            return (<img className="view-review-image" src={`${import.meta.env.VITE_IMAGES_DIR}/${reviewData['c_image_url']}`} />)
        } else {
            return (<div className="view-review-image">No Image</div>)
        }
    }

    return (
        <div className="view-review-top">
            <div className="view-review-image-container">
                <ImageDisplay />
            </div>
            <div className="view-review-metadata">
                <Typography className="view-review-name" variant="h4" sx={{margin: '1em'}}>{reviewData['c_name']}</Typography>
                <Typography className="view-review-type" variant="subtitle1" sx={{margin: '1em'}}>{reviewData['c_sake_type']}</Typography>
                <Typography className="view-review-enjoyed" variant="subtitle1" sx={{margin: '1em'}}>{reviewData['c_date_enjoyed']}</Typography>
                <Typography className="view-review-desc" variant="body1" sx={{margin: '1em'}}>{reviewData['c_description']}</Typography>
                
            </div>
        </div>
    )
}