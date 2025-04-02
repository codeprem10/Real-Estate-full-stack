
import React, { useContext, useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import useAuthCheck from '../../hooks/useAuthCheck'
import { useMutation } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'
import UserDetailContext from '../../context/UserDetailContext'
import { checkFavourites, updateFavourites } from '../../utils/Common'
import { toFav } from '../../utils/api'

const Heart = ({id}) => {
  const[heartColor , setHeartColor] = useState("white")
  //hook made to check if user is already logged in
  const {validateLogin} = useAuthCheck()

  //importing user for email
  const {user} = useAuth0()

  //importing userDetails for token
  const {userDetails : {favourites,token} , setUserDetails,} = useContext(UserDetailContext);

  //to keep the like functionality persistent
  useEffect(()=>{
    setHeartColor(()=>checkFavourites(id , favourites))
  },[favourites])


  const {mutate} = useMutation({
    //making function toFav to update favourites array
    mutationFn:()=>toFav(id , user?.email,token),
    onSuccess:()=>{
      setUserDetails((prev)=>({
        ...prev,
        favourites:updateFavourites(id , prev.favourites)
      }))
    }
  })

  const handleLike = ()=>{
    if(validateLogin())
    {
      mutate()
      setHeartColor((prev)=> prev ==="#fa3e5f" ? "white" : "#fa3e5f")
    }
  }
  return (
    <AiFillHeart size={24} color={heartColor} onClick={(e)=>{
      e.stopPropagation()
      handleLike()
    }}/>
  )
}

export default Heart