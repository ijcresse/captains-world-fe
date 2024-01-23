import { createContext, useState } from 'react';

const ServerContext = createContext(null);
const prod = import.meta.env.PROD;
const flaskPort = 5000;
const hourInMillis = 60 * 60 * 1000

function ServerProvider({children}) {
    const serverOrigin = prod ? window.location.origin : `http://${window.location.hostname}:${flaskPort}`
    const [authorized, setAuthorized] = useState(false);
    const [authThreshold, setAuthThreshold] = useState(0);

    function isAuthorized() { 
        if (authThreshold > Date.now()) {
            return true;
        }
        let req = new Request(`${serverOrigin}/api/user/session`, {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        })
        fetch(req)
            .then(res => {
                if (res.status === 200) {
                    setAuthorized(res.status === 200);
                    setAuthThreshold(Date.now() + hourInMillis)
                }
                
            })
            .catch(err => {
                console.error(err);
                setAuthorized(false);
            })
        return authorized;
    }

    return (
        <ServerContext.Provider value={{serverOrigin, isAuthorized, setAuthThreshold}}>
            {children}
        </ServerContext.Provider>
    )
}

export { ServerContext, ServerProvider }