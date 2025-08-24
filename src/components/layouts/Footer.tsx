import Link from 'next/link';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon 
} from '@heroicons/react/24/outline';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Donate', href: '/donate' },
    { name: 'Get Involved', href: '/get-involved' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      href: '#',
      icon: FaFacebookF,
      ariaLabel: 'Visit our Facebook page'
    },
    {
      name: 'Twitter',
      href: '#',
      icon: FaTwitter,
      ariaLabel: 'Follow us on Twitter/X'
    },
    {
      name: 'Instagram',
      href: '#',
      icon: FaInstagram,
      ariaLabel: 'Follow us on Instagram'
    },
  ];

  return (
    <footer className="bg-gray-800 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8 mb-8">
          
          {/* Left Section - Logo and Mission */}
          <div className="flex-1 md:max-w-sm">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-white">NGO Aid</h2>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Dedicated to creating lasting positive change in communities worldwide 
              through sustainable development, education, and humanitarian relief efforts. 
              Together, we build hope and transform lives.
            </p>
          </div>

          {/* Center Section - Navigation Links */}
          <div className="flex-1 md:max-w-xs">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <div className="grid grid-cols-2 gap-2 md:flex md:flex-col">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm py-1 hover:underline"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          {/* Right Section - Contact Info and Social Media */}
          <div className="flex-1 md:max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            
            {/* Contact Information */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <EnvelopeIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a 
                  href="mailto:info@ngoaid.org"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  info@ngoaid.org
                </a>
              </div>
              
              <div className="flex items-start gap-3">
                <PhoneIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a 
                  href="tel:+1-555-123-4567"
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  +1 (555) 123-4567
                </a>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <address className="text-gray-300 text-sm not-italic">
                  123 Humanitarian Way<br />
                  Global City, GC 12345<br />
                  United States
                </address>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="text-sm font-medium mb-3">Follow Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label={social.ariaLabel}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright and Legal */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-sm text-gray-400">
            
            {/* Copyright */}
            <div>
              <p>&copy; 2025 NGO Aid. All rights reserved.</p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/privacy" 
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/legal" 
                className="hover:text-white transition-colors duration-200"
              >
                Legal / Imprint
              </Link>
              <Link 
                href="/cookies" 
                className="hover:text-white transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;