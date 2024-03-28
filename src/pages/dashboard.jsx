import {useEffect, useState} from 'react'
//import TextBox from '../components/TextBox'
import DisplayLecture from '../components/DisplayLecture'
import Navbar from '../components/NavBar'
import axios from 'axios'





function Dashboard() {
    // const [lectures, setLectures] = useState(null)

    // useEffect(()=>{
    //     const findLectures = async() =>{
    //         try {
    //             let response = await axios({
    //                 method: "get",
    //                 url: "http://localhost:3000/api/audio/upload",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 }
                    
    //             })
    //             console.log(response)
    //             setLectures(response.data)
    //     }catch(error){
    //         console.error(error.message)
    //     }
    // }
    // findLectures()
    // },[])

    

  return (
    <>
    <Navbar />
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Lessons</h1>
      <div className="flex justif-center space-x-4 mt-20">
        <DisplayLecture/>
        <DisplayLecture/>
        <DisplayLecture/>
      {/* {lectures.map((lecture, index) => (
            <TextBox key={index} label={`Field ${index + 1}:`} initialValue={lecture.transcript} />
          ))} */}
      </div>
    </div>
    </>
    
  )
}

export default Dashboard
