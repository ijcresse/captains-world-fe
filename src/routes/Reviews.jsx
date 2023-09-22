//showcases reviews. features some very basic sorting (by type of sake, basically)
import { useContext, useState } from 'react';
import { RootContext } from './Root';

import ReviewCard from '../components/ReviewCard'

export default function Reviews() {
    const axiosInstance = useContext(RootContext);
    const [limit, setLimit] = useState(50);
    const [offset, setOffset] = useState(0);
    const [reviews, setReviews] = useState(null);

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
        setReviews(dummyReviews);
        // axiosInstance.get(`http://localhost:5000/api/drink/list`)
        // .then(res => {
        //     console.log('success!')
        //     console.log(res.data)
        // }).catch(res => {
        //     console.log('there was a problem')
        //     console.error(res)
        // })
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
        <div id="reviews-top">
            Reviews
            <button onClick={() => getReviews()}>click me</button>
            {reviews ? reviews.map(review => {
                return (<ReviewCard reviewInfo={review} key={review['c_id']} />)
            }) : <></>}
        </div>
    )
}