import React , {useState} from 'react'
import './Header.css'
import {BiMenuAltRight} from 'react-icons/bi'
import OutsideClickHandler from 'react-outside-click-handler'
import { Link, NavLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import AddPropertyModal from '../AddPropertyModal/AddPropertyModal'
import useAuthCheck from '../../hooks/useAuthCheck.jsx'


const Header = () => {

  const[menuOpened , setMenuOpened] = useState(false)
  const {loginWithRedirect , isAuthenticated , user , logout} = useAuth0()
  const [modalOpened , setModalOpened] = useState(false);
  const {validateLogin} = useAuthCheck()
  const handleAddPropertyClick = ()=>{
    if(validateLogin()){
      setModalOpened(true)
    }
  }

  const getMenuStyles = (menuOpened) =>{
    if(document.documentElement.clientWidth <= 800){
      return {right : !menuOpened && "-100%"}
    }
  }

  return (
    <section className='h-wrapper'>
        <div className="flexCenter paddings innerWidth h-container">
            <Link to="/">
            <img src="./public/logo.png" alt="logo" width={100} />
            </Link>

            <OutsideClickHandler
            onOutsideClick = {()=>{
              setMenuOpened(false)
            }}>
            <div className="flexCenter h-menu "
            style={getMenuStyles(menuOpened)}
            >
              
            {/* link to properties page */}
            <NavLink to="/properties">Properties</NavLink>
            
            <a href="">Contact Us</a>
            

            {/* add property */}
            <div onClick={handleAddPropertyClick}>Add property</div>
            <AddPropertyModal
            opened={modalOpened}
            setOpened = {setModalOpened}/>

            {/* login button */}
            {
              !isAuthenticated ? (
               <button className='button' onClick={loginWithRedirect}>
                Login
               </button> 
               )
               :
               (
               //profile menu for user
               <ProfileMenu user={user} logout={logout}
               />
              )
            }
          </div>
          </OutsideClickHandler>
          <div className="menu-icon" onClick = {() =>setMenuOpened((prev) =>!prev)}>
          <BiMenuAltRight size={30}/>
        </div>
        </div>

        
    </section>
  )
}

export default Header




