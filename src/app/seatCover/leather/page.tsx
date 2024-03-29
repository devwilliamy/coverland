"use client";
import React, { useEffect, useState } from 'react'
import styles from "./style.module.css"
import star from "./assets/images/star.png"
import paypal from "./assets/images/paypal.png"
import clone from "./assets/images/clone.png"
import cltwo from "./assets/images/cltwo.png"
import clthree from "./assets/images/clthree.png"
import pack from "./assets/images/pack.png"
import right from "./assets/images/right.png"
import protect from "./assets/images/protect.png"
import width from "./assets/images/width.png"
import camera from "./assets/images/camera.png"
import fordCar from "./assets/images/fordCar.png"
import customseats from "./assets/images/customseats.png"
import icarone from "./assets/images/icarone.png"
import icartwo from "./assets/images/icartwo.png"
import icarthree from "./assets/images/icarthree.png"
import boneone from "./assets/images/boneone.png"
import bonetwo from "./assets/images/bonetwo.png"
import bonethree from "./assets/images/bonethree.png"
import bonefour from "./assets/images/bonefour.png"
import stone from "./assets/images/stone.png"
import sttwo from "./assets/images/sttwo.png"
import stthree from "./assets/images/stthree.png"
import bagone from "./assets/images/bagone.png"
import bagtwo from "./assets/images/bagtwo.png"
import bagthree from "./assets/images/bagthree.png"
import beltone from "./assets/images/beltone.png"
import belttwo from "./assets/images/belttwo.png"
import beltthree from "./assets/images/beltthree.png"
import beltfour from "./assets/images/beltfour.png"
import vranty from "./assets/images/vranty.png"
import sldone from "./assets/images/sldone.png"
import sldthree from "./assets/images/sldthree.png"
import sldfour from "./assets/images/sldfour.png"
import seatbk from "./assets/images/seatbk.png"
import angleone from "./assets/images/angleone.png"
import angletwo from "./assets/images/angletwo.png"
import Image from 'next/image';
import Header  from "./layout/Header/index";
import Footer  from "./layout/Footer/index";
import 'bootstrap/dist/css/bootstrap.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getAllColor, getUniqProduct } from '@/lib/db';
import { Button } from '@mui/material'
import { useSearchParams  } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCartContext } from '@/providers/CartProvider';
import { Suspense } from 'react';
export type TQuery = {
    year: string;
    parent_generation: string;
    type: string;
    make: string;
    model: string;
    submodel1: string;
    submodel2: string;
    make_slug: string,
    model_slug: string,
    type_slug: string,
    // submodel3: string;
  };

