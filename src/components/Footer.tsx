import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Palette,
  Users,
  BookOpen,
  Shield
} from 'lucide-react';

export const Footer: React.FC = () => {
  const footerLinks = {
    explore: [
      { name: 'Browse Artworks', href: '#' },
      { name: 'Featured Artists', href: '#' },
      { name: 'Regional Art', href: '#' },
      { name: 'Art Styles', href: '#' }
    ],
    community: [
      { name: 'Join as Artist', href: '#' },
      { name: 'Art Collectors', href: '#' },
      { name: 'Cultural Events', href: '#' },
      { name: 'Artist Stories', href: '#' }
    ],
    resources: [
      { name: 'Learning Center', href: '#' },
      { name: 'Art History', href: '#' },
      { name: 'Techniques', href: '#' },
      { name: 'Documentation', href: '#' }
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-red-900 to-orange-900 text-white">
      {/* Traditional Pattern Border */}
      <div className="h-4 bg-gradient-to-r from-orange-500 via-red-600 to-orange-500 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 16" fill="none">
          <pattern id="traditionalBorder" x="0" y="0" width="40" height="16" patternUnits="userSpaceOnUse">
            <path d="M0 8 Q10 0, 20 8 Q30 16, 40 8" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none"/>
            <circle cx="20" cy="8" r="2" fill="rgba(255,255,255,0.2)"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#traditionalBorder)"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-orange-200 text-sm">KALAKRITI</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Preserving India's rich artistic heritage through digital innovation. 
              Connecting artists, collectors, and culture enthusiasts worldwide.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-3 text-orange-400" />
                <span className="text-sm">hello@kalakriti.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-3 text-orange-400" />
                <span className="text-sm">Bengaluru, Karnataka, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold text-lg mb-6 flex items-center">
              <Palette className="w-5 h-5 mr-2 text-orange-400" />
              Explore
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold text-lg mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-orange-400" />
              Community
            </h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-semibold text-lg mb-6 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-orange-400" />
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="font-semibold text-lg mb-6 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-orange-400" />
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>


        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm text-center md:text-left">
            © 2025 Kalakriti. Preserving India's artistic heritage with love.
          </p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Made in India</span>
            <div className="w-6 h-4 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-sm"></div>
            <span className="text-gray-400 text-sm">with</span>
            <Heart className="w-4 h-4 text-red-500" />
          </div>
        </motion.div>
      </div>

      {/* Traditional Pattern Bottom */}
      <div className="h-2 bg-gradient-to-r from-orange-500 via-red-600 to-orange-500 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 8" fill="none">
          <pattern id="bottomBorder" x="0" y="0" width="20" height="8" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="4" r="1" fill="rgba(255,255,255,0.3)"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#bottomBorder)"/>
        </svg>
      </div>
    </footer>
  );
};