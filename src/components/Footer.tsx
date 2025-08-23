import { FC } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Mail, 
  MapPin, 
  Github,
  Youtube,
  Palette,
  Users,
  Info // Info icon for the "About" section
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: FC = () => {
  const footerLinks = {
    explore: [
      { name: 'Home', href: '/#home' },
      { name: 'Discover', href: '/#map' },
      { name: 'Gallery', href: '/#gallery' },
      { name: 'Stories', href: '/#stories' },
    ],
    community: [
      { name: 'Join Movement', href: '/signin?view=sign_up' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Youtube, href: '#', label: 'YouTube' },
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
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
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
          </motion.div>

          {/* Explore */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
              <Palette className="w-5 h-5 mr-2 text-orange-400" />
              Explore
            </h3>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Community */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
              <Users className="w-5 h-5 mr-2 text-orange-400" />
              Community
            </h3>
            <ul className="space-y-4">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Grey Line & Social Links */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex justify-between items-center">
            {/* Left side (Social Links + About) */}
            <div className="flex space-x-4">
              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition-colors group flex items-center"
              >
                <Info className="w-5 h-5 mr-2 text-orange-400" />
                <span className="group-hover:text-orange-400">About</span>
              </Link>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Right side (Copyright) */}
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} KalaKriti. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
