import { useContext, useState, useEffect } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionActions,
    AccordionDetails,
    Autocomplete,
    Button,
    Chip,
    FormControl,
    InputLabel,
    TextField,
    MenuItem,
    Select,
    Typography
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { WithContext as ReactTags } from 'react-tag-input';

import { ServerContext } from '../context/ServerContext';
import { sakeTypes } from '../util/strings';
import { ToastContext } from '../context/ToastContext';

import './css/SearchPanel.css';

export default function SearchPanel() {
    /*
        searchpanel starts closed but can be opened by clicking on the 'header' portion.

        search panel has 3 fields to search on:
        name (txt)
        type (select)
        tags (input with ... options?)
            ok really what does tags look like.
            1 load in a list of tags
                generate clickable chips that you can add to your search?
                should load in an input box
                there shouldn't be _that_ many tags, right?
                hmm... maybe i should develop t_tags further.
                    tags for nose, tags for palate, tags for finish,
                    tags for 'other'
                        would require figuring out how to categorize them when submitting tho.
    */
    const [open, isOpen] = useState(false);
    const [nameParam, setNameParam] = useState("");
    const [typeParam, setTypeParam] = useState("");
    const [tagParam, setTagParam] = useState([]);
    //list of tags for autocomplete purposes
    const [tagList, setTagList] = useState([]);

    const { serverOrigin } = useContext(ServerContext);
    const { createToast } = useContext(ToastContext);

    const fetchTags = () => {
        //get tags from server, populate tagList
        //load this all on render via useeffect
        let req = new Request(`${serverOrigin}/api/tags/list`, {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        })
        fetch(req)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setTagList(res);
            })
            .catch(err => {
                console.error(err);
                createToast('Something went wrong', 'error');
            })
    }

    useEffect(() => {
        fetchTags();
    }, [])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        console.log('handleInputChange', name, value);
    }

    const handleDelete = (tag) => {
        console.log('handleDelete.tag', tag);
    }

    const handleSearch = () => {
        const content = {
            'name' : nameParam,
            'type' : typeParam,
            'tags' : tagParam
        }
        console.log('search query', content);
    }
    //ok i need a List of Tags API
    //maybe i can simplify the backend api to not have to do that delta stuff
    //FE will be able to tell what's new and what's not on submit
    //simply maintain the original
    //when editing, use an 'edit copy' of the original list
    //if anything is added or removed, track those and submit those as separate objects
    //BE will verify, of course, and still check for dangling tags, but the work doesn't have to be entirely doen on the backend side
    //when the FE is already tracking that info.

    return(
        <Accordion className="search-top">
            <AccordionSummary
                expandIcon={<ExpandMore />}
                className="search-summary"
            >
                Search Reviews
            </AccordionSummary>
            <AccordionDetails>

            </AccordionDetails>
            <AccordionActions className="search-actions">
                <div className="search-actions-options">
                    <div className="search-actions-query-params">
                        <TextField className="search-actions-name"
                            name="c_name"
                            label="Sake Name"
                            sx={{margin: 'auto'}}
                        />
                        <FormControl className="search-actions-type" sx={{margin: 'auto'}}>
                            <InputLabel>Sake Type</InputLabel>
                            <Select
                                name="c_sake_type"
                                label="Sake Type"
                                value={""}
                            >
                                {sakeTypes.map((type) => {
                                    <MenuItem 
                                        key={type.value} 
                                        value={type.value}
                                    >
                                        {type.label}
                                    </MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="search-actions-tag-params">
                        <div className="search-actions-tag-display">
                            <Typography variant='body1'>Tags:</Typography>
                            <div className="search-actions-tag-list">
                                {/* TODO: swap tagList for tagParams (actual selected items) */}
                                {tagList.map((tag) => {
                                    return(
                                        <Chip 
                                            key={tag['c_id']}
                                            label={tag['c_tag_name']}
                                            onDelete={() => handleDelete(tag)}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                        <Autocomplete className="search-actions-tags-input"
                            freeSolo
                            options={tagList.map((tag) => tag['c_tag_name'])}
                            renderInput={(params) => <TextField {...params} label="Tag Search" />}
                        />
                    </div>
                </div>
                <div className="search-actions-button-top">
                    <Button 
                        className="search-actions-button" 
                        onClick={handleSearch}
                        variant="contained"
                        disableElevation
                    >
                            Search
                    </Button>
                </div>
            </AccordionActions>
        </Accordion>
    )
}