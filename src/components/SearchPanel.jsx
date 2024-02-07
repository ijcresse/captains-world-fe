import { useContext, useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionActions,
    AccordionDetails,
    Button,
    FormControl,
    InputLabel,
    TextField,
    MenuItem,
    Select
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { WithContext as ReactTags } from 'react-tag-input';

import { ServerContext } from '../context/ServerContext';
import { sakeTypes } from '../util/strings';
import { ToastContext } from '../context/ToastContext';

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
    const [tagParam, setTagParam] = useState();
    //list of tags for autocomplete purposes
    const [tagList, setTagList] = useState();

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

    const handleInputChange = (e) => {
        const {name, value} = e.target;
    }

    const handleSearch = () => {
        //assemble data from tags

        //temp
        fetchTags();
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
            <AccordionActions>
                <TextField
                    name="c_name"
                    label="Sake Name"
                />
                <FormControl>
                    <InputLabel>Sake Type</InputLabel>
                    <Select
                        name="c_sake_type"
                        label="Sake Type"
                        value={sakeTypes[0].value}
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
                
                <Button onClick={handleSearch}>Search</Button>
            </AccordionActions>
        </Accordion>
    )
}