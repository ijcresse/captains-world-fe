import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';

import './css/Review.css';

const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const Review = () => {
    const [review, setReview] = useState([]);

    useEffect(() => {
        //TODO: make this into an api call for review data
        async function fetchData() {
            await setReview(dummyData());
        }
        fetchData();
    }, [])


    const dummyData = () => {
        return {
            "c_id": 11,
            "c_name": "Henohenomoheji",
            "c_date_crafted": "2023-01-01 00:00:00",
            "c_date_enjoyed": "2023-01-02 00:00:00",
            "c_sake_type": "daiginjo",
            "c_description": lorem,
            "c_image_url": "11asdf.png",
            "c_tags": ["earthy", "full bodied"]
        }
    }

    return(
        <Container className="review-top">
            <div className="review-title">{review['c_name']}</div>
            <Card className='review-info-container'>
                <div className="review-image">{review['c_image_url'] ?
                    <img url={review['c_image_url']} /> : <></>
                }</div>
                <div className="review-text-container">
                    <div className="review-sake-type">{review['c_sake_type']}</div>
                    <div className="review-craft-date">{review['c_date_crafted']}</div>
                    <div className="review-drink-date">{review['c_date_enjoyed']}</div>
                    <div className="review-description">{review['c_description']}</div>
                    <div className="review-tag-list">{review['c_tags'] ? 
                        review['c_tags'].map(tag => {
                            return <div className="review-tag" key={tag}>{tag}</div>
                        }) : <></>
                    }</div>
                </div>
            </Card>
        </Container>
    )
}

export default Review;