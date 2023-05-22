/* eslint-disable no-unused-vars */
import React from 'react'
import './index.css';

const CTA = () => {
  return (
    <div className='cta-wrapper'>
        <div className="cta-header">
            <h1 className="cta-main-header">Join KYPE now!</h1>
            <h2 className="cta-sub-header">- &quot;Why?&quot;</h2>
        </div>
        <div className="cta-img-prompts">
            <div className="cta-card">
                <img src="/src/assets/online-review-animate.svg" alt="Online Review Animation" className="cta-card-img" />
                <div className="cta-card-text">Manage your reviews</div>
            </div>
            <div className="cta-card">
                <img src="/src/assets/hidden-animate.svg" alt="Review Anonymously Animation" className="cta-card-img" />
                <div className="cta-card-text">Give reviews Anonymously</div>
            </div>
            <div className="cta-card">
                <img src="/src/assets/upvote-animate.svg" alt="Upvote Reveiws Animation" className="cta-card-img" />
                <div className="cta-card-text">Upvote others reviews</div>
            </div>
        </div>
        <button className="cta-signup">Sign Up</button>
    </div>
  )
}

export default CTA