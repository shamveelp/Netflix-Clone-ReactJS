import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const useAuthChange = () => {

    const [isAuthUser, setIsAuthUser] = useState({
        email: "",
        displayName: "",
        emailVerificed: false,
        uid: 0,
    })
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const currentPath = window.location.pathname;
        onAuthStateChanged(auth, (user) => {


            if (user) {
                console.log("Logged in")
                setIsAuthUser({
                    email: user.email,
                    emailVerificed: user.emailVerified,
                    uid: user.uid,
                    displayName: user.displayName
                })
                navigate("/")

            } else {
                console.log("Logged out")
                setIsAuthUser({
                    displayName: "",
                    email: "",
                    emailVerificed: false,
                    uid: ""
                })

                if (currentPath === "/login") {
                    navigate("/login")
                } else if (currentPath === "/signup") {
                    navigate("/signup")
                } else {
                    navigate("/login")
                }
            }
            setLoading(false)
        })
    }, [])
    return { loading, isAuthUser }
}

export default useAuthChange