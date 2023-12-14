//Allows viewing a particular review. Coordinates with EditReview for logged in users.
//Child component of the Review route
import {
    Typography,
    Box
} from '@mui/material';

import './css/ViewReview.css';

export default function ViewReview({ reviewData, imgData }) {
    
    //prioritizes newly uploaded image, then current image, and blank if empty.
    const ImageDisplay = () => {
        if (imgData.length === 1) { //imgData should never be larger than 1
            return (<img src={imgData[0].preview} />)
        } else if (reviewData['c_image_url'] !== '') {
            return (<img src={`${import.meta.env.VITE_IMAGES_DIR}/${reviewData['c_image_url']}`} />)
        } else {
            return (<div>img placeholder</div>)
        }
    }

    return (
        <div className="view-review-top">
            <Box className="view-review-image">
                <ImageDisplay />
            </Box>
            <Box className="view-review-metadata">
                <Typography className="view-review-name" variant="h4">{reviewData['c_name']}</Typography>
                <Typography className="view-review-type" variant="subtitle1">{reviewData['c_sake_type']}</Typography>
                <Typography className="view-review-enjoyed" variant="subtitle1">{reviewData['c_date_enjoyed']}</Typography>
                <Typography className="view-review-desc" variant="body1">{reviewData['c_desc']}</Typography>
            </Box>
        </div>
    )
}