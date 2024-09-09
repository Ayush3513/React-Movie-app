import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();

  const teamMembers = [
    { name: 'John Doe', role: 'Founder & CEO', image: 'https://via.placeholder.com/150' },
    { name: 'Jane Smith', role: 'CTO', image: 'https://via.placeholder.com/150' },
    { name: 'Mike Johnson', role: 'Lead Designer', image: 'https://via.placeholder.com/150' },
    { name: 'Sarah Brown', role: 'Marketing Director', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="min-h-screen mx-auto ramu #1F1E24 text-white flex flex-col">
      <div className="flex-grow overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              About CineStream
            </span>
          </h1>

          <div className="space-y-8 sm:space-y-12">
            <section>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                CineStream is dedicated to bringing the magic of cinema to your fingertips. We aim to create a seamless, 
                immersive experience for movie enthusiasts, connecting them with a vast library of films and TV shows 
                from around the world.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">Key Features</h2>
              <ul className="list-disc list-inside text-gray-300 text-base sm:text-lg leading-relaxed">
                <li>Extensive library of movies and TV shows</li>
                <li>Personalized recommendations based on your viewing history</li>
                <li>High-quality streaming with multiple resolution options</li>
                <li>User-friendly interface for easy navigation</li>
                <li>Regular updates with the latest releases</li>
              </ul>
            </section>

           

            <section>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">Join Us on Our Journey</h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                We're constantly evolving and improving CineStream to provide the best possible experience for our users. 
                Join us on this exciting journey as we reshape the way people enjoy movies and TV shows in the digital age.
              </p>
            </section>
          </div>
        </div>
      </div>

      <div className="py-4 text-center">
        <button
          onClick={() => navigate(-1)}
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          &larr; Back to previous page
        </button>
      </div>
    </div>
  );
};

export default AboutUs;