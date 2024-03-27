import React from 'react'
import TextBox from '../components/TextBox'
import Navbar from '../components/NavBar'

function dashboard() {
  return (
    <>
    <Navbar />
    <div className="container mx-auto mt-4">
      <h1 className="text-2xl font-bold mb-4">Lessons</h1>
      <div className="flex justif-center space-x-4 ">
        <TextBox label="Field 1:" initialValue="Value 1" />
        <TextBox label="Field 2:" initialValue="Value 2" />
        <TextBox label="Field 3:" initialValue="Value 3" />
        <TextBox label="Field 4:" initialValue="Value 4" />
      </div>
    </div>
    </>
    
  )
}

export default dashboard
