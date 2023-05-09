/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import './index.css'

const SocialLinks = (props) => {

    const {
        socialName,
        link,
        imgSrc
    } = props;

  return (
      <a className="social-icon-link" href={link}>
          <img src={imgSrc} alt={socialName} className="social-icon" />
      </a>
  )
}

export default SocialLinks