import { createContext, useContext, useMemo } from "react"
import {useCookies} from 'react-cookie'
import axios from "axios"

const AppContext = createContext()



export function UserProvider({children}) {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    
    // const [userId, setUserId] = useState(cookies.userId)
    // const [userName, setUserName] = useState(cookies.userName)
    // const [userEmail, setUserEmail] = useState(cookies.userEmail)
    // const [userPhone, setUserPhone] = useState(cookies.userPhone)
    // const [userAddress, setUserAddress] = useState(cookies.userAddress)
    // const [userCity, setUserCity] = useState(cookies.userCity)
    // const [userState, setUserState] = useState(cookies.userState)
    // const [userZip, setUserZip] = useState(cookies.userZip)
    // const [userCountry, setUserCountry] = useState(cookies.userCountry)
    // const [userImage, setUserImage] = useState(cookies.userImage)

    const login = async(formData)=>{

        try {
            let response = await axios({
                method: "post",
                url: "http://localhost:3000/api/auth",
                data: formData,
                headers: {
                    "Content-Type": "application/json"
                }
            })
    
            setCookie('token', response.data.token)
    
        } catch (error) {
            
        }
    
        
    
    
    }
    
    const signUp = async(formData)=>{
    
        try {
            let response = await axios({
                method: "post",
                url: "http://localhost:3000/api/users",
                data: formData,
                headers: {
                    "Content-Type": "application/json"
                }
            })
    
            setCookie('token', response.data.token)
    
        } catch (error) {
            
            
        }
    
    }

    const logout = () => {
        ['token'].forEach((obj)=>{removeCookie(obj);});
        setToken(null)
        setUserId(null)
        setUserName(null)
        setUserEmail(null)
        setUserPhone(null)
        setUserAddress(null)
        setUserCity(null)
        setUserState(null)
        setUserZip(null)
        setUserCountry(null)
        setUserImage(null)
    }

    const value = useMemo(
        () => ({
            cookies,
            login,
            signUp,
            logout
        }),
        [cookies])
  return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}

export const useAuth = () =>{
    return useContext(AppContext)
}