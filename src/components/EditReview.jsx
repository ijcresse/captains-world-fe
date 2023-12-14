//Allows editing of a given review. If the review has no ID associated with it, the review is posted as a new review.
//Child component of Review route
import { useContext } from 'react';
import {
    Container,
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

import ImgUpload from '../components/ImgUpload';
import { ServerContext } from '../context/ServerContext';
import { ToastContext } from '../context/ToastContext';

const sakeTypes = [
    {
        value: "futsushu_honjozo",
        label: "Futsushu/Honjozo"
    },
    {
        value: "ginjo_tokubetsu",
        label: "Ginjo/Tokubetsu Junmai"
    },
    {
        value: "junmai",
        label: "Junmai"
    },
    {
        value: "daiginjo",
        label: "Daiginjo"
    },
    {
        value: "specialty",
        label: "Specialty"
    }
]

export default function EditReview({ 
    reviewData, setReviewData, 
    dateEnjoyed, setDateEnjoyed, 
    imgData, setImgData,
    isActive, 
    reviewId 
}) {
    const serverOrigin = useContext(ServerContext);
    const { createToast } = useContext(ToastContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReviewData({
            ...reviewData,
            [name]: value
        })
    }

    const formatDate = (date) => {
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }

    const submitReview = () => {
        const submitUri = reviewId ?
            `${serverOrigin}/api/drink/${reviewId}` :
            `${serverOrigin}/api/drink/new`;
        const submitMethod = reviewId ?
            'post' : 'put'
        submitData = reviewData;
        submitData['c_date_enjoyed'] = formatDate(dateEnjoyed)
        const req = new Request(submitUri, {
            method: submitMethod,
            body: JSON.stringify(reviewData),
            headers: { 'Content-Type':'application/json', 'Accept':'application/json'},
            mode: 'cors',
            credentials: 'include'
        });
        fetch(req)
            .then(res => res.json())
            .then(json => {
                postImg(json['c_id'])
            })
            .catch(err => {
                createToast('Something went wrong with posting review.', 'error');
                console.error(err);
            })
    }

    const postImg = (id) => {
        let data = new FormData();
        data.append('file', imgData[0]);
        let req = new Request(`${serverOrigin}/api/drink/new/${id}/img`, {
            method: 'post',
            body: data,
            mode: 'cors',
            credentials: 'include'
        })
        fetch(req)
            .then(res => {
                createToast('Successfully created post', 'success');
            })
            .catch(err => {
                console.error(err);
                createToast('Posted sake, but failed to upload image', 'warning');
            })
    }

    return (
        <Container className="edit-review-top">
            <div className="edit-review-left-col">
                <ImgUpload imgData={imgData} setImgData={setImgData} isActive={isActive} />
            </div>
            <div className="edit-review-right-col">
                <TextField className="edit-review-drink-name"
                    name="c_name"
                    label="Name"
                    helperText="Drink name"
                    variant="filled"
                    value={reviewData['c_name']}
                    onChange={handleInputChange}
                />
                <FormControl>
                    <InputLabel>Sake Type</InputLabel>
                    <Select className="edit-review-sake-type"
                        name="c_sake_type"
                        label="Sake Type"
                        defaultValue={reviewData['c_sake_type'] ? reviewData['c_sake_type'] : 'futsushu_honjozo'}
                        value={reviewData['c_sake_type']}
                        onChange={handleInputChange}
                    >
                        {sakeTypes.map((type) => (
                            <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker className="edit-review-date-enjoyed"
                        label="Date Enjoyed"
                        name="c_date_enjoyed"
                        value={dayjs(dateEnjoyed)}
                        onChange={setDateEnjoyed}
                    />
                </LocalizationProvider>
                <TextField className="edit-review-desc"
                    name="c_desc"
                    label="Description"
                    helperText="Enter a description"
                    variant="filled"
                    multiline
                    minRows={3}
                    value={reviewData['c_desc']}
                    onChange={handleInputChange}
                />
            </div>
        </Container>
    )
}