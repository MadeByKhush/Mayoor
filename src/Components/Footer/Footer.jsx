import React from "react";

const Footer = () => {
  return (
    <footer className="bg-card-light pt-16 pb-8" id="contact">
      <div className="container mx-auto px-6">

        {/* Top Grid */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Brand / Contact Section */}
          <div>
            <div className="flex items-center space-x-3">
              <span className="text-[1.8rem] font-bold text-primary">
                Mayoor International School
              </span>
            </div>

            <p className="mt-4 text-sm text-text-light-secondary">
              Committed to excellence in education and character development.
            </p>


            <div className="mt-6 md:mt-16">
              <h3 className="font-bold text-text-light-primary mb-4">Contact Us</h3>
              <ul className="mt-5 space-y-3 text-sm text-text-light-secondary">
                <li className="flex items-start">
                  <span className="material-icons text-lg mr-2 text-primary">location_on</span>
                  Sector 8 KBHB, Jodhpur (Raj.), 342005
                </li>

                <li className="flex items-start">
                  <span className="material-icons text-lg mr-2 text-primary">phone</span>
                  +91 9166929992
                </li>

                <li className="flex items-start">
                  <span className="material-icons text-lg mr-2 text-primary">email</span>
                  mayoorinternationalschool@gmail.com
                </li>
              </ul>
            </div>
          </div>

          {/* MAP SECTION */}
          <div>
            <h3 className="font-bold text-text-light-primary mb-4">Our Location</h3>

            <div className="w-full h-64 md:h-72 rounded-lg overflow-hidden shadow-lg">
              <iframe
                title="School Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.6539827048186!2d73.03051827524648!3d26.20793197707422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418bafcfffffff%3A0xdbd9241fcadd7f59!2sMayoor%20International%20Senior%20Secondary%20School%20kudi%20bhagtasni%20housing%20board%20jodhpur!5e0!3m2!1sen!2sin!4v1763278612786!5m2!1sen!2sin"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-text-light-secondary">
          <p>© 2026 Mayoor International School. All Rights Reserved.</p>

          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a className="hover:text-primary" href="https://www.facebook.com/profile.php?id=100064094377046">Facebook</a>
            <a className="hover:text-primary" href="https://www.youtube.com/@mayoorinternationalschoolj5474">Youtube</a>
            <a className="hover:text-primary" href="https://www.instagram.com/mayoor_international_school/">Instagram</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
