/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'

const Hero = () => {
  const user = useSelector(selectUser);
  console.log(user);
  return (
    <div className='hero-wrapper'>
        <div className="hero-container">
            HERO
        </div>
    </div>
  )
}

export default Hero