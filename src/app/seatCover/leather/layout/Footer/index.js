import React from 'react'
import styles from "./style.module.css"
import wtarow from "../../assets/images/wtarow.png"
import env from "../../assets/images/env.png"
import fb from "../../assets/images/fb.png"
import yube from "../../assets/images/yube.png"
import chat from "../../assets/images/chat.png"
import location from "../../assets/images/location.png"
import card from "../../assets/images/card.png"
import mobcard from "../../assets/images/mobcard.png"
import Image from 'next/image';

function Footer() {
  return (
    <div className={styles.footer_bot}>
        <div className='container'>
            <div className='row'>
                <div className='col-md-4'>
                    <div className={styles.footerRight}>
                    <h5>STAY CONNECTED</h5>
                    <p>Subscribe to stay up to date on the latest products, deals, and more.</p>
                    <div className={styles.newLetter}>
                        <input type='submit' placeholder='Your Email'/>
                        <button><Image src={wtarow} alt=""/></button>
                    </div>
                    <ul className={styles.socialMedia}>
                        <li><a href='#'><Image src={fb} alt=""/></a></li>
                        <li><a href='#'><Image src={yube} alt=""/></a></li>
                    </ul>
                    </div>
                </div>
                <div className='col-md-8'>
                <div className={styles.footerLight}>
                    <div className='row'>
                    <div className='col-md-4'>
                    <div className={styles.footerLinks}>
                            <h6>Need Help?</h6>
                            <label>Call us </label>
                            <h5>1-800-799-5165</h5>
                            <label>Mon-Fri 9am-5pm PST</label>
                            <ul>
                                <li><Image src={env} alt=""/>info@coverland.com</li>
                                <li><Image src={chat} alt=""/>start live chat</li>
                                <li><Image src={location} alt=""/>15529 Blackburn Ave, <br/> Norwalk, CA 90650</li>
                            </ul>
                        </div>
                        </div>
                        <div className='col-md-4'>
                        <div className={styles.footerLinks}>
                            <h6>Customer services</h6>
                            <ul className={styles.menuLink}>
                                <li><a href='#'>My orders</a></li>
                                 <li><a href='#'>FAQ</a></li>
                                <li><a href='/contact'>Contact Us</a></li> 
                                <li><a href='#'>Coupon Code</a></li>
                                <li><a href='#'>Customer Reviews</a></li> 
                            </ul>
                        </div>
                        </div>
                        <div className='col-md-4'>
                        <div className={styles.footerLinks}>
                            <h6>Information</h6>
                            <ul className={styles.menuLink}>
                                <li><a href='#'>About Coverland</a></li>
                                 <li><a href='/policies/warranty-policy'>Wrantty</a></li>
                                <li><a href='/policies/shipping-policy'>Shipping Info</a></li> 
                                <li><a href='/policies/return-policy'>Return Policy</a></li>
                                <li><a href='/policies/privacy-policy'>Privacy Policy</a></li> 
                            </ul>
                        </div>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
        <div className={styles.copyRight}>
        <div className='container'>
            <div className='row'>
                <div className='col-md-4'>
                <div className={styles.copyRightLEft}>
                    <p>Copyright © 2021 Coverland.com. All rights reserved.</p>
                    </div>
                </div>
                <div className='col-md-8'>
                <div className={styles.copyRightRift}>
                    <Image className={styles.deskCard} src={card} alt=""/>
                    <Image className={styles.MobdeskCard} src={mobcard} alt=""/>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer