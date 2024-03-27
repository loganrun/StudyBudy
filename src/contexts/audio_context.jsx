import { createContext, useContext, useMemo } from "react";
import axios from "axios";

const AudioContext= createContext()


export function AudioProvider({children}) {

const uploadAudio = async(Blob) =>{

  console.log(Blob)
  console.log("click")

      // const formData = new FormData();
      // formData.append('file', Blob);
    
      // try {
      //   const response = await axios.post('/api/audio', formData, {
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
    ()=>({
        uploadAudio

    }),[])
    return(
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    )

}

export const useAudio = () =>{
    return useContext(AudioContext)
}