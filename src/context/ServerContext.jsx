import { createContext, useState } from 'react';

const ServerContext = createContext(null);
const prod = import.meta.env.PROD;
const flaskPort = 5000;

function ServerProvider({children}) {
    const serverOrigin = prod ? window.location.origin : `http://${window.location.hostname}:${flaskPort}`
    const [authorized, setAuthorized] = useState(false);

    function isAuthorized() { 
        let req = new Request(`${serverOrigin}/api/user/session`, {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        })
        fetch(req)
            .then(res => {
                setAuthorized(res.status === 200);
            })
            .catch(err => {
                console.error(err);
                setAuthorized(false);
            })
        return authorized;
    }

    return (
        <ServerContext.Provider value={{serverOrigin, isAuthorized}}>
            {children}
        </ServerContext.Provider>
    )
}

export { ServerContext, ServerProvider }