export default function  seatCover() { 
    

    const YourComponent = () => {
        

const { addToCart } = useCartContext();

type ProductData = {
base_sku: string | null;
display_color:string | null;
display_id: string | null;
feature: string | null;
make: string | null;
make_slug:string | null;
model:string | null;
model_slug:string | null;
msrp: string | null;
parent_generation: string | null;
price: string | null;
product: string | null;
product_name: string | null;
product_type: string | null;
quantity:string | null;
sku:string | null;
sku_suffix: string | null;
status: string | null;
submodel1:string | null;
submodel2:string | null;
submodel3:string | null;
type: string | null;
year_generation:string | null;
year_options: string | null;

};

const [modelDataProduct, setModelDataProduct] = useState<string[]>(
    []
  );
const [productDataImage, setProductDataImage] = useState<string[]>([]);
const [productDataColor, setProductDataColor] = useState<string[]>([]);
const searchParamsData = useSearchParams()
const [showAllImages, setShowAllImages] = useState(false);
const maxImagesToShow = 3; // Maximum number of images to show initially
const  id = searchParamsData?.get('id')
const  yearData = searchParamsData?.get('year')

const fetchData = async (id: any) => {
  try {
    const response = await getUniqProduct({
      product_id: id ?? 'CL-SC-10-FB-115-BE-1TO-0001',
    });
    setModelDataProduct(response);
    setProductDataImage(response.product.length > 0 ? response.product.split(',') : []);
    const cartProduct = modelDataProduct.find((p) => p.display_color === color);
  } catch (error) {
    console.error('[Model Search]: ', error);
  }
};
const fetchDataColor = async () => {
    try {
      const response_color = await getAllColor({
         type: modelDataProduct.type,
         make: modelDataProduct.make,
         model: modelDataProduct.model,
         year: yearData,
         submodel1: modelDataProduct.submodel1,
      });
      setProductDataColor(response_color);
    } catch (error) {
      //console.error('[Model Search]: ', error);
    }
  };
  fetchDataColor();
useEffect(() => {
  if (id) {
    fetchData();
  }
}, [id]);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
           
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1.5,
                slidesToScroll: 1.5,
              }
            }
          ]
      };
      const handleShowAllImages = () => {
        setShowAllImages(true);
      };
      const router = useRouter();
      const handleAddToCart = () => {
       addToCart({ ...modelDataProduct, quantity: 1 });
         router.push('/checkout');
    };


      
      
      
        return (
          <div>
             <div className={styles.Detailpage}>
            <div className={styles.pagination}>
                <div className='container'>
                    <ul>
                        <li><a href='/'>Home</a></li>
                        <li><a href='#'>Seat Cover</a></li> 
                    </ul>
                </div>
            </div>
            <div className={styles.detailProduct}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 mob-pad-zero'>
                    <div className={styles.detailProductLeft}>
                        <div className={styles.topImage}>
                                <Image width={800}  height={600} src={modelDataProduct.feature} alt=""/>
                                </div>
                                <div className='mobile_gallery'>
                                <div className='row'>
                               {productDataImage.slice(0, showAllImages ? undefined : maxImagesToShow).map((item, index) => (
                                 <div className='col-md-6'>
                                <div className={styles.recoImagesVideo}>
                                <Image width={500} height={500} src={item} alt=""/>
                                </div>
                              </div>
                              
                               ))}
                           <div className='col-md-6'>
                             <div className={styles.recoImagesVideo}>
                                <h5><span>More</span> Customer Images</h5>
                                <button onClick={handleShowAllImages}> <Image src={camera} alt=""/> See All photo</button>
                                </div>
                                </div>
                             </div>
                        </div>
                    </div>
                    </div>

                    <div className='col-md-6'>
                    <div className={styles.detailProductRight}>
                             <h4>{modelDataProduct.product_name}</h4>
                             <span><Image src={star} alt=""/> 1315 </span>
                             <div className={styles.ProductPrice}>
                                <h6>From</h6>
                                <h5>${modelDataProduct.price} <span>${modelDataProduct.msrp}</span><label>(-50%)</label></h5>
                                <p>4 interest-free installments of <span> $24.99 </span> <Image src={paypal} alt=""/></p>
                             </div>
                             <div className={styles.SelectColor}>
                                <h6>Select Color</h6>
                                <ul>

                            {productDataColor.map((item) => (
                            <li className={item.display_color == modelDataProduct.display_color ? styles.active: 'color-uniq-li'} onClick={() => {
                                    if (modelDataProduct) {
                                        fetchData(item.sku);
                                    }
                                          }}><span><Image src={item.display_color =='Solid Gray'? clthree: item.display_color == 'Solid Black' ? clone:  cltwo } alt=""/></span></li>
                                    ))}
                                </ul>
                             </div>
                             <div className={styles.shipping}>
                                <ul>
                                    <li>
                                        <span><Image src={pack} alt=""/></span>
                                        <div>
                                            <h5>Free, Same-Day Shipping</h5>
                                            <p>Order within 9 hours 3 mins - Receive by Feb 20 </p>
                                        </div>
                                        <div className={styles.ic}>
                                        <Image src={right} alt=""/> 
                                        </div>
                                    </li>
                                    <li>
                                        <span><Image src={pack} alt=""/></span>
                                        <div>
                                            <h5>Free Returns & Purchase Protection</h5>
                                        </div>
                                        <div className={styles.ic}>
                                        <Image src={right} alt=""/> 
                                        </div>
                                    </li>
                                    <li>
                                        <span><Image src={protect} alt=""/></span>
                                        <div>
                                            <h5>10-Year Full Warranty</h5>
                                        </div>
                                        <div className={styles.ic}>
                                        <Image src={right} alt=""/> 
                                        </div>
                                    </li>

                                    <li>
                                        <span><Image src={width} alt=""/></span>
                                        <div>
                                            <h5>Compatible Vehicles</h5>
                                        </div>
                                        <div className={styles.ic}>
                                        <Image src={right} alt=""/> 
                                        </div>
                                    </li>
                                </ul>
                             </div>

                             <div className={styles.cartBrtn}>
                              <Button
                               onClick={() => {
                                
                                if (modelDataProduct) {
                                    console.log(modelDataProduct);
                                    handleAddToCart();
                                }
                                      }}
                                     >
                                  Add to Cart
                                     </Button>

                             </div>
                        </div>
                    </div>
                </div>
                </div>
                </div>
        </div>
        <div className={styles.modlaConfig}>
            <div className='container'>
            <div className={styles.modlaConfigInnerlay}>
                <div className='ford'>
                    <Image src={fordCar} alt=""/>
                </div>
                <div className={styles.confortSteps}>
                    <h6>Elevate Comfort and Style</h6>
                    <h3>Custom for F-150</h3>
                    <div className={styles.confortMianimg}>
                    <Image width={800} height={629} src={modelDataProduct.feature} alt=""/>
                    </div>
                    <div className='row mob-pad-zero'>
                        <div className='col-md-4 col-4 '>
                            <div className={styles.modlaConfigInner}>
                            <Image src={icarone} alt=""/>
                            <span>Comfort Fit</span>
                            </div>
                        </div>
                        <div className='col-md-4 col-4'>
                        <div className={styles.modlaConfigInner}>
                            <Image src={icartwo} alt=""/>
                            <span>Unlimited Comfort</span>
                            </div>
                        </div>
                        <div className='col-md-4 col-4'>
                        <div className={styles.modlaConfigInner}>
                            <Image src={icarthree} alt=""/>
                            <span>Easy Install</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.angleSeat}>
                    <h3>Style in Every Angle</h3>
                    <div className={styles.sngleSeatImag}>
                    <Image src={angleone} alt=""/>
                    <Image src={angletwo} alt=""/>
                    </div>
                    
                </div>

                <div className={styles.boneAngle}>
                    <h3>Comfort in Every Mile</h3>
                   <div className='row'>
                    <div className='col-md-6'>
                        <div className={styles.boneInner}>
                        <Image src={boneone} alt=""/>
                        <h5>Built-in Lumbar Support</h5>
                        <p> Mile After Mile of back support</p>
                        </div>
                    </div>
                    <div className='col-md-6'>
                    <div className={styles.boneInner}>
                        <Image src={bonetwo} alt=""/>
                        <h5>Memory Foam</h5>
                        <p> Maximum Comfort with Memory Foam</p>
                        </div>
                    </div>
                    <div className='col-md-6'>
                    <div className={styles.boneInner}>
                        <Image src={bonethree} alt=""/>
                        <h5>Breathable Cushion</h5>
                        <p> Cool Comfort in Any Climate</p>
                        </div>
                    </div>
                    <div className='col-md-6'>
                    <div className={styles.boneInner}>
                        <Image src={bonefour} alt=""/>
                        <h5>Top-Grade Leather</h5>
                        <p> Durable Luxury with Premium Leather</p>
                        </div>
                    </div>
                   </div>
                </div>
            </div>
            </div>
        </div>
        <div className={styles.staySafe}>
            <div className='container'>
            <div className={styles.staySafecontainer}>
                <h3>Stay New, Stay Fresh</h3>
                <h6>From <span>Kids</span> and <span>Pets</span> to <span>Spilled</span> Drinks,
 Your Seats Remain Spotless.</h6>
 <div className={styles.staySafebloack}>
 <Image src={stone} alt=""/>
 <h5>Effortlessly clean, from kids to pets</h5>
 </div>
 <div className={styles.staySafebloack}>
 <Image src={sttwo} alt=""/>
 <h5>Worry no more for spilled or coffee stains</h5>
 </div>
 <div className={styles.staySafebloack}>
 <Image src={stthree} alt=""/>
 <h5>Scratch-resistant, No more pet scratches</h5>
 </div>
            </div>
            </div>
        </div>

        <div className={styles.safestSteps} style={{ backgroundImage:`url(${seatbk.src})` }}>

            <div className='container'>
                <div className={styles.safestStepsContainer}>
                    <h3>Your Safety Comes First</h3>
                    <div className='row align-items-center mobile-grid mt-5'>
                        <div className='col-md-6'>
                        <div className={styles.safestStepsInnerleft}>
                        <Image src={bagone} alt=""/>
                            </div>
                        </div>
                        <div className='col-md-6'>
                        <div className={styles.safestStepsInnerright}>
                        <h5>Airbag Compatible</h5>
                        <p>Safety, seamlessly integrated</p>
                            </div>
                        </div>
                </div>

                <div className='row reverse align-items-center mt-5'>
                        <div className='col-md-6'>
                        <div className={styles.safestStepsInnerright}>
                        <h5 className='text-end'>Car seat Compatible</h5>
                        <p className='text-end'>Ensures Child Seat Compatibility</p>
                            </div>
                        </div>
                        <div className='col-md-6'>
                        <div className={styles.safestStepsInnerleft}>
                        <Image src={bagtwo} alt=""/>
                            </div>
                        </div>
                </div>

                <div className='row align-items-center mt-5'>
                        <div className='col-md-6'>
                        <div className={styles.safestStepsInnerleft}>
                        <Image src={bagthree} alt=""/>
                            </div>
                        </div>
                        <div className='col-md-6'>
                        <div className={styles.safestStepsInnerright}>
                        <h5>Anti-Slip Security</h5>
                        <p>Enhanced Grip for Ultimate Security</p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        </div>
        <div className={styles.safeComeFirst}>
        <div className='container'>
                <div className={styles.safestStepsContainer}>
                    <h3>Your Safety Comes First</h3>
                    <div className='row mob-saferty'>
                        <div className='col-md-3 col-6'>
                            <div className={styles.safeComeFirstInner}>
                            <Image src={beltone} alt=""/>
                            <h5>Belt Buckle Access</h5>
                            </div>
                        </div>

                        <div className='col-md-3 col-6'>
                        <div className={styles.safeComeFirstInner}>
                            <Image src={belttwo} alt=""/>
                            <h5>Armrest Compatible</h5>
                            </div>
                        </div>
                        <div className='col-md-3 col-6'>
                        <div className={styles.safeComeFirstInner}>
                            <Image src={beltthree} alt=""/>
                            <h5>Back Storage Pocket</h5>
                            </div>
                        </div>
                        <div className='col-md-3 col-6'>
                        <div className={styles.safeComeFirstInner}>
                            <Image src={beltfour} alt=""/>
                            <h5>Front storage Pocket</h5>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
        </div>
        <div className={styles.waranty}>
            <div className='container'>
                <h3>10-Year Warranty</h3>
                <h5>Available for a Limited Time</h5>
                <Image src={vranty} alt=""/>
                <ul>
                    <li><b>All Damage Covered:</b> Beyond factory defects.</li>
                    <li><b>Normal Wear:</b> Covers daily use impacts.</li>
                    <li><b>Effortless Claims: </b>Easy, no questions asked.</li>
                </ul>
            </div>
        </div>
    
        <div className={styles.coverslides}>
            <div className='container'>
                <h3>You may also like</h3>
                <Slider {...settings}>
                    
                        <div className={styles.coverslidesinner}>
                            <div className={styles.imgCover}>
                        <Image src={sldone} alt=""/>
                        </div>
                        <h4>Premium Plus™</h4>
                        <p>Custom-Fit Car Cover</p>
                        <h5>$119.95 <span>$240</span></h5> 
                        </div>
                        <div className={styles.coverslidesinner}>
                        <div className={styles.imgCover}>
                        <Image src={sldfour} alt=""/>
                        </div>
                        <h4>Premium Plus™</h4>
                        <p>Custom-Fit Car Cover</p>
                        <h5>$119.95 <span>$240</span></h5>
                        </div>
                    <div className={styles.coverslidesinner}>
                        <div className={styles.imgCover}>
                        <Image src={sldthree} alt=""/>
                        </div>
                        <h4>Premium</h4>
                        <p>Custom-Fit Car Cover</p>
                        <h5>$119.95 <span>$240</span></h5>
                        </div>
                   
                    <div className={styles.coverslidesinner}>
                        <div className={styles.imgCover}>
                        <Image src={sldfour} alt=""/>
                        </div>
                        <h4>Premium Plus™</h4>
                        <p>Custom-Fit Car Cover</p>
                        <h5>$119.95 <span>$240</span></h5>
                        </div>
                   
                </Slider>
            </div>
        </div>
          </div>
        );
      };


    return(
      <>
     
      <Header />
      <Suspense fallback={<></>}>

      <YourComponent />
      
      </Suspense>
        <Footer />
       
     </>
)
    
  }

