import React from 'react'
import bgImage from '../../assets/CTAimage.webp'

const AdmissionCTA = () => {
    return (
        <section
            className="relative bg-cover bg-center py-20"
            style={{
                backgroundImage:
                    `url(${bgImage})`,
            }}
        >
            <div className="absolute inset-0 bg-primary bg-opacity-50"></div>

            <div className="relative container mx-auto px-6 text-center text-white">
                <h2 className="text-4xl font-bold">Join the Mayoor Family</h2>

                <p className="mt-4 max-w-2xl mx-auto">
                    We are now accepting applications for the upcoming academic year.
                    Take the first step towards an enriching educational journey for your child.
                </p>

                <div className="mt-8 flex justify-center space-x-4">
                    <a
                        className="bg-white text-primary px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition-transform transform hover:scale-105"
                        href="tel:+919166929992"
                    >
                        Apply Now
                    </a>
                </div>
            </div>
        </section>
    )
}

export default AdmissionCTA
