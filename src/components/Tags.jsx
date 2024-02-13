import { WithContext as ReactTags } from 'react-tag-input';
import { Typography } from '@mui/material';
import './css/Tags.css';

const KeyCodes = {
    comma: 188,
    enter: 13
};

const tagDelimiters = [KeyCodes.comma, KeyCodes.enter];

function importTags(tags) {
    let editable = []
    for (let i = 0; i < tags.length; i++) {
        editable.push(tags[i]);
        editable[i]['id'] = tags[i]['c_tag_name'];
    }
    return editable;
}

function exportTags(tags) {
    let postTags = [];
    tags.forEach(tag => postTags.push(tag['c_tag_name']))
    console.log('exportTags', postTags);
    return postTags;
}

export default function Tag({tags, setTags, readOnly}) {

    const handleDelete = (i) => {
        const remainder = tags.filter((tag, index) => index !== i);
        setTags(remainder);
    }

    const handleAddition = (tag) => {
        setTags(tags => [...tags, tag])
        console.log(tags);
    }

    const handleDrag = (tag, currPos, newPos) => {
        let tagsCopy = tags;
        let newTags = tagsCopy.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        setTags(newTags);
    }

    return(
        <>
            {tags ? 
            <div>
                <Typography variant="body1" sx={{ margin: '1em'}}>Tags:</Typography>
                <ReactTags className="tags"
                    tags={tags}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    delimiters={tagDelimiters}
                    labelField={'c_tag_name'}
                    inputFieldPosition={'bottom'}
                    readOnly={readOnly} />
            </div> 
            : <></>}
        </>
    )
}

export { importTags, exportTags }