
import { Usercontext } from "./UserContext"

export const UserContextProvider = ({ children, user }) => {
    return (
        <Usercontext.Provider value={user}>
            {children}
        </Usercontext.Provider>
    )
}