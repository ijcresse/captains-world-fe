import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Divider,
    Button
} from '@mui/material';

import { ServerContext } from '../context/ServerContext';
import { ToastContext } from '../context/ToastContext';
import Login from './Login';

/**
 * Controls access to administrative functionality:
 * Login / Logout
 * Link to AdminReviews page
 */
function AdminMenu({open, handleClose}) {
    const { serverOrigin, isAuthorized } = useContext(ServerContext);
    const { createToast } = useContext(ToastContext);
    const navigate = useNavigate();
    
    const authMenu = (
        <div>
            <Link to={'admin/reviews'}>
                Edit Reviews
            </Link>
            <Divider />
            <Button type="submit" size="medium" onClick={() => logout()}>
                Log Out
            </Button>
        </div>
    )

    const logout = () => {
        let req = new Request(`${serverOrigin}/api/user/logout`, {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        })
        fetch(req)
            .then(() => {
                createToast('Logged out', 'success');
            })
            .catch(err => {
                console.error(err)
                createToast('Something went wrong', 'error');
            })
            .finally(() => {
                //refresh
                navigate(0)
            });
    }

    return(
        <Dialog id="admin-top" open={open} onClose={handleClose}>
            <DialogTitle>
                Administrator Menu
            </DialogTitle>
            <DialogContent>
                {isAuthorized() ?
                    authMenu :
                    <Login handleClose={handleClose} />
                }
            </DialogContent>
        </Dialog>
    )
}

export default AdminMenu;