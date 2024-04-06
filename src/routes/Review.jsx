//Individual review page. Supports edit mode for logged in users.

import { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Grid,
    Paper
 } from '@mui/material';

import { ServerContext } from '../context/ServerContext';
import { ToastContext } from '../context/ToastContext';
import ViewReview from '../components/ViewReview';
import './css/Review.css';

const baseReview = {
    'c_name': '',
    'c_sake_type': 'futsushu_honjozo',
    'c_drink_type': 'sake',
    'c_date_enjoyed': '',
    'c_desc': '',
    'c_image_url': ''
}

export default function Review() {
    const [review, setReview] = useState(baseReview);
    const [tags, setTags] = useState([])

    const { serverOrigin } = useContext(ServerContext);
    const { createToast } = useContext(ToastContext);

    const location = useLocation().pathname.split('/');
    const id = location[location.length - 1];

    function getReview() {
        let req = new Request(`${serverOrigin}/api/drink/detail/${id}`);
        fetch(req)
            .then(res => res.json())
            .then(res => {
                setReview(res);
            })
            .catch(err => {
                console.error(err);
                createToast('Something went wrong', 'error');
            })
            .finally(() => {
                getTags();
            })
    }

    function getTags() {
        let req = new Request(`${serverOrigin}/api/tags/for/review/${id}`);
        fetch(req)
            .then(res => res.json())
            .then(res => {
                setTags(res);
            })
            .catch(err => {
                console.error(err);
                createToast('Something went wrong', 'error');
            })
    }

    useEffect(() => {
        getReview();
    }, [])

    return(
        <Grid id="review-top" container justifyContent="space-evenly">
            <Grid className="height-inherit" container direction="column" justifyContent="center" item xs={9}>
                <Grid className="height-inherit" container direction="row" justifyContent="center" item xs={9}>
                    <Paper id="review-paper" >
                        <ViewReview 
                            reviewData={review}
                            masterTags={tags}
                            imgData={[]}
                            />
                    </Paper>
                </Grid>
                <Grid container item xs={2} />
            </Grid>
            <img id="review-bg-texture" src={'../../cypress.png'} />
        </Grid>
    )
}