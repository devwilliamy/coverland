import React from 'react'
import styles from "./style.module.css"
import logo from "../../assets/images/logo.png"
import search from "../../assets/images/search.png"
import Garage from "../../assets/images/Garage.png"
import call from "../../assets/images/call.png"
import acount from "../../assets/images/acount.png"
import cart from "../../assets/images/cart.png"
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

function Header() {

  const Cart = dynamic(() => import('@/components/header/Cart'));

const coverTypes = [
  { title: 'Car Covers', link: '/car-covers' },
  { title: 'SUV Covers', link: '/suv-covers' },
  { title: 'Truck Covers', link: '/truck-covers' },
];


  return (
    <>
   <div className='Headermian'>
    <div className='container'>
        <div className={styles.topHeader}>
            <div className={styles.leftLogo}>
                <span><a href="#"> <Image src={logo} alt=""/> </a> </span>
                <div className={styles.fromGroup}>
                    <input type='text' placeholder='What vehicle are you looking for?'/>
                    <span><Image src={search} alt=""/></span>
                </div>
            </div>

            <div className={styles.rightLinks}>
                <ul>
                    <li><a href="#"><Image src={Garage} alt=""/> My Garage</a></li>
                    <li><a href="#"><Image src={call} alt=""/></a></li>
                    <li><a href="#"><Image src={acount} alt=""/></a></li>
                    <li><Cart /></li>
                </ul>
            </div>
        </div>
        <div className={styles.topnavBar}>
        <nav className="navbar navbar-expand-lg pt-0 ">
  <div className="container-fluid p-0">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ">

    
        {coverTypes.map(({ title, link }) => (
          <li className="nav-item">
          <a className="nav-link" href={link}>{title}</a>
        </li>
          ))}
      
      </ul>
    
    </div>
  </div>
</nav>
        </div>
    </div>
   </div>
   <div className={styles.freeOfer}>
        <h5>February Special Sale!</h5>
        <h6>SAVE UP TO 50%</h6>
   </div>
   </>
  )
}

export default Header