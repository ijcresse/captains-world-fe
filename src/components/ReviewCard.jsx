//takes info for a single review and returns a card containing that information (and link to the dedicated review)
//used on the Reviews page.
import { useState, useEffect } from 'react'
import Card from '@mui/material/Card';

import './css/ReviewCard.css'

const ReviewCard = ({reviewInfo}) => {
    const [date, setDate] = useState({'year': '', 'season': ''});

    useEffect(() => {
        //attempt to construct normal date object
        var d = new Date(reviewInfo['c_date_crafted']);
        var season = ""
        console.log(d.getMonth())
        if (2 <= d.getMonth() && d.getMonth() < 5) {
            season = "Spring"
        } else if (5 <= d.getMonth() && d.getMonth < 8) {
            season = "Summer"
        } else if (8 <= d.getMonth && d.getMonth() < 11) {
            season = "Fall"
        } else if (11 <= d.getMonth() || d.getMonth() < 2) {
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
                {/* <img url */} temporary space
            </div>
        </Card>
    )
}

export default ReviewCard;