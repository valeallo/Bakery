
import { useState, useEffect } from "react";

const useSessionStorage = () => {
    const [loggedInUser, setLoggedInUser] = useState(null)

    useEffect(() => {
        const loggedInUser = sessionStorage.getItem('authorization')
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser)
            setLoggedInUser(foundUser)
        }
    }, [])
  
    return { loggedInUser };
};

export default useSessionStorage;