import { useContext, useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Link,
    Divider,
    Button
} from '@mui/material';

import { ServerContext } from '../context/ServerContext';
import { ToastContext } from '../context/ToastContext';
import Login from './Login';

function AdminMenu({open, handleClose}) {
    const { serverOrigin, isAuthorized } = useContext(ServerContext);
    const { createToast } = useContext(ToastContext);
    
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

    //TODO: component drilling
    const unauthMenu = (
        <div>
            <Login handleClose={handleClose} />
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
                window.location.reload();
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
                    unauthMenu
                }
            </DialogContent>
        </Dialog>
    )
}

export default AdminMenu;