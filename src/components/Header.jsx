import React, { useState } from 'react';
import { MdShoppingBasket, MdAdd, MdLogout } from 'react-icons/md';
import logo from '../img/favicon.png';
import avatar from '../img/avatar.png';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem('user', JSON.stringify(providerData[0]));
    }
    else {
      setIsMenu(!isMenu);
    }
  };
  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null
    });
  };
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow
    });
  }
  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16">
      {/* For desktop */}
      <div className="hidden md:flex w-full h-full items-center justify-between ">

        <Link to={"/"} className='flex items-center gap-2'>
          <img className='w-8 object-cover' src={logo} alt="logo" />
          <p className='text-headingColor text-xl font-bold'>Delivery Hero</p>
        </Link>

        <div className='flex items-center gap-8'>
          <ul className="flex items-center gap-8">
            <Link to={"/"} className='flex items-center gap-2'>
              <li className='text-base text-textColor hover-text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</li>
            </Link>
            <li className='text-base text-textColor hover-text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
            <Link to={"/about"} className='flex items-center gap-2'>
            <li className='text-base text-textColor hover-text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
            </Link>

          </ul>
          <div className='relative flex items-center justify-center' onClick={showCart}>
            <MdShoppingBasket className='text-textColor text-2xl cursor-pointer' />
            {
              cartItems && cartItems.length > 0 && (
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                  <p className="text-xs text-white font-semibold">{cartItems.length}</p>
                </div>
              )
            }

          </div>
          <div className='relative'>
            <motion.img
              whileTap={{ scale: 0.6 }}
              className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
              src={user ? user.photoURL : avatar} alt="avatar"
              onClick={login}
            />

            {
              isMenu && (
                <div className='w-40 bg-gray-50 rounded-lg flex flex-col absolute top-10 right-0'>
                  {
                    user && user.email === "maccoygraham322@gmail.com" && (
                      <Link to={"/createItem"}>
                        <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base' onClick={() => setIsMenu(false)}>New Item<MdAdd /></p>
                      </Link>
                    )
                  }
                  <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base'
                    onClick={logout}
                  >Logout<MdLogout /></p>
                </div>
              )
            }
          </div>
        </div>
      </div>

      {/* For Mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">

        <div className='relative flex items-center justify-center' onClick={showCart}>
          <MdShoppingBasket className='text-textColor text-2xl cursor-pointer' />
          {
            cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">{cartItems.length}</p>
              </div>
            )
          }
        </div>
        <Link to={"/"} className='flex items-center gap-2'>
          <img className='w-8 object-cover' src={logo} alt="logo" />
          <p className='text-headingColor text-xl font-bold'>Delivery Hero</p>
        </Link>
        <div className='relative'>
          <motion.img
            whileTap={{ scale: 0.6 }}
            className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
            src={user ? user.photoURL : avatar} alt="avatar"
            onClick={login}
          />
          {
            isMenu && (
              <div className='w-40 bg-gray-50 rounded-lg flex flex-col absolute top-10 right-0'>
                {
                  user && user.email === "maccoygraham322@gmail.com" && (
                    <Link to={"/createItem"}>
                      <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base' onClick={() => setIsMenu(false)}>New Item<MdAdd /></p>
                    </Link>
                  )
                }
                <ul className="flex flex-col">
                  <Link to={"/"} className='flex items-center gap-2'>
                    <li className='text-base text-textColor hover-text-headingColor duration-100 transition-all ease-in-out cursor-pointer px-4 py-2' >Home</li>
                  </Link>
                  <li className='text-base text-textColor hover-text-headingColor duration-100 transition-all ease-in-out cursor-pointer px-4 py-2' onClick={() => setIsMenu(false)}>Menu</li>
                  <Link to={"/about"} className='flex items-center gap-2'>
                    <li className='text-base text-textColor hover-text-headingColor duration-100 transition-all ease-in-out cursor-pointer px-4 py-2' onClick={() => setIsMenu(false)}>About Us</li>
                  </Link>
                </ul>
                <p className='m-2 p-2 rounded-md flex items-center gap-3 cursor-pointer transition-all duration-100 ease-in-out text-textColor bg-slate-200 text-base'
                  onClick={logout}
                >
                  Logout<MdLogout /></p>
              </div>
            )
          }
        </div>
      </div>
    </header>
  )
}

export default Header