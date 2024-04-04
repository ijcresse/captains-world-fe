import Grid from '@mui/material/Grid';

const Row = ({children}) => {
    return(
        <Grid direction="row">
            {children}
        </Grid>
    )
}

const Column = ({size, children}) => {
    return(
        <Grid direction="column" >
            {children}
        </Grid>
    )
}

export {Row, Column}