import React from "react";
// import bgvideo from "../../assets/videoplayback.mp4";//
import image from "../../assets/Herobuilding.webp";
import { FadeUp, SlideRight } from "../../utils/motion";

const Hero = () => {

    return (
        <section className="relative h-[660px] overflow-hidden">

            {/* Background Video */}
            {/* <video
                className="
          absolute top-0 left-0
          min-w-[120%] min-h-[120%]
          object-cover
          scale-100
          -translate-x-[-50px]
        "
                src={bgvideo}
                autoPlay
                loop
                muted
                playsInline
            ></video> */}

            <img src={image} alt="Hero" className="absolute top-0 left-0 w-full h-full object-cover  min-w-[120%] min-h-[120%] -translate-x-[-15px] -translate-y-[130px] " />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-black/10"></div>

            {/* Content */}
            <div className="relative container mx-auto px-6 h-full flex flex-col justify-center text-white">
                <SlideRight delay={1}>
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-2xl">
                        Nurturing Young Minds for a Brighter Future
                    </h1>

                    <p className="mt-4 text-lg max-w-xl">
                        At Mayoor, we provide a stimulating environment where students can
                        discover their potential and achieve excellence.
                    </p>
                </SlideRight>

                <FadeUp delay={1.2}>
                    <div className="mt-8 flex space-x-2 md:space-x-4">
                        <a
                            className="bg-primary text-white px-4 py-2 md:px-8 md:py-3 rounded-full text-sm md:text-lg font-semibold hover:bg-green-800 transition-transform transform hover:scale-105 whitespace-nowrap"
                            href="#"
                        >
                            Explore Programs
                        </a>
                        <a
                            className="bg-white text-primary px-4 py-2 md:px-8 md:py-3 rounded-full text-sm md:text-lg font-semibold hover:bg-gray-200 transition-transform transform hover:scale-105 whitespace-nowrap cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                const section = document.getElementById('virtual-tour');
                                if (section) {
                                    section.scrollIntoView({ behavior: 'smooth' });
                                    setTimeout(() => {
                                        window.dispatchEvent(new Event('openVirtualTourModal'));
                                    }, 600);
                                }
                            }}
                        >
                            Virtual Tour
                        </a>
                    </div>
                </FadeUp>
            </div>

        </section>
    );
};

export default Hero;
