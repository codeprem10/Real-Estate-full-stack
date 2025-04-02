import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <section className="f-wrapper">
        <div className="f-container innerWidth paddings flexCenter">

            {/* left-side */}
            <div className="flexColStart f-left">
                <img src="./logo2.png" alt="" width={120} />
                <span className="secondaryText">
                    Our vision is to make all people <br/>
                    the best place to live for them.
                </span>
            </div>

            {/* right side */}
            <div className="flecColStart f-right">
                <span className='primaryText'>Information</span>
                <span className='secondaryText'>Pune , Maharashtra</span>

                <div className="flexCenter f-menu">
                    <span>Property</span>
                    <span>Service</span>
                    <span>Product</span>
                    <span>About Us</span>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Footer