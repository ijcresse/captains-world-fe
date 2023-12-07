import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { ServerContext } from '../context/ServerContext';
import { ToastContext } from '../context/ToastContext';
import ReviewCard from '../components/ReviewCard'
import './css/Reviews.css'

/*
 * Reviews page shows multiple abbreviated sake reviews.
 * Hosts the ReviewPage component, which actually displays the ReviewCards.
 * Coordinates that with the Pagination materialui component.
 * This component coordinates the two.
 */

const PAGE_LIMIT = 12;

export default function Reviews() {
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [reviews, setReviews] = useState([]);
    const serverOrigin = useContext(ServerContext);
    const { createToast } = useContext(ToastContext);

    function getReviews() {
        let req = new Request(`${serverOrigin}/api/drink/list?limit=${PAGE_LIMIT}&offset=${PAGE_LIMIT * page}`, {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        })
        fetch(req)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                setReviews(json);
            })
            .catch(err => {
                console.error(err);
                createToast('Failed to populate drink list', 'error');
            })
    }

    function getPageCount() {
        let req = new Request(`${serverOrigin}/api/drink/list/count`, {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        })
        fetch(req)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res % PAGE_LIMIT === 0) {
                    setPageCount(Math.floor(res['count'] / PAGE_LIMIT));
                } else {
                    setPageCount(Math.floor(res['count'] / PAGE_LIMIT + 1));
                }
            })
            .catch(err => {
                console.error(err);
                createToast('Something went wrong', 'error');
            })
    }

    useEffect(() => {
        console.log('fetching reviews');
        getReviews();

        console.log('fetching pagecount');
        getPageCount();
    }, [page]); //update when page changes

    const handleChange = (event, value) => {
        setPage(value);
    }

    return(
        <Container className="reviews-top">
            <div className="reviews-header">
                Reviews
                <button onClick={() => getReviews()}>click me</button>
            </div>
            <div className="reviews-container">
                {reviews ? reviews.map(review => {
                    return (
                        <Link to={'/review/' + review['c_id']} key={review['c_id']}>
                            <ReviewCard reviewInfo={review} key={review['c_id']} />
                        </Link>
                    )
                }) : <></>}
            </div>
            <Stack spacing={2}>
                <Pagination count={pageCount} page={page} onChange={handleChange} />
            </Stack>
        </Container>
    )
}