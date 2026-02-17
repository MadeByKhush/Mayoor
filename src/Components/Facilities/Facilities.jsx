import React from 'react'
import FacilityCard from './FacilityCard'
import { FadeUp } from '../../utils/motion'
import classroomImg from '../../assets/classroom.webp'
import labImg from '../../assets/lab.webp'
import seminarImg from '../../assets/seminar.webp'
import sportsImg from '../../assets/sports.webp'
import musicImg from '../../assets/music.webp'
import transportImg from '../../assets/transport.webp'

const Facilities = () => {
  return (
    <section className="py-20 bg-background-light">
      <div className="container mx-auto px-6">

        <FadeUp delay={0.2}>
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-primary font-semibold">OUR FACILITIES</span>
            <h2 className="text-4xl font-bold mt-2 text-text-light-primary">
              The Magical Vibes of Mayoor
            </h2>
            <p className="mt-4 text-text-light-secondary">
              We offer state-of-the-art facilities that support a well-rounded education and holistic development.
            </p>
          </div>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <FacilityCard
            image={classroomImg}
            title="Classroom"
            desc="Spacious, well-lit classrooms equipped with modern teaching aids."
          />

          <FacilityCard
            image={labImg}
            title="Labs"
            desc="Advanced science labs for hands-on learning"
          />

          <FacilityCard
            image={seminarImg}
            title="Seminar Hall"
            desc="A well-equipped seminar hall for events and presentations."
          />

          <FacilityCard
            image={sportsImg}
            title="Sports Leadership"
            desc="Empowering students to lead with confidence, teamwork, and excellence through competitive sports."
          />

          <FacilityCard
            image={musicImg}
            title="Music Education"
            desc="Developing musical skills, creativity, and confidence through structured practice and performance."
          />

          <FacilityCard
            image={transportImg}
            title="Transportation"
            desc="Safe and reliable transport services covering all major routes in the city."
          />

        </div>
      </div>
    </section>
  )
}

export default Facilities
