import React from 'react';
import Link from 'next/link';
import { BookOpen, Twitter, Facebook, Instagram, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'For Writers', href: '/writers' },
        { name: 'For Readers', href: '/posts' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Community',
      links: [
        { name: 'Featured Writers', href: '/writers' },
        { name: 'Popular Posts', href: '/posts?sort=popular' },
        { name: 'Categories', href: '/posts' },
        { name: 'Guidelines', href: '/guidelines' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Writing Tips', href: '/resources/tips' },
        { name: 'Help Center', href: '/help' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' }
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
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <BookOpen className="h-8 w-8 text-indigo-400" />
              <span className="text-xl font-bold">Writers Hub</span>
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
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2024 Writers Hub. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;