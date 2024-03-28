import { createContext, useContext, useMemo, useState } from "react"
import {useCookies} from 'react-cookie'
import axios from "axios"

const AppContext = createContext()



export function UserProvider({children}) {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const [convertBlob, setConvertBlob] = useState(null)
    const [lectures, setLectures] =useState(null)
    

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
            console.log(error)
            
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

    const getLectures = async()=>{
        try {
            let response = await axios({
                method: "get",
                url: "http://localhost:3000/api/audio/upload",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookies.token}`
                }
                
            })
    }catch(error){
        console.error(error.message)
    }
}

    function convertWebMToWAV(blobData){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
        const arrayBuffer = reader.result;
        const audioContext = new AudioContext();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
        const wavBuffer = audioContext.createBuffer(
            1,
            audioBuffer.length,
            audioBuffer.sampleRate
        );
    
        const channelData = wavBuffer.getChannelData(0);
        channelData.set(audioBuffer.getChannelData(0));
    
        const wavData = wavBuffer.getChannelData(0);
        resolve(wavData);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(blobData);
    });
 
    };


    

    const generateFileName = (extension) => {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        return `${timestamp}-${randomString}.${extension}`;
      };

    const uploadAudio = async(data) =>{
    const fileName = generateFileName('wav');
  const wavData = await convertWebMToWAV(data);
  console.log(wavData)

  const formData = new FormData();
   formData.append('file', new Blob([wavData]), fileName);
 console.log(formData)

      }

    const value = useMemo(
        () => ({
            cookies,
            login,
            signUp,
            logout,
            uploadAudio,
            getLectures,
            lectures
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