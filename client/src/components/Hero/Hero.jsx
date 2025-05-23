import React from 'react'
import './Hero.css'
import CountUp from 'react-countup'
import {motion} from 'framer-motion'
import SearchBar from '../SearchBar/SearchBar'

const Hero = () => {
  return (
    <section className='hero-wrapper'>
        <div className=" paddings innerWidth flexCenter  hero-container">

            {/* left side */}
            <div className=" flexColStart hero-left">
                <div className="hero-title">
                    <div className="orange-circle"/>

                    {/* animation */}
                    <motion.h1
                    initial={{y:'2rem' , opacity:0}} 
                    animate={{y:0 , opacity:1}}
                    transition={{
                        duration:2,
                        type:"spring"
                    }}
                    > Discover <br/> Most Suitable< br/> Property
                    </motion.h1>
                </div>
                <div className="flexColStart hero-description">
                    <span  className='secondaryText'>Find variety of Properties that suits you very easily </span>
                    <span className='secondaryText'>Forget all difficulties in finding a residence for you</span>
                </div>

                {/* search bar */}
                {/* seprate component is made for searchbar to use it again */}
                <SearchBar/>

                {/* stats  */}
                <div className="stats flexCenter">
                    <div className="flexColCenter stat">
                        <span>
                            
                            <CountUp start={8800} end={9000} duration={4}/>
                            <span>+</span>
                        </span>
                        <span className='secondaryText'>Premium Properties</span>
                    </div>

                    <div className="flexColCenter stat">
                        <span>
                            
                            <CountUp start={9950} end={11050} duration={4}/>
                            <span>+</span>
                        </span>
                        <span className='secondaryText'>Happy Customers</span>
                    </div>

                    <div className="flexColCenter stat">
                        <span>
                           
                            <CountUp  end={96} duration={6}/>
                            <span>+</span>
                        </span>
                        <span className='secondaryText'>Award Winning</span>
                    </div>
                </div>


            </div>

            {/* right side */}
            <div className="flexCenter hero-right">

                {/* animation */}
                <motion.div 
                initial={{x:'7rem' , opacity:0}} 
                animate={{x:0 , opacity:1}}
                transition={{
                    duration:2,
                    type:"spring"
                }}
                className="image-container">
                    <img src="./public/hero-image.png"  />
                </motion.div>
            </div>
        </div>
    </section>
  )
}

export default Hero