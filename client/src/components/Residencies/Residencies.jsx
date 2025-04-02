import React from 'react'
import './Residencies.css'
import {Swiper , SwiperSlide , useSwiper} from 'swiper/react'
import 'swiper/css'
import {PuffLoader} from 'react-spinners'
import { sliderSettings } from '../../utils/Common'
import PropertyCard from '../PropertyCard/PropertyCard'
import useProperties from '../../hooks/useProperties'



const Residencies = () => {

    const {data, isError, isLoading} = useProperties() //this hook is used in hook folder

    if(isError){
        return(
          <div className="wrapper">
            <span>Error while fetching data</span>
          </div>
        )
      }
    
      if(isLoading){
        return(
          <div className="wrapper flexCenter" style={{height:"60vh"}}>
            <PuffLoader
            height="80"
            width="80"
            radius="1"
            color="#4066ff"
            aria-label='puff-loading'
            />
          </div>
        )
    
      }
  return (
    <section className="r-wrapper">
        <div className="paddings innerWidth r-container">
            <div className="r-head flexColStart">
                <span className='orangeText'>Best Choices</span>
                <span className='primaryText'>Popular Residencies</span>
             </div>

             {/* residency slider */}
             <Swiper {...sliderSettings}>
                <SliderButton />
                { data.slice(0,8).map((card , i) =>(
                        <SwiperSlide key={i}>
                            {/* This is propertyCard from components */}
                            <PropertyCard card={card}/>
                            
                        </SwiperSlide>
                    ))
                }
             </Swiper>
        </div>
    </section>
  )
}

export default Residencies;

const SliderButton = ()=>{
    const swiper = useSwiper();
    return(
        <div className=" paddings flexCenter r-buttons">
            <button onClick={ ()=> swiper.slidePrev()}>
                &lt;
            </button>
            <button onClick={ ()=> swiper.slideNext()}>
                &gt;
            </button>
        </div>
        )
    
}