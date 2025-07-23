import React from 'react';
import { BookOpen, Twitter, Facebook, Instagram, Github, Mail } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'For Writers', href: '#' },
        { name: 'For Readers', href: '#' },
        { name: 'Publishing Tools', href: '#' },
        { name: 'Analytics', href: '#' }
      ]
    },
    {
      title: 'Community',
      links: [
        { name: 'Writing Groups', href: '#' },
        { name: 'Events', href: '#' },
        { name: 'Challenges', href: '#' },
        { name: 'Featured Authors', href: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Writing Tips', href: '#' },
        { name: 'Guidelines', href: '#' },
        { name: 'Help Center', href: '#' },
        { name: 'API Docs', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Contact', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <BookOpen className="h-8 w-8 text-indigo-400" />
              <span className="text-xl font-bold">Writers & Readers Hub</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Connecting writers and readers through the power of storytelling. 
              Join our community and discover your next favorite story.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Get the latest stories and community updates delivered to your inbox.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button className="bg-indigo-600 px-6 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2025 Writers & Readers Hub. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;