//takes info for a single review and returns a card containing that information (and link to the dedicated review)
//used on the Reviews page.
import { useState, useEffect } from 'react'
import Card from '@mui/material/Card';

import './css/ReviewCard.css'

const ReviewCard = ({reviewInfo}) => {
    const [date, setDate] = useState({'year': '', 'season': ''});

    //this should be a helper function somewhere else. so Review (1) can access this logic too.
    useEffect(() => {
        //attempt to construct normal date object
        var d = new Date(reviewInfo['c_date_crafted']);
        var season = ""
        const month = d.getMonth()
        if (2 <= month && month < 5) {
            season = "Spring"
        } else if (5 <= month && month < 8) {
            season = "Summer"
        } else if (8 <= month && month < 11) {
            season = "Fall"
        } else if (11 <= month || month < 2) {
            season = "Winter"
        } else {
            season = "" //something went wrong
        }
        setDate({'year': d.getFullYear(), 'season': season})
    }, [reviewInfo])
    
    return(
        <Card className="review-card-top">
            <div className="review-card-text">
                <div className="review-card-title"><h3>{reviewInfo['c_name']}</h3></div>
                <div className="review-card-subtitle">
                    <div className="review-card-month">{date['season']}</div>
                    <div className="review-card-year">{date['year']}</div>
                </div>
            </div>
            <div className="review-card-image">
                <img src={`${import.meta.env.VITE_IMAGES_DIR}/${reviewInfo['c_image_url']}`} />
            </div>
        </Card>
    )
}

export default ReviewCard;