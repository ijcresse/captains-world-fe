//takes info for a single review and returns a card containing that information (and link to the dedicated review)
//used on the Reviews page.
import { useState, useEffect } from 'react'
// import './css/ReviewCard.css'

const ReviewCard = ({reviewInfo}) => {
    const [info, setInfo] = useState(reviewInfo);
    const [date, setDate] = useState({'year': '', 'month': ''});

    useEffect(() => {
        function formatDate(timestamp) {
            var t = timestamp.split(/[- :]/)
            var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]))
            setDate({'year': d.getFullYear(), 'month': d.getMonth()})
        }
    }, [])
    
    return(
        <div className="review-card-top">
            <div className="review-card-text">
                <div className="review-card-title">{info['c_name']}</div>
                <div className="review-card-subtitle">
                    <div className="review-card-year">{date['year']}</div>
                    <div className="review-card-month">{date['month']}</div>
                </div>
            </div>
            <div className="review-card-image">
                {/* <img url */} temporary space
            </div>
        </div>
    )
}

export default ReviewCard;