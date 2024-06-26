/**
 * For viewing all reviews. Includes ability to delete existing reviews, hide/reveal reviews and add new reviews.
 */

import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { ServerContext } from '../context/ServerContext';
import { ToastContext } from '../context/ToastContext';
import SearchPanel from '../components/SearchPanel';
import ReviewCard from '../components/ReviewCard';
import './css/Reviews.css';

/**
 * Reviews page shows multiple abbreviated sake reviews.
 * Hosts the ReviewPage component, which actually displays the ReviewCards.
 * Coordinates that with the Pagination materialui component.
 * This component coordinates the two.
 */

const PAGE_LIMIT = 12;

export default function AdminReviews() {
    const { serverOrigin, isAuthorized } = useContext(ServerContext);
    const { createToast } = useContext(ToastContext);

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [reviews, setReviews] = useState([]);

    const navigate = useNavigate();

    function getReviews() {
        let req = new Request(`${serverOrigin}/api/drink/list?limit=${PAGE_LIMIT}&offset=${PAGE_LIMIT * (page - 1)}`, {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        })
        fetch(req)
            .then(res => res.json())
            .then(json => {
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
                if (res['count'] % PAGE_LIMIT === 0) {
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
        if (!isAuthorized()) {
            navigate("/reviews");
        }
        getReviews();
        getPageCount();
    }, [page]); //update when page changes

    const handleChange = (event, value) => {
        setPage(value);
    }

    const handleDelete = (reviewId) => {
        console.log('attempting to delete review with id', reviewId);
    }

    return(
        <Container className="reviews-top">
            {/* <div className="reviews-search-panel">
                <SearchPanel />
            </div> */}
            <div className="reviews-container">
                <Link to={'/admin/review/new'}>
                    <ReviewCard key={'new_review'} />
                </Link>
                {reviews ? reviews.map(review => {
                    return (
                        <Link to={'/admin/review/' + review['c_id']} key={review['c_id']}>
                            <ReviewCard reviewInfo={review} key={review['c_id']} isAuthorized={isAuthorized()} />
                        </Link>
                    )
                }) : <></>}
            </div>
            <div className="reviews-footer">
                <Stack spacing={2}>
                    <Pagination count={pageCount} page={page} onChange={handleChange} />
                </Stack>
            </div>
        </Container>
    )
}