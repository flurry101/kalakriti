import { FC } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const AboutPage: FC = () => {
  const navigate = useNavigate();
  const features = [
    {
      title: "Digital Preservation",
      description: "Preserving India's rich folk art heritage through digital documentation and storytelling."
    },
    {
      title: "Artist Empowerment",
      description: "Providing a platform for folk artists to showcase their work and connect with global audiences."
    },
    {
      title: "Cultural Bridge",
      description: "Creating a bridge between traditional art forms and modern digital platforms."
    },
    {
      title: "Sustainable Livelihoods",
      description: "Supporting artists by enabling direct engagement with art enthusiasts and collectors."
    }
  ];

  const techStack = [
    { name: "React + Vite", category: "Frontend" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "Supabase", category: "Backend & Auth" },
    { name: "Framer Motion", category: "Animations" },
    { name: "i18next", category: "Multilingual Support" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex-grow pt-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About KalaKriti</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A digital platform preserving and promoting Indian folk art by connecting artists with global audiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-orange-50 p-8 rounded-lg"
            >
              <h3 className="text-xl font-semibold text-orange-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-4 rounded-lg shadow-md text-center"
              >
                <p className="font-semibold text-gray-900">{tech.name}</p>
                <p className="text-sm text-gray-500">{tech.category}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Whether you're an artist, art enthusiast, or supporter of cultural preservation,
            be part of this unique initiative to digitize and celebrate India's artistic heritage.
          </p>
          <button 
            onClick={() => navigate('/signin')}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all"
          >
            Get Started
          </button>
        </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};
