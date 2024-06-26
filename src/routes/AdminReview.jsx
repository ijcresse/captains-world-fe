/**
 * For viewing a specific review. Includes ability to edit existing reviews and create reviews from scratch.
 */

//Individual review page. Supports edit mode for logged in users.

import { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Switch,
    FormGroup,
    FormControlLabel,
    Paper
 } from '@mui/material';

import { ServerContext } from '../context/ServerContext';
import { ToastContext } from '../context/ToastContext';
import ViewReview from '../components/ViewReview';
import EditReview from '../components/EditReview';
import './css/Review.css';

const baseReview = {
    'c_name': '',
    'c_sake_type': 'futsushu_honjozo',
    'c_drink_type': 'sake',
    'c_date_enjoyed': '',
    'c_desc': '',
    'c_image_url': ''
}

export default function AdminReview() {
    const [review, setReview] = useState(baseReview);
    const [tags, setTags] = useState([])
    const [dateEnjoyed, setDateEnjoyed] = useState("");
    const [imgData, setImgData] = useState([]);
    const [editable, setEditable] = useState(false);

    const { serverOrigin, isAuthorized } = useContext(ServerContext);
    const { createToast } = useContext(ToastContext);
    
    const navigate = useNavigate();
    const location = useLocation().pathname.split('/');
    const id = location[location.length - 1];

    function getReview() {
        let req = new Request(`${serverOrigin}/api/drink/detail/${id}`);
        fetch(req)
            .then(res => res.json())
            .then(res => {
                setReview(res);
                setDateEnjoyed(new Date(res['c_date_enjoyed']))
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
        if (!isAuthorized()) {
            navigate(`/review/${id}`)
        }
        if (id === 'new') {
            setEditable(true);
        } else {
            getReview();
        }
    }, [])

    const handleSwitchChange = (e) => {
        setEditable(e.target.checked)
    }

    return(
        <Paper className="review-top">
            {isAuthorized() ? <div className="review-switch">
                <FormGroup>
                    <FormControlLabel 
                    control={
                        <Switch
                            checked={editable}
                            onChange={handleSwitchChange}
                        />
                    } 
                        label={ editable ? 'Editing' : 'Viewing'}
                        labelPlacement="start"
                    />
                </FormGroup>
            </div> : <></>}
            <div className="review-outlet">
                {(id === 'new' || editable) ?
                    <EditReview 
                        reviewData={review} setReviewData={setReview}
                        masterTags={tags} getTags={getTags}
                        dateEnjoyed={dateEnjoyed} setDateEnjoyed={setDateEnjoyed}
                        imgData={imgData} setImgData={setImgData}
                        isActive={editable}
                        reviewId={id}
                    /> :
                    <ViewReview 
                        reviewData={review}
                        masterTags={tags}
                        imgData={imgData}
                    />
                }
            </div>
        </Paper>
    )
}