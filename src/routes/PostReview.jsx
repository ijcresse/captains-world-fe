//posting page for new reviews. there'll be a separate page for posting blog updates
import { useContext, useState } from 'react';
import {
    Container, 
    Button, 
    Box,
    FormControl, 
    InputLabel, 
    TextField,
    MenuItem, 
    Select,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { ServerContext } from '../context/ServerContext';
import { ToastContext } from '../context/ToastContext';
import ImgUpload from '../components/ImgUpload'
import './css/PostReview.css';

const sakeTypes = [
    {
        value: "futsushu_honjozo",
        label: "Futsushu/Honjozo"
    },
    {
        value: "ginjo_tokubetsu",
        label: "Ginjo/Tokubetsu"
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

const post_headers = {
    'Content-Type': 'application/json',
    'Accept' : 'application/json'
}

var initForm = {
    'name': "",
    'sake_type': sakeTypes[0].value,
    'drink_type': "sake",
    'date_enjoyed': "",
    'desc': "",
}

function PostReview() {
    const [dateCrafted, setDateCrafted] = useState("");
    const [dateEnjoyed, setDateEnjoyed] = useState("");
    const [imgData, setImgData] = useState([]);
    const [formData, setFormData] = useState(initForm);
    const serverOrigin = useContext(ServerContext);
    const createToast = useContext(ToastContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const postReview = () => {
        formData['date_enjoyed'] = formatDate(dateEnjoyed)
        formData['date_crafted'] = formatDate(dateCrafted)
        let req = new Request(`${serverOrigin}/api/drink/new`, {
            method : 'post',
            body : JSON.stringify(formData),
            headers: post_headers,
            mode: 'cors',
            credentials: 'include'
        })
        fetch(req)
            .then(res => res.json())
            .then(json => {
                postImg(json['id'])
            })
            .catch(err => {
                console.error(err)
            })
    }

    const postImg = (sakeId) => {
        let data = new FormData()
        data.append('file', imgData[0])
        let req = new Request(`${serverOrigin}/api/drink/new/${sakeId}/img`, {
            method: 'post',
            body: data,
            mode: 'cors',
            credentials: 'include'
        });
        fetch(req)
            .then(res => {
                createToast('Successfully created post', 'success');
            })
            .catch(err => {
                console.error(err);
                createToast('Posted sake, but failed to upload image', 'warning');
            })
    }

    const formatDate = (date) => {
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }

    /*
    ok:
    db setup: name, drink type, sake type, desc, date crafted, date enjoyed, image
    */
    return(
        <Container id="post-review-top">
            <Box id="post-review-form" component="form">
                <TextField 
                    id="post-review-drink-name" 
                    name="name"
                    label="Name" 
                    helperText="Please enter the drink name" 
                    variant="filled" 
                    onChange={handleInputChange}
                />
                <FormControl>
                    <InputLabel>Sake Type</InputLabel>
                    <Select 
                        id="post-review-sake-type" 
                        name="sake_type"
                        label="Sake Type" 
                        defaultValue={sakeTypes[0].value} 
                        value={formData['sakeType']} 
                        onChange={handleInputChange}
                    >
                        {sakeTypes.map((type) => (
                            <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker id="post-review-date-crafted" 
                        views={['year', 'month']}
                        name="date_crafted"
                        label="Date Crafted"
                        value={dateCrafted}
                        onChange={setDateCrafted}
                    />
                    <DatePicker id="post-review-date-enjoyed"
                        label="Date Enjoyed"
                        name="date_enjoyed"
                        value={dateEnjoyed}
                        onChange={setDateEnjoyed}
                    />
                </LocalizationProvider>
                <TextField 
                    id="post-review-description" 
                    name="desc"
                    label="Description" 
                    helperText="Enter a description" 
                    variant="filled" 
                    multiline 
                    minRows={3}
                    onChange={handleInputChange}
                />
                <ImgUpload imgData={imgData} setImgData={setImgData}/>
                <Button component="label" variant="contained" onClick={() => postReview()}>
                    Preview
                </Button>
            </Box>
        </Container>
    )
}

export default PostReview;