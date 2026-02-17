import React from "react";
import CurriculumCard from "./CurriculumCard";
import { FadeUp } from "../../utils/motion.jsx";
import Divider from "../Divider/Divider";

import preImg from "../../assets/pre.webp";
import primaryImg from "../../assets/primary.webp";
import middleImg from "../../assets/middle.webp";
import seniorImg from "../../assets/senior.webp";

const Curriculum = () => {

  const curriculumData = [
    {
      image: preImg,
      title: "Pre-Primary",
      desc: "A nurturing start for our youngest learners, focusing on play-based education and social skills.",
    },
    {
      image: primaryImg,
      title: "Primary",
      desc: "Building foundational knowledge in core subjects while encouraging curiosity and creativity.",
    },
    {
      image: middleImg,
      title: "Middle School",
      desc: "A transitional phase fostering independence and critical thinking to prepare for higher studies.",
    },
    {
      image: seniorImg,
      title: "Senior School",
      desc: "Preparing students for the real world with specialized streams and career guidance.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 relative" id="academics">
      <Divider />
      <div className="container mx-auto px-6 mb-12">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <FadeUp delay={0.2}><span className="text-primary font-semibold">OUR CURRICULUM</span></FadeUp>
          <FadeUp delay={0.2}><h2 className="text-4xl font-bold mt-2 text-text-light-primary">A Journey of Lifelong Learning</h2></FadeUp>
          <FadeUp delay={0.2}><p className="mt-4 text-text-light-secondary">
            Our academic programs are designed to be comprehensive and challenging,
            catering to the developmental needs of students at each stage.
          </p></FadeUp>
        </div>

        {/* Cards */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {curriculumData.map((item, index) => (
            <CurriculumCard
              key={index}
              image={item.image}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Curriculum;
