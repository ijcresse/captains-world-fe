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
import { useDropzone } from 'react-dropzone';

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
    const [imageUrl, setImageUrl] = useState("");
    const [formData, setFormData] = useState(initForm);

    const onDrop = useCallback(acceptedFiles, fileRejections => {
        console.log(acceptedFiles[0]);
        console.log(fileRejections); //want to know about failures. notify with snackbar eventually
        setImageUrl(acceptedFiles[0].path); //ensure this is the url!
        const acceptedFile = acceptedFiles[0] //only accepts one file at a time anyway
        const reader = new FileReader()
        reader.onabort = () => console.warn('File reading was aborted')
        reader.onerror = () => console.error('File reading failed!')
        reader.onload = () => {
            const binaryStr = reader.result
            console.log(binaryStr)
        }
        reader.readAsArrayBuffer(acceptedFile)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop, 
            maxFiles:1, 
            accept: {
                'image/png': ['.png'],
                'image/gif': ['.gif'],
                'image/jpeg': ['.jpeg'],
                'image/webp': ['.webp']
            }});

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
        let req = new Request('http://localhost:5000/api/drink/new', {
            method : 'post',
            body : JSON.stringify(formData),
            headers: post_headers,
            mode: 'cors',
            credentials: 'include'
        })
        fetch(req)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                postImage()
            })
            .catch(err => {
                console.error(err)
            })
    }

    const formatDate = (date) => {
        return date.toISOString().slice(0, 19).replace('T', ' ');
    }

    const postImage = () => {
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
                <div className="post-review-image-container" {...getRootProps()}>
                    <input {...getInputProps} />
                    {
                        isDragActive ?
                            <p>Upload image</p> :
                            <p>Drag and drop or click to select files</p>
                    }
                </div>
                <Button component="label" variant="contained" onClick={() => postReview()}>
                    Preview
                </Button>
            </Box>
        </Container>
    )
}

export default PostReview;