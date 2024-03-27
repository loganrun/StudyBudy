import { createContext, useContext, useMemo, useState } from "react"
import {useCookies} from 'react-cookie'
import axios from "axios"

const AppContext = createContext()



export function UserProvider({children}) {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const [convertBlob, setConvertBlob] = useState(null)
    
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
//   try {
//     const response = await axios.post('/api/audio/upload', formData, {
        
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     console.log(response.data); // Handle the response from the server
//   } catch (error) {
//     console.error(error);
//   }
  
//   const convertWebMToWAV = (blobData) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = async () => {
//         const arrayBuffer = reader.result;
//         const audioContext = new AudioContext();
//         const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
//         const wavBuffer = audioContext.createBuffer(
//           1,
//           audioBuffer.length,
//           audioBuffer.sampleRate
//         );
  
//         const channelData = wavBuffer.getChannelData(0);
//         channelData.set(audioBuffer.getChannelData(0));
  
//         const wavData = wavBuffer.getChannelData(0);
//         resolve(wavData);
//       };
//       reader.onerror = reject;
//       reader.readAsArrayBuffer(blobData);
//     });
//   };
  
//   const generateFileName = (extension) => {
//     const timestamp = Date.now();
//     const randomString = Math.random().toString(36).substring(2, 8);
//     return `${timestamp}-${randomString}.${extension}`;
//   };
//         const blob = new Blob([data], { type: 'audio/webm' });
//         const reader = new FileReader();
//   reader.readAsArrayBuffer(blob);

//   reader.onload = async (event) => {
//     const buffer = event.target.result;
//     const file = new File([buffer], 'filename.webm', { type: 'audio/webm' });
// console.log(file)
//     const formData = new FormData();
//     formData.append('audioFile', file); 
//     console.log(formData)

//     try {
//         const response = await axios.post('/api/audio/upload', formData, {
//                  headers: {
//                    'Content-Type': 'multipart/form-data',
//                  },
//                });
//         const data = response.data; // Access data directly from response object
//         console.log('Upload successful!', data);
//       } catch (error) {
//         console.error('Upload error:', error);
//       }
 // };
        // const wavBlob = await convertWebMToWAV(Blob);

        // const file = new File([wavBlob], `${fileName.split('.')[0]}.wav`, { type: 'audio/wav' });
      
        // const formData = new FormData();
        // formData.append('file', file);
      
        // try {
        //   const response = await axios.post('/upload', formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //     },
        //   });
        //   console.log(response.data); 
        // } catch (error) {
        //   console.error(error);
        // }

            // const formData = new FormData();
            // formData.append('file', Blob);
            // console.log(Blob)
          
            // try {
            //   const response = await axios.post('/api/audio/upload', formData, {
            //     headers: {
            //       'Content-Type': 'multipart/form-data',
            //     },
            //   });
            //   console.log(response.data); 
            // } catch (error) {
            //   console.error(error);
            // }
      }

    const value = useMemo(
        () => ({
            cookies,
            login,
            signUp,
            logout,
            uploadAudio
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