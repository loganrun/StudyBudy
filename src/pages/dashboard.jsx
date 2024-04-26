import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DisplayLecture from '../components/DisplayLecture';
import Navbar from '../components/NavBar';
import { setLectures } from '../reducers/lecturesSlice';
import axios from 'axios';


function Dashboard() {
    const lectures = useSelector((state) => state.lectures.lectures);
  const isLoading = useSelector((state) => state.lectures.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    const findLectures = async () => {
      try {
        let response = await axios({
          method: 'get',
          url: 'http://localhost:3000/api/lecture/',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        //console.log(response);
        dispatch(setLectures(response.data));
      } catch (error) {
        console.error(error.message);
      }
    };
    findLectures();
  }, [dispatch]);

    

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
