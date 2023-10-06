//posting page for new reviews. there'll be a separate page for posting blog updates
import { useContext, useState } from 'react';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { FormControl } from "@mui/material";
import { TextField } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Input } from '@mui/material';
import { Select } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { RootContext } from './Root';
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

const initForm = {
    name: "",
    sakeType: "",
    description: "",
    imageUrl: ""
}

function PostReview() {
    const axiosInstance = useContext(RootContext);
    const [dateCrafted, setDateCrafted] = useState("");
    const [dateEnjoyed, setDateEnjoyed] = useState("");
    const [formData, setFormData] = useState(initForm);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        //when sake type is chosen, name is undefined. figure out why!
        //when there's no value, react complains about going from uncontrolled to controlled. stupid!
        console.log(name);
        console.log(value);
        setFormData({
            ...formData,
            [name]: value
        })
    }
    /*
    ok:
    db setup: name, drink type, sake type, desc, date crafted, date enjoyed, image
    */
    return(
        <Container id="post-review-top">
            <FormControl id="post-review-form">
                <TextField id="post-review-drink-name" label="Name" helperText="Please enter the drink name" variant="filled" onChange={handleInputChange}/>
                <TextField select id="post-review-sake-type" label="Sake Type" helperText="Please select a sake type" variant="filled" value={formData['sakeType']} onChange={handleInputChange}>
                {/* <Select id="post-review-sake-type" label="Sake Type" value={formData['sakeType']} onChange={handleInputChange}> */}
                    {sakeTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                    ))}
                {/* </Select> */}
                </TextField>
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
                <TextField id="post-review-description" label="Description" helperText="Enter a description" variant="filled" multiline onChange={handleInputChange}/>
                <div className="post-review-image-container">
                    <Button component="label" variant="contained">
                        Upload image
                        <Input type="file" />
                    </Button>
                </div>
                <Button component="label" variant="contained">Preview</Button>
            </FormControl>
        </Container>
    )
}

export default PostReview;