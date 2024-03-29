import {useEffect, useState} from 'react'
import DisplayLecture from '../components/DisplayLecture'
import Navbar from '../components/NavBar'
import axios from 'axios'


function Dashboard() {
    const [lectures, setLectures] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const findLectures = async() =>{
            try {
                let response = await axios({
                    method: "get",
                    url: "http://localhost:3000/api/audio/upload",
                    headers: {
                        "Content-Type": "application/json",
                    }
                    
                })
                //console.log(response)
                setLectures(response.data)
                setIsLoading(false)
        }catch(error){
            console.error(error.message)
        }
    }
    findLectures()
    },[])

    

  return (
    <>
    <Navbar />
    <div className="container mx-auto mt-4">
    <h1 className="text-2xl font-bold mb-4">Lessons</h1>
    <div className="grid grid-cols-4 gap-4 gap-y-8 space-x-4 mt-20 ">
    
{isLoading ? (
        <p className="text-center">Loading...</p>
    ) : (
        lectures.map((item) => (
        <DisplayLecture key={item._id} data={item} /> 
        ))
    )}
    </div>
    </div>
    </>    
)
}

export default Dashboard
