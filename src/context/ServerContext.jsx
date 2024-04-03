import { createContext, useState } from 'react';

const ServerContext = createContext(null);
const prod = import.meta.env.PROD;
const flaskPort = 5000;

function ServerProvider({children}) {
    const serverOrigin = prod ? window.location.origin : `http://${window.location.hostname}:${flaskPort}`

    function isAuthorized() { 
        let req = new Request(`${serverOrigin}/api/user/session`, {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        })
        fetch(req)
            .then(() => {
                return true;
            })
            .catch(err => {
                console.error(err);
                return false;
            })
    }

    return (
        <ServerContext.Provider value={{serverOrigin, isAuthorized, setAuthThreshold}}>
            {children}
        </ServerContext.Provider>
    )
}

export { ServerContext, ServerProvider }