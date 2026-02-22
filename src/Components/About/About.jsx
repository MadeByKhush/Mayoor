import React from "react";
import image from "../../assets/community.webp";
import { SlideLeft, SlideRight } from "../../utils/motion";
import CountUp from "react-countup";

const About = () => {
  return (
    <section className="py-20 bg-background-light" id="about">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Text Section */}
        <SlideRight delay={0.8}>
          <div>
            <p className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-4 py-1 rounded-full text-sm tracking-wide">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-80 animate-ping"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600"></span>
              </span>
              ABOUT MAYOOR INTERNATIONAL SCHOOL
            </p>

            <h2 className="text-4xl font-bold mt-2 text-text-light-primary">
              About <span className="text-primary font-bold">Mayoor International School</span>
            </h2>

            <p className="mt-4 text-text-light-secondary leading-relaxed">
              Our school's journey began with a vision to create a holistic learning environment.
              We are committed to fostering academic excellence, critical thinking, and strong moral values.
              Our dedicated faculty guides students to become confident, responsible, and compassionate global citizens.
              We believe in a partnership between the school, parents, and community to support our students' growth.
            </p>

            <div className="mt-8 flex space-x-8">

              <div>
                <p className="text-3xl font-bold text-primary">
                  <CountUp end={15} enableScrollSpy duration={3.8} />+
                </p>
                <p className="text-text-light-secondary">Years of Excellence</p>
              </div>

              <div>
                <p className="text-3xl font-bold text-primary">
                  <CountUp end={5000} enableScrollSpy duration={3.5} />+
                </p>
                <p className="text-text-light-secondary">Happy Students</p>
              </div>

            </div>
          </div>
        </SlideRight>

        {/* Right Image Section */}
        <SlideLeft delay={0.5}>
          <div className="rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <img
              src={image}
              loading="lazy"
              decoding="async"
              alt="Students at Mayoor International School"
              className="w-full h-full object-cover scale-[1.30] -translate-y-[25px]"
            />
          </div>
        </SlideLeft>

      </div>
    </section>
  );
};

export default About;
