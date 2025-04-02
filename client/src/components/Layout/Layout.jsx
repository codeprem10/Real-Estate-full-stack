import React, { useContext, useEffect } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import UserDetailContext from '../../context/UserDetailContext'
import { useMutation } from 'react-query'
import { createUser } from '../../utils/api'
import usefavourites from '../../hooks/usefavourites'
import useBookings from '../../hooks/useBookings'


const Layout = () => {

  usefavourites()
  useBookings()

  const {isAuthenticated, user , getAccessTokenWithPopup} = useAuth0()
  const {setUserDetails} = useContext(UserDetailContext)

  //is user does not exist make its documents is user exist make nothing
  const {mutate} = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token)=>createUser(user?.email , token)
  })

  useEffect(()=>{
    const getTokenAndRegister = async()=>{
      const res = await getAccessTokenWithPopup({
        authorizationParams:{
          audience:"https://dev-w4gdvyd3ugiug370.us.auth0.com/api/v2/",
          scope:"openid profile email",
        },
      });
      localStorage.setItem("access_token",res);
      setUserDetails((prev)=>({...prev,token:res}))
      mutate(res)
    };
    
    //if user is authenticated then mutate
  isAuthenticated && getTokenAndRegister();
  } , [isAuthenticated])


  return (
    <>
    <div style={{background:"var(--black)" , overflow:"hidden"}}>
       <Header/>
       {/* outlet automatically renders all childs after header */}
       <Outlet/>
    </div>
    <Footer/>
    </>
  )
}

export default Layout