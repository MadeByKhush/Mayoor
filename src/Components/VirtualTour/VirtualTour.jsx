import React, { useState, useEffect } from "react";
import { FadeUp, SlideRight } from "../../utils/motion";
import VideoModal from "./VideoModal";
import previewImage from "../../assets/Herobuilding.webp";

const VirtualTour = () => {
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    useEffect(() => {
        const handleOpenModal = () => setIsVideoModalOpen(true);
        window.addEventListener('openVirtualTourModal', handleOpenModal);
        return () => window.removeEventListener('openVirtualTourModal', handleOpenModal);
    }, []);

    return (
        <section className="py-20 bg-background-light" id="virtual-tour">
            <div className="container mx-auto px-6 max-w-7xl">



                {/* Two-Column Layout */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Text & CTA */}
                    <SlideRight delay={0.4}>
                        <div className="space-y-6">
                            <h3 className="text-4xl md:text-5xl font-extrabold text-text-light-primary leading-tight">
                                Experience Our <br />
                                <span className="text-primary">Campus Live</span>
                            </h3>
                            <p className="text-lg text-text-light-secondary leading-relaxed max-w-md">
                                Take a premium guided virtual tour of our state-of-the-art facilities, modern classrooms, and vibrant campus life. See exactly where your child’s future begins.
                            </p>

                            <button
                                onClick={() => setIsVideoModalOpen(true)}
                                className="group flex items-center space-x-4 focus:outline-none"
                            >
                                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-lg group-hover:bg-green-700 transition-colors transform group-hover:scale-110 duration-300">
                                    <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 4l12 6-12 6z" />
                                    </svg>
                                </div>
                                <span className="text-lg font-semibold text-text-light-primary group-hover:text-primary transition-colors">
                                    Start Virtual Tour
                                </span>
                            </button>
                        </div>
                    </SlideRight>

                    {/* Right Column: Video Preview Card */}
                    <FadeUp delay={0.6}>
                        <div
                            className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group aspect-video"
                            onClick={() => setIsVideoModalOpen(true)}
                        >
                            {/* Base Image */}
                            <img
                                src={previewImage}
                                alt="Campus Preview"
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Premium Blur Overlay */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 backdrop-blur-[2px]"></div>

                            {/* Giant Center Play Icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/50 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white ml-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 4l12 6-12 6z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </FadeUp>
                </div>
            </div>

            {/* Modal Injection */}
            <VideoModal
                isOpen={isVideoModalOpen}
                onClose={() => setIsVideoModalOpen(false)}
                videoId="GLzgwUeJDJc"
            />
        </section>
    );
};

export default VirtualTour;
