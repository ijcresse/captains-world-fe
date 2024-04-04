import { useState, createContext } from 'react';

const ServerContext = createContext(null);
const prod = import.meta.env.PROD;
const flaskPort = 5000;

function ServerProvider({children}) {
    const serverOrigin = prod ? window.location.origin : `http://${window.location.hostname}:${flaskPort}`
    const [auth, setAuth] = useState(false);

    function isAuthorized() {
        let req = new Request(`${serverOrigin}/api/user/session`, {
            method: 'get',
            mode: 'cors',
            credentials: 'include'
        })
        fetch(req)
            .then(res => {
                res.status === 200 ? setAuth(true) : setAuth(false);
            })
            .catch(err => {
                console.error(err);
                setAuth(false);
            })
        return auth;
    }

    return (
        <ServerContext.Provider value={{ serverOrigin, isAuthorized }}>
            {children}
        </ServerContext.Provider>
    )
}

export { ServerContext, ServerProvider }