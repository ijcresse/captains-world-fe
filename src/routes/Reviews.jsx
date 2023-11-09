//showcases reviews. features some very basic sorting (by type of sake, basically)
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Container from '@mui/material/Container';

import ReviewCard from '../components/ReviewCard'
import './css/Reviews.css'

export default function Reviews() {
    const [limit, setLimit] = useState(12);
    const [offset, setOffset] = useState(0);
    const [reviews, setReviews] = useState([]);

    const dummyReviews = [
        {
            "c_id": 11,
            "c_name": "test1",
            "c_date_crafted": "2023-01-01 00:00:00",
            "c_image_url": "11asdf.png"
        },
        {
            "c_id": 21,
            "c_name": "test2",
            "c_date_crafted": "2023-04-02 00:00:00",
            "c_image_url": "21asdf.png"
        },
        {
            "c_id": 31,
            "c_name": "test3",
            "c_date_crafted": "2023-07-03 00:00:00",
            "c_image_url": "31asdf.png"
        },
        {
            "c_id": 41,
            "c_name": "test4",
            "c_date_crafted": "2023-11-01 00:00:00",
            "c_image_url": "41asdf.png"
        }
    ]

    function getReviews() {
        console.log('getReviews (currently using dummy data)')
        // setReviews(dummyReviews);
        if (reviews.length == 0) {
            setReviews(dummyReviews)
        } else {
            let clonedReviews = [...reviews];
            clonedReviews.push({
                "c_id": 99 + Math.random() * 11,
                "c_name": "testNew",
                "c_date_crafted": "2023-01-01 00:00:00",
                "c_image_url": "otherimg.png"
            })
            setReviews(clonedReviews)
        }
        let req = new Request('http://localhost:5000/api/drink/list', {
            method: 'get'
        })
        fetch(req)
            .then(res => {
                console.log('getReviews success', res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    /*
    flow of page:
    get default limit and offset reviews upon page load.
    so useeffect there. we'll start with a button to fetch reviews tho
    get reviews: if none, set as an empty list. not null. null is unloaded.
    create individual reviews. load those as components, which hold all their own styling.
    we'll just organize those into rows ourselves.
    */

    return(
        <Container className="reviews-top">
            <Container className="reviews-header">
                Reviews
                <button onClick={() => getReviews()}>click me</button>
            </Container>
            <Container className="reviews-container">
                {reviews ? reviews.map(review => {
                    return (
                        <Link to={'/review/' + review['c_id']} key={review['c_id']}>
                            <ReviewCard reviewInfo={review} key={review['c_id']} />
                        </Link>
                    )
                }) : <></>}
            </Container>
        </Container>
    )
}