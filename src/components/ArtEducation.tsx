import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  BookOpen, 
  Palette, 
  Users, 
  Globe, 
  Clock, 
  Award,
  ArrowLeft,
  Download,
  Share2
} from 'lucide-react';

const artForms = [
  {
    name: 'Madhubani Painting',
    region: 'Bihar',
    history: '2500+ years',
    description: 'Intricate patterns and vibrant colors depicting mythology and nature',
    techniques: ['Natural pigments', 'Finger painting', 'Brush work'],
    significance: 'Religious ceremonies and festivals'
  },
  {
    name: 'Warli Art',
    region: 'Maharashtra',
    history: '3000+ years',
    description: 'Simple geometric forms representing daily life and nature',
    techniques: ['White clay paint', 'Bamboo stick brushes', 'Geometric patterns'],
    significance: 'Tribal rituals and harvest celebrations'
  },
  {
    name: 'Pattachitra',
    region: 'Odisha & West Bengal',
    history: '1000+ years',
    description: 'Cloth-based scroll paintings with mythological narratives',
    techniques: ['Natural colors', 'Palm leaf base', 'Fine brushwork'],
    significance: 'Religious storytelling and temple art'
  },
  {
    name: 'Gond Art',
    region: 'Madhya Pradesh',
    history: '1400+ years',
    description: 'Dot and line patterns inspired by dreams and folklore',
    techniques: ['Dot patterns', 'Natural pigments', 'Signature lines'],
    significance: 'Spiritual connection with nature'
  },
  {
    name: 'Phad Painting',
    region: 'Rajasthan',
    history: '700+ years',
    description: 'Large scroll paintings narrating epic tales',
    techniques: ['Vegetable colors', 'Cloth canvas', 'Traditional brushes'],
    significance: 'Mobile temple art for storytelling'
  },
  {
    name: 'Kalamkari',
    region: 'Andhra Pradesh',
    history: '3000+ years',
    description: 'Hand-painted textiles with intricate motifs',
    techniques: ['Natural dyes', 'Block printing', 'Hand painting'],
    significance: 'Temple decorations and royal patronage'
  }
];

const educationalResources = [
  {
    title: 'Digital Art Archive',
    description: 'Access over 10,000 digitized folk art pieces with detailed documentation',
    icon: BookOpen,
    type: 'Database'
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step techniques taught by master artists',
    icon: Users,
    type: 'Learning'
  },
  {
    title: 'Research Papers',
    description: 'Academic studies on cultural significance and preservation',
    icon: Globe,
    type: 'Research'
  },
  {
    title: 'Interactive Timeline',
    description: 'Explore the evolution of Indian folk art through centuries',
    icon: Clock,
    type: 'Timeline'
  }
];

interface ArtEducationProps {
  onBackToHome: () => void;
}

export function ArtEducation({ onBackToHome }: ArtEducationProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-orange-100">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBackToHome}
              className="flex items-center gap-2 text-orange-600 hover:text-orange-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">Art Education</h1>
              <Badge className="bg-orange-100 text-orange-800">Resources</Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Folk Art Map */}
      <section className="py-16 px-4 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent">
              Indian Folk Art Education
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Discover the rich tapestry of India's cultural heritage through comprehensive resources, 
              interactive learning, and deep insights into traditional art forms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-5xl mx-auto"
          >
            <Card className="overflow-hidden shadow-2xl border-0">
              <div className="relative">
                <ImageWithFallback
                  src="https://cdn.shopify.com/s/files/1/1194/1498/files/Folk_Art_Map_of_India_2019.jpg?v=1675422565"
                  alt="Folk Art Map of India 2019"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <Badge className="mb-3 bg-orange-600/90 backdrop-blur-sm">
                    Interactive Map
                  </Badge>
                  <h3 className="text-2xl font-bold mb-2">Folk Art Map of India</h3>
                  <p className="text-orange-100">
                    Explore the geographical distribution of India's diverse folk art traditions
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* What is Indian Folk Art */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                  What is Indian Folk Art?
                </CardTitle>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-400 mx-auto rounded-full" />
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-gray-700">
                  Indian Folk Art is a body of art form that originated and/or developed in India. Some of the forms are rock paintings, 
                  textiles, sculptures and other diverse range of surface paintings made by various tribal and cultural groups for 
                  religious or social reasons.
                </p>
                
                <p className="text-lg leading-relaxed text-gray-700">
                  There is so much to see and do in India, from ancient temples to vibrant markets, it's easy to get overwhelmed by all 
                  of the different things to do. However, one of the most neglected part of Indian culture(s) in modern times is its folk art, 
                  also known as tribal art or village crafts depending on the community that practices it.
                </p>
                
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl">
                  <p className="text-lg leading-relaxed text-gray-700 italic">
                    "Indian folk art, with its diverse styles and techniques, reflects the collective history, traditions, and aspirations 
                    of communities. It showcases the creative intellect of people and their intelligence in adapting indigenous resources 
                    into expressive art forms."
                  </p>
                </div>
                
                <p className="text-lg leading-relaxed text-gray-700">
                  These art forms, rooted in the daily lives and rituals of the people, not only preserve cultural narratives but also 
                  celebrate the resourcefulness and artistic ingenuity of local communities. There are art forms that go back thousands 
                  of years, and feature belief in gods, goddesses and powerful spirits. The magic and mystic of India comes alive through 
                  these crafts, which have been passed down for centuries.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Educational Resources */}
      <section className="py-16 px-4 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Learning Resources
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive educational materials to deepen your understanding of Indian folk art
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {educationalResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6 text-center">
                      <div className="mb-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-red-100 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-8 h-8 text-orange-600" />
                        </div>
                      </div>
                      <Badge variant="outline" className="mb-3 border-orange-200 text-orange-700">
                        {resource.type}
                      </Badge>
                      <h3 className="font-bold text-gray-900 mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Art Forms Gallery */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Traditional Art Forms
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore the diverse landscape of Indian folk art traditions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artForms.map((art, index) => (
              <motion.div
                key={art.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl text-gray-900">{art.name}</CardTitle>
                      <Badge variant="outline" className="border-orange-200 text-orange-700">
                        {art.history}
                      </Badge>
                    </div>
                    <p className="text-orange-600 font-medium">{art.region}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{art.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-900">Techniques:</h4>
                      <div className="flex flex-wrap gap-1">
                        {art.techniques.map((technique, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {technique}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-900">Cultural Significance:</h4>
                      <p className="text-sm text-muted-foreground">{art.significance}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-br from-orange-600 via-red-600 to-yellow-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Award className="w-16 h-16 mx-auto mb-6 text-orange-200" />
            <h2 className="text-4xl font-bold mb-4">
              Become a Cultural Guardian
            </h2>
            <p className="text-xl text-orange-100 mb-8 leading-relaxed">
              Join our mission to preserve and promote India's rich folk art heritage. 
              Start your journey as an artist, collector, or cultural enthusiast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6">
                Join Community
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}