import React from 'react'
import delivery from '../img/delivery.png'
import video from '../img/1.mp4'

const HomeContainer = ({ resultRef }) => {
    const onSubmit = (e) => {
        e.preventDefault();
        resultRef.current.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id="home">
            <div className='py-2 flex-1 flex flex-col items-start justify-center gap-6'>
                <div className='flex items-center gap-2 justify-center bg-orange-100 px-2 py-1'>
                    <p className='text-base text-orange-500 font-semibold'>Bike Delivery</p>
                    <div className='w-8 h-8 rounded-full overflow-hidden bg-white'>
                        <img src={delivery} className="w-full h-full object-contain" alt="bike" />
                    </div>
                </div>
                <p className="text-[2.6rem] lg:text-[2.6rem] font-bold tracking-wide text-headingColor">
                    The Fastest Delivery in
                    <span className="text-orange-600 text-[3rem] lg:text-[3rem]">
                        Your City
                    </span>
                </p>
                <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>Delivery Hero is present in over 70 countries across four continents. We operate a wide range of local brands that are united behind our shared mission to always deliver an amazing experience - fast, easy, and to your door.</p>
                <button type='button' className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100'
                    onClick={onSubmit}
                >Order Now</button>
            </div>
            <div className='py-2 flex-1 flex items-center'>
                {/* <img className='ml-auto h-650' src={HeroBg} alt="bg image" /> */}
                <video style={{ borderRadius: "10%" }} loop muted autoPlay controls='' >
                    <source src={video} type="video/mp4">
                    </source>
                </video>
            </div>
        </section>

    )
}

export default HomeContainer