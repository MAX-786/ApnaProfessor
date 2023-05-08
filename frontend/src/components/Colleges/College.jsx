/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams } from 'react-router-dom'
import Professors from '../Professors/Professors';


const College = () => {

    const { college_id } = useParams();

  return (
    <div>
        <Professors college_id={college_id} />  
    </div>
  )
}

export default College