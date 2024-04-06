//Allows viewing a particular review. Coordinates with EditReview for logged in users.
//Child component of the Review route
import {
    Grid,
    Typography,
    Divider
} from '@mui/material';

import './css/ViewReview.css';
import Tags, { importTags } from './Tags';
import { sakeTypesMap } from '../util/strings.js';

/**
 * 
 * @param reviewData metadata for an existing review
 * @param masterTags authoritative list of tags for this review
 * @param imgData the image data uploaded during this session. used during editing review process
 */
export default function ViewReview({ reviewData, masterTags, imgData }) {
    //prioritizes newly uploaded image, then current image, and blank if empty.
    const ImageDisplay = () => {
        if (imgData.length === 1) { //imgData should never be larger than 1
            return (<img id="view-review-image" src={imgData[0].preview} />)
        } else if (reviewData['c_image_url']) {
            return (<img id="view-review-image" src={`${import.meta.env.VITE_IMAGES_DIR}/${reviewData['c_image_url']}`} />)
        } else {
            return (<div id="view-review-image">No Image</div>)
        }
    }

    return (
        <Grid id="view-review-top" container direction="row" justifyContent="space-evenly">
            <Grid container direction="column" item md={5} justifyContent="center">
                <Grid id="view-review-image-container" container direction="row" item xs={9} justifyContent="center">
                    <ImageDisplay />
                </Grid>
            </Grid>
            <Grid container direction="column" item md={5} justifyContent="center">
                <Grid container direction="column" item xs={9} justifyContent="center">
                    <Grid container item md={3} direction="row" justifyContent="center">
                        <Grid container item xs={10} direction="column" justifyContent="center">
                            <Typography className="view-review-text" variant="h3" >{reviewData['c_name']}</Typography>
                            <Typography className="view-review-text" variant="subtitle2" >{sakeTypesMap[reviewData['c_sake_type']]}</Typography>
                            <Typography className="view-review-text" variant="subtitle2" >{reviewData['c_date_enjoyed']}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container item md={3} justifyContent="center">
                        <Grid container item xs={10} direction="column" justifyContent="flex-start">
                            <Typography className="view-review-text" variant="body1" >{reviewData['c_description']}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container item md={3} justifyContent="center">
                        <Grid container item xs={10} direction="column" justifyContent="flex-start">
                            <Tags tags={importTags(masterTags)} readOnly={true} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}