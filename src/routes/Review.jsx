import { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';

import { ServerContext } from '../context/ServerContext';
import { ToastContext } from '../context/ToastContext';
import './css/Review.css';

export default function Review() {
    const [review, setReview] = useState();
    const serverOrigin = useContext(ServerContext);
    const { createToast } = useContext(ToastContext);
    const location = useLocation().pathname.split('/');
    
    function getReview() {
        var id = location[location.length - 1];
        let req = new Request(`${serverOrigin}/api/drink/detail/${id}`)
        fetch(req)
            .then(res => res.json())
            .then(res => {
                setReview(res);
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
        <Container className="review-top">
            {review ? 
                <div>
                    <div className="review-title">{review['c_name']}</div>
                    <Card className='review-info-container'>
                        <div className="review-image">{review['c_image_url'] ?
                            <img url={`${import.meta.env.VITE_IMAGES_DIR}/${review['c_image_url']}`} /> : <></>
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
                </div>
            : <></>
            }
        </Container>
    )
}