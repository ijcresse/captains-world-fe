//posting page for new reviews. there'll be a separate page for posting blog updates
import { useState } from 'react';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { Box } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { TextField } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Input } from '@mui/material';
import { Select } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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
}

var initForm = {
    name: "",
    sake_type: sakeTypes[0],
    drink_type: "",
    date_enjoyed: "",
    desc: "",
    imageUrl: ""
}

function PostReview() {
    const [dateCrafted, setDateCrafted] = useState("");
    const [dateEnjoyed, setDateEnjoyed] = useState("");
    const [formData, setFormData] = useState(initForm);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const postReview = () => {
        console.log("postreview");
        let req = new Request('http://localhost:5000/api/drink/post', {
            method : 'post',
            body : JSON.stringify(formData),
            headers: post_headers
        })
        fetch(req)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err)
            })
    }

    const postImage = (imageUrl) => {
        console.log('post image', imageUrl)
        // let req = new Request('http://localhost:5000/api/drink/post', {
        //     method: 'post',
        //     body : JSON.stringify(),
        //     headers: 'image/' + image_type
        // })
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
                    label="Name" 
                    helperText="Please enter the drink name" 
                    variant="filled" 
                    onChange={handleInputChange}
                />
                <FormControl>
                    <InputLabel>Sake Type</InputLabel>
                    <Select 
                        id="post-review-sake-type" 
                        label="Sake Type" 
                        defaultValue={sakeTypes[0]} 
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
                        label="Date Crafted"
                        value={dateCrafted}
                        onChange={setDateCrafted}
                    />
                    <DatePicker id="post-review-date-enjoyed"
                        label="Date Enjoyed"
                        value={dateEnjoyed}
                        onChange={setDateEnjoyed}
                    />
                </LocalizationProvider>
                <TextField 
                    id="post-review-description" 
                    label="Description" 
                    helperText="Enter a description" 
                    variant="filled" 
                    multiline 
                    minRows={3}
                    onChange={handleInputChange}
                />
                <div className="post-review-image-container">
                    <Button component="label" variant="contained">
                        Upload image
                        <Input type="file"/>
                    </Button>
                </div>
                <Button component="label" variant="contained" onClick={() => postReview()}>
                    Preview
                </Button>
            </Box>
        </Container>
    )
}

export default PostReview;