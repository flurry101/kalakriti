import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote, Users, Calendar, MapPin } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  location: string;
  date: string;
  image: string;
  category: string;
}

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({ 
  end, 
  duration = 2000, 
  prefix = '', 
  suffix = '' 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const startValue = 0;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      setCount(Math.floor(progress * (end - startValue) + startValue));
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, end, duration]);

  return (
    <div ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
};

export const CulturalStories: React.FC = () => {
  const stories: Story[] = [
    {
      id: '1',
      title: 'The Last Madhubani Master',
      excerpt: 'KalaKriti has given my ancestral art a global stage. The world now sees the stories my grandmother used to paint.',
      author: 'Rajesh Kumar',
      location: 'Bihar, India',
      date: 'March 2024',
      image: 'https://images.pexels.com/photos/1070981/pexels-photo-1070981.jpeg',
      category: 'Artist Spotlight'
    },
    {
      id: '2',
      title: 'Revival of Kalamkari',
      excerpt: 'For the first time, I feel connected to a community that understands and values my craft. This platform is a lifeline for artisans like me.',
      author: 'Priya Nair',
      location: 'Andhra Pradesh, India',
      date: 'February 2024',
      image: 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg',
      category: 'Innovation'
    },
    {
      id: '3',
      title: 'Digital Preservation Project',
      excerpt: 'Preserving our heritage is a collective responsibility. KalaKriti is the digital campfire around which these timeless stories can be shared and kept alive.',
      author: 'Dr. Meera Sharma',
      location: 'Multiple Locations',
      date: 'January 2024',
      image: 'https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg',
      category: 'Technology'
    }
  ];

  return (
    <section id="stories" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Cultural 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"> Stories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the people, traditions, and innovations behind India's vibrant folk art heritage
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {stories.map((story, index) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {story.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {story.title}
                </h3>
                
                <div className="flex items-center text-gray-500 text-sm space-x-4 mb-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {story.date}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {story.location}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {story.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    by {story.author}
                  </span>
                  <Quote className="w-5 h-5 text-orange-400" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-xl p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Growing Impact
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Together, we're building a vibrant community that preserves and celebrates India's artistic heritage
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: 'Active Artists', value: 3, suffix: '+', icon: Users },
              { label: 'Artworks Preserved', value: 3, suffix: '+', icon: Users },
              { label: 'Monthly Visitors', value: 2, suffix: '+', icon: Users },
              { label: 'Art Forms Documented', value: 5, suffix: '', icon: Users }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>


      </div>
    </section>
  );
};