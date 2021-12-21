import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Dropdown() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Select
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Marks</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs>
                            <Item>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="outlined-basic"
                                    label="Quiz-1 (10)"
                                    type="number"
                                    variant="standard"
                                />
                            </Item>
                        </Grid>
                        <Grid item xs>
                            <Item>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="outlined-basic"
                                    label="Quiz-2 (10)"
                                    type="number"
                                    variant="standard"
                                />
                            </Item>
                        </Grid>

                        <Grid item xs>
                            <Item>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="outlined-basic"
                                    label="Midterm (30)"
                                    type="number"
                                    variant="standard"
                                />
                            </Item>
                        </Grid>
                        <Grid item xs>
                            <Item>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="outlined-basic"
                                    label="Endterm (50)"
                                    type="number"
                                    variant="standard"
                                />
                            </Item>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default Dropdown;
