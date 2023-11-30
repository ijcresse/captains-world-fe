import { createContext } from 'react';

const ServerContext = createContext(null);
const prod = import.meta.env.PROD;
const flaskPort = 5000;

function ServerProvider({children}) {
    const serverOrigin = prod ? window.location.origin : `http://${window.location.hostname}:${flaskPort}`

    return (
        <ServerContext.Provider value={serverOrigin}>
            {children}
        </ServerContext.Provider>
    )
}

export { ServerContext, ServerProvider }