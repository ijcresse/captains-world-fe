//Allows editing of a given review. If the review has no ID associated with it, the review is posted as a new review.
//Child component of Review route
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    FormControl,
    InputLabel,
    TextField,
    MenuItem,
    Select
} from '@mui/material';

import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { WithContext as ReactTags } from 'react-tag-input';

import ImgUpload from '../components/ImgUpload';
import { ServerContext } from '../context/ServerContext';
import { ToastContext } from '../context/ToastContext';
import { sakeTypes } from '../util/strings';

import './css/EditReview.css';

const KeyCodes = {
    comma: 188,
    enter: 13
};

const tagDelimiters = [KeyCodes.comma, KeyCodes.enter];

export default function EditReview({ 
    reviewData, setReviewData, 
    tags,
    dateEnjoyed, setDateEnjoyed, 
    imgData, setImgData,
    isActive, 
    reviewId
}) {
    const [reviewTags, setReviewTags] = useState(tags);
    const { serverOrigin } = useContext(ServerContext);
    const { createToast } = useContext(ToastContext);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReviewData({
            ...reviewData,
            [name]: value
        });
    }

    const handleDelete = (i) => {
        const remainder = reviewTags.filter((tag, index) => index !== i);
        setReviewTags(remainder);
    }

    const handleAddition = (tag) => {
        setReviewTags(reviewTags => [...reviewTags, tag])
        console.log(reviewTags);
    }

    const handleDrag = (tag, currPos, newPos) => {
        let tagsCopy = reviewTags;
        let newTags = tagsCopy.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        setReviewTags(newTags);
    }

    const formatDate = (date) => {
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }

    const submitReview = () => {
        let submitData = reviewData;
        submitData['c_date_enjoyed'] = formatDate(dateEnjoyed);
        let headers = { 'Content-Type':'application/json', 'Accept':'application/json'};
        if (reviewId === 'new') {
            handlePost(submitData, headers);
        } else {
            handlePut(submitData, headers);
        }
    }
    
    const handlePut = (submitData, headers) => {
        const req = new Request(`${serverOrigin}/api/drink/detail/${reviewId}/edit`, {
            method: 'put',
            body: JSON.stringify(submitData),
            headers: headers,
            mode: 'cors',
            credentials: 'include'
        });
        fetch(req)
            .then(res => {
                if (res.status === 401) {
                    createToast('Unauthorized. Please log in.', 'warning');
                } else {
                    if (imgData.length === 0) {
                        createToast('Successfully updated review', 'success');
                    } else {
                        postImg(reviewId, 'put')
                    }
                }
            })
            .catch(err => {
                createToast('Something went wrong.', 'error');
                console.error(err);
            })
    }

    const handlePost = (submitData, headers) => {
        const req = new Request(`${serverOrigin}/api/drink/new`, {
            method: 'post',
            body: JSON.stringify(submitData),
            headers: headers,
            mode: 'cors',
            credentials: 'include'
        });
        fetch(req)
            .then(res => {
                if (res.status === 401) {
                    createToast('Unauthorized. Please log in.', 'warning');
                } else {
                    // postTags();
                    if (imgData.length === 0) {
                        createToast('Successfully posted review.', 'success');
                    } else {
                        res.json().then(json => {
                            postImg(json['c_id'], 'post');
                        })
                    }
                }
            })
            .catch(err => {
                createToast('Something went wrong.',' error');
                console.error(err);
            })
    }

    const postImg = (id, submitMethod) => {
        let data = new FormData();
        data.append('file', imgData[0]);
        let req = new Request(`${serverOrigin}/api/drink/img/${id}`, {
            method: 'post',
            body: data,
            mode: 'cors',
            credentials: 'include'
        });
        fetch(req)
            .then(res => {
                if (res.status === 401) {
                    createToast('Unauthorized. Please log in.', 'warning');
                } else {
                    let text = submitMethod === 'post' ? 'posted' : 'updated';
                    createToast(`Successfully ${text} review`, 'success');
                    navigate(`/review/${id}`);
                }
            })
            .catch(err => {
                console.error(err);
                let text = submitMethod === 'post' ? 'Posted' : 'Updated';
                createToast(`${text} review, but failed to upload image`, 'warning');
            });
    }

    const postTags = () => {
        console.log('postTags', reviewTags);
        let req = new Request(`${serverOrigin}/api/tags/for/review/${id}`, {
            method: 'post',
            body: reviewTags,
            mode: 'cors',
            credentials: 'include'
        });
        fetch(req)
            .then(res => {
                if (res.status === 401) {
                    createToast('Unauthorized. Please log in.', 'warning');
                } else {
                    createToast(`Successfully updated tags`, 'success');
                }
            })
            .catch(err => {
                console.error(err);
                let text = submitMethod === 'post' ? 'Posted' : 'Updated';
                createToast(`${text} review, but failed to post tags`, 'warning');
            })
        
    }

    /*
    i need tags to have IDs. when tags come in from Review, i want them to have
    id added to them. this doesn't overlap with c_id - that's for the backend.

    how am i going to manage this with being able to tell if a tag is new or old?
    i had a working system... maybe i should go back to it. so this is easier.
    i can't think very well today...
    */

    return (
        <div className="edit-review-top">
            <div className="edit-review-image-container">
                { reviewData['c_image_url'] ? 
                    <img 
                        className="edit-review-image" 
                        src={`${import.meta.env.VITE_IMAGES_DIR}/${reviewData['c_image_url']}`} 
                    /> : 
                    <div className="edit-review-image" />
                }
                <div className="edit-review-uploader">
                    <ImgUpload 
                        imgData={imgData} 
                        setImgData={setImgData} 
                        isActive={isActive}
                    />
                </div>
                
            </div>
            <div className="edit-review-metadata">
                <TextField
                    name="c_name"
                    label="Drink Name"
                    variant="filled"
                    value={reviewData['c_name']}
                    onChange={handleInputChange}
                    disabled={!isActive}
                    sx={{
                        margin: '1em'
                    }}
                />
                <FormControl 
                    sx={{
                        margin: '1em'
                    }}
                >
                    <InputLabel>Sake Type</InputLabel>
                    <Select 
                        name="c_sake_type"
                        label="Sake Type"
                        defaultValue={reviewData['c_sake_type'] ? reviewData['c_sake_type'] : 'futsushu_honjozo'}
                        value={reviewData['c_sake_type']}
                        onChange={handleInputChange}
                        disabled={!isActive}
                    >
                        {sakeTypes.map((type) => (
                            <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                        label="Date Enjoyed"
                        name="c_date_enjoyed"
                        value={dayjs(dateEnjoyed)}
                        onChange={setDateEnjoyed}
                        disabled={!isActive}
                        sx={{
                            margin: '1em'
                        }}
                    />
                </LocalizationProvider>
                <TextField
                    name="c_description"
                    label="Description"
                    variant="filled"
                    multiline
                    minRows={3}
                    value={reviewData['c_description']}
                    onChange={handleInputChange}
                    disabled={!isActive}
                    sx={{
                        margin: '1em'
                    }}
                />
                <ReactTags tags={reviewTags}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    delimiters={tagDelimiters}
                    labelField={'c_tag_name'}
                    inline={false} />
            </div>
            <div className="edit-review-submit-button">
                <Button 
                    variant="contained" 
                    onClick={submitReview}
                    sx={{
                        display: 'flex',
                        margin: 'auto'
                    }}
                >
                    Submit review
                </Button>
                <Button onClick={postTags}>Submit Tags</Button>
            </div>

        </div>
    )
}