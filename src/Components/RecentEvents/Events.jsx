import React, { useEffect, useState } from "react";
import EventCard from "./EventCards";
import { FadeUp, ScaleIn } from "../../utils/motion";
import { supabase } from "../../supabase";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";


const Events = () => {
  const [events, setEvents] = useState([]);

  // Fetch recent events from Supabase
  const loadEvents = async () => {
    const { data, error } = await supabase
      .from("recent_events")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setEvents(data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <section className="py-20 bg-primary text-white" id="events">
      <div className="container mx-auto px-6">

        <FadeUp delay={0.2}>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold">Recent Events</h2>
            <p className="mt-4 opacity-80">
              Stay updated with the vibrant life at Mayoor. <br />
              Here are some of our recent highlights and achievements.
            </p>
          </div>
        </FadeUp>

        <ScaleIn delay={0.2}>
          <Swiper className="events-slider mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-black"
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 2500 }}
            pagination={{ clickable: true }}
            loop={true}
            spaceBetween={20}
            breakpoints={{
              300: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {events.map((ev) => (
              <SwiperSlide key={ev.id}>
                <EventCard
                  image={ev.image}
                  title={ev.title}
                  desc={ev.description}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {events.length === 0 && (
            <p className="text-white opacity-80 text-center mt-10">
              No events uploaded yet.
            </p>
          )}


        </ScaleIn>

      </div>
    </section>
  );
};

export default Events;
