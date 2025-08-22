import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';

interface ArtStyle {
  id: string;
  name: string;
  region: string;
  description: string;
  history: string;
  techniques: string[];
  imageUrl: string;
  materials: string[];
}

const artStyles: ArtStyle[] = [
  {
    id: 'madhubani',
    name: 'Madhubani',
    region: 'Bihar',
    description: 'Madhubani art, also known as Mithila art, is characterized by complex geometrical patterns and depicts scenes from nature and Hindu religious motifs.',
    history: 'Originating in the Mithila region of Bihar, this ancient art form dates back to the time of the Ramayana. It was traditionally created by women on freshly plastered mud walls of homes using fingers, twigs, brushes, nib-pens, and matchsticks.',
    techniques: [
      'Natural dye usage',
      'Double line drawing',
      'Pattern filling',
      'Traditional motifs'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582371204276-ec650ec4dff4',
    materials: ['Natural dyes', 'Handmade paper', 'Cow dung treated paper', 'Nib-pens']
  },
  {
    id: 'warli',
    name: 'Warli',
    region: 'Maharashtra',
    description: 'Warli art is a tribal art form that uses basic geometric shapes to convey life\'s essence through minimal forms.',
    history: 'This ancient tribal art tradition of Maharashtra uses a set of basic geometric shapes: a circle, a triangle, and a square to depict daily life activities and beliefs of the Warli tribe.',
    techniques: [
      'White pigment usage',
      'Geometric patterns',
      'Basic shapes utilization',
      'Narrative style'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582556156891-16432a286e69',
    materials: ['White rice paste', 'Bamboo sticks', 'Red ochre background', 'Natural colors']
  },
  {
    id: 'kalamkari',
    name: 'Kalamkari',
    region: 'Andhra Pradesh',
    description: 'Kalamkari is a type of hand-painted or block-printed cotton textile produced using a pen-like tool (kalam).',
    history: 'The art form dates back to over 3000 years, evolving under various patronages. The word Kalamkari comes from \'kalam\' meaning pen, and \'kari\' meaning craftsmanship.',
    techniques: [
      'Natural dye application',
      'Hand painting',
      'Block printing',
      'Multiple washing processes'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1580745376307-0d09eb11c079',
    materials: ['Cotton fabric', 'Natural dyes', 'Bamboo/date palm sticks', 'Myrobalan']
  },
  {
    id: 'pithora',
    name: 'Pithora',
    region: 'Gujarat & Madhya Pradesh',
    description: 'Pithora painting is a ritualistic tribal art form that serves as both decoration and storytelling medium.',
    history: 'This art form is considered sacred among the Rathwa and Bhilala tribes. It\'s not just an art form but a complete ritual that can take 5-7 days to complete.',
    techniques: [
      'Wall preparation',
      'Natural color usage',
      'Ritualistic painting',
      'Community participation'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1585644156283-f6c9ca0a3f48',
    materials: ['Natural pigments', 'Wooden tools', 'Clay walls', 'Organic materials']
  }
];

export const ArtStyles = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Indian Art Forms
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"> & Styles</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover the rich tapestry of India's traditional art forms, each telling unique stories of culture and heritage
          </motion.p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="px-4 mb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search art styles..."
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            </div>
            <button className="flex items-center px-4 py-3 rounded-lg border border-gray-200 hover:border-orange-500 transition-all text-gray-600 hover:text-orange-600">
              <Filter className="w-5 h-5 mr-2" />
              Filter by Region
            </button>
          </motion.div>
        </div>
      </section>

      {/* Art Styles Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {artStyles.map((style, index) => (
              <motion.article
                key={style.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={style.imageUrl}
                    alt={style.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <h2 className="text-2xl font-bold text-white mb-1">{style.name}</h2>
                    <p className="text-orange-200">{style.region}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{style.description}</p>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">History</h3>
                    <p className="text-gray-600">{style.history}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Techniques</h3>
                    <div className="flex flex-wrap gap-2">
                      {style.techniques.map((technique) => (
                        <span
                          key={technique}
                          className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                        >
                          {technique}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Materials Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {style.materials.map((material) => (
                        <span
                          key={material}
                          className="px-3 py-1 bg-red-50 text-red-800 rounded-full text-sm"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
