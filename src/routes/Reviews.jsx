//showcases reviews. features some very basic sorting (by type of sake, basically)
import { useContext, useState } from 'react';
import { RootContext } from './Root';

export default function Reviews() {
    const axiosInstance = useContext(RootContext);
    const [limit, setLimit] = useState(50);
    const [offset, setOffset] = useState(0);
    const [reviews, setReviews] = useState(null);

    function getReviews() {
        console.log('getting reviews!')
        // axiosInstance.get(`http://localho.st:5000/api/availability`)
        // .then(res => {
        //     console.log('success!')
        // })
        // .catch(error => {
        //     console.error(error)
        // })
        axiosInstance.get(`http://localhost:5000/api/drink/list`)
        .then(res => {
            console.log('success!')
            console.log(res.data)
        }).catch(res => {
            console.log('there was a problem')
            console.error(res)
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
        <div id="reviews-top">
            Reviews
            <button onClick={() => getReviews()}>click me</button>
        </div>
    )
}