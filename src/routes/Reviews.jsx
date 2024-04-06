import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
    Grid,
    Typography,
    Pagination
} from '@mui/material';

import { ServerContext } from '../context/ServerContext';
import { ToastContext } from '../context/ToastContext';
import SearchPanel from '../components/SearchPanel';
import ReviewCard from '../components/ReviewCard';
import './css/Reviews.css';

/*
 * Reviews page shows multiple abbreviated sake reviews.
 * Hosts the ReviewPage component, which actually displays the ReviewCards.
 * Coordinates that with the Pagination materialui component.
 * This component coordinates the two.
 */

const PAGE_LIMIT = 8;

export default function Reviews() {
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [reviews, setReviews] = useState([]);
    const { serverOrigin } = useContext(ServerContext);
    const { createToast } = useContext(ToastContext);


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
        getReviews();
        getPageCount();
    }, [page]); //update when page changes

    const handleChange = (event, value) => {
        setPage(value);
    }

    return(
        <div>
            <Grid id="reviews-top" container direction="column" justifyContent="space-evenly">
                <Grid id="reviews-label" container direction="column" item md={2} justifyContent="center" alignItems="center" >
                    <Typography variant="h1">
                        Sake Reviews
                    </Typography>
                </Grid>
                <Grid container direction="row" >
                    <Grid id="reviews-search" container direction="column" item md={3}>
                        <SearchPanel />
                    </Grid>
                    <Grid container direction="column" item md={9}>
                        <Grid id="reviews-pages" container item direction="column" justifyContent="center">
                            <Grid container item direction="row" justifyContent="center">
                                <Pagination count={pageCount} page={page} onChange={handleChange} />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" item md={10} justifyContent="space-around" >
                            {reviews ? reviews.map(review => {
                                return (
                                    <Grid container item md={3} xs={6} justifyContent="center" alignItems="center" key={review['c_id']}>
                                        <Link to={'/review/' + review['c_id']} >
                                            <ReviewCard reviewInfo={review} isAuthorized={false}/>
                                        </Link>
                                    </Grid>
                                )
                            }) : <></>}
                        </Grid>
                </Grid>
                    
                </Grid>
            </Grid>
            <img id="reviews-bg-texture" src={'../../cypress.png'} />
        </div>
    )
